type ApiRequest = { method?: string; query?: Record<string, string | string[] | undefined> };
type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

function readNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[₦,$,\\s]/g, ""));
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

function findRate(root: any, side: "buy" | "sell"): number | undefined {
  const aliases = side === "buy"
    ? ["buy", "buy_rate", "buyrate", "buy_price", "buyprice", "p2p_buy", "p2pbuy", "usdt_ngn_buy", "buy_ngn", "buying"]
    : ["sell", "sell_rate", "sellrate", "sell_price", "sellprice", "p2p_sell", "p2psell", "usdt_ngn_sell", "sell_ngn", "selling"];
  const visit = (node: any, depth = 0): number | undefined => {
    if (!node || typeof node !== "object" || depth > 5) return undefined;
    for (const [key, value] of Object.entries(node)) {
      const normalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (aliases.includes(normalized)) {
        const parsed = readNumber(value);
        if (parsed) return parsed;
      }
    }
    for (const value of Object.values(node)) {
      const nested = visit(value, depth + 1);
      if (nested) return nested;
    }
    return undefined;
  };
  return visit(root);
}

async function getJson(url: string) {
  const response = await fetch(url, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(9000) });
  if (!response.ok) throw new Error("Upstream returned " + response.status);
  return response.json();
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  const rawAsset = Array.isArray(req.query?.asset) ? req.query?.asset[0] : req.query?.asset;
  const asset = String(rawAsset || "USDT").trim().toUpperCase();
  if (!/^[A-Z0-9]{2,15}$/.test(asset)) {
    return res.status(400).json({ error: "Invalid asset symbol" });
  }

  try {
    let nairaPayload: any;
    let buy: number | undefined;
    let sell: number | undefined;
    let updated: string | undefined;

    try {
      nairaPayload = await getJson("https://tlt.ng/api/v1/naira");
      buy = findRate(nairaPayload?.data ?? nairaPayload, "buy");
      sell = findRate(nairaPayload?.data ?? nairaPayload, "sell");
      updated = nairaPayload?.meta?.updated ?? nairaPayload?.data?.updated;
    } catch (error) {
      console.error("[W3C DESK API] TLT naira endpoint failed:", error);
    }

    // The documented TLT price endpoint provides a dependable mid-market fallback.
    // The client applies W3C's existing buy/sell spread to this base rate.
    if (!buy || !sell) {
      const fallback = await getJson("https://tlt.ng/api/v1/price/tether/ngn");
      const mid = readNumber(fallback?.data?.price);
      if (!mid) throw new Error("TLT did not return a usable USDT/NGN rate");
      buy = mid;
      sell = mid;
      updated = fallback?.meta?.updated ?? updated;
    }

    let tokenUsdt: number | undefined = asset === "USDT" ? 1 : undefined;
    let tokenError = false;
    if (asset !== "USDT") {
      try {
        const tickers = await getJson("https://api.gateio.ws/api/v4/spot/tickers?currency_pair=" + encodeURIComponent(asset + "_USDT"));
        const ticker = Array.isArray(tickers) ? tickers[0] : null;
        tokenUsdt = readNumber(ticker?.last);
        if (!tokenUsdt) tokenError = true;
      } catch (error) {
        console.error("[W3C DESK API] Gate.io asset lookup failed:", asset, error);
        tokenError = true;
      }
    }

    return res.status(200).json({ nairaBuy: buy, nairaSell: sell, updated, tokenUsdt, tokenError });
  } catch (error) {
    console.error("[W3C DESK API] Market lookup failed:", error);
    return res.status(503).json({ error: "Market data temporarily unavailable" });
  }
}
