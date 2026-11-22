import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick, trackDeskEnquiry } from "@/lib/analytics";
import { FounderAvatar } from "@/components/shared/founder-avatar";

type AnswerMap = Record<string, string>;
type MarketQuote = {
  nairaBuy: number;
  nairaSell: number;
  updated?: string;
  tokenUsdt?: number;
  tokenUpdated?: string;
  error?: string;
  tokenError?: string;
};

type GateNetwork = { label: string; chain: string; depositDisabled: boolean; withdrawDisabled: boolean };

const money = (value: number, digits = 2) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: digits }).format(value);

function parseGateNetworks(payload: any): GateNetwork[] {
  const chains = Array.isArray(payload?.chains) ? payload.chains : [];
  return chains.map((item: any) => {
    const chain = String(item.chain || item.name || item.chain_name || "").trim();
    return {
      chain,
      label: String(item.name || item.chain || item.chain_name || chain).trim(),
      depositDisabled: Boolean(item.deposit_disabled ?? item.deposit_status === "disabled"),
      withdrawDisabled: Boolean(item.withdraw_disabled ?? item.withdraw_status === "disabled"),
    };
  }).filter((item: GateNetwork) => item.chain);
}

const preferredNetworkOrder = ["TRON", "TRC20", "BSC", "BNB", "ETH", "ERC20", "POLYGON", "MATIC", "ARBITRUM", "SOL", "TON"];

function rankNetworks(networks: GateNetwork[]) {
  return [...networks].sort((a, b) => {
    const rank = (value: string) => {
      const upper = value.toUpperCase();
      const index = preferredNetworkOrder.findIndex((item) => upper.includes(item));
      return index < 0 ? 999 : index;
    };
    return rank(a.chain) - rank(b.chain);
  });
}


type Question = {
  id: string;
  title: string;
  helper?: string;
  options: string[];
};

const rootQuestion: Question = {
  id: "tradeType",
  title: "What do you want to do?",
  options: ["Buy crypto", "Sell crypto"],
};

const assetQuestion: Question = {
  id: "asset",
  title: "Which crypto would you like to buy?",
  options: ["USDT", "USDC", "BTC", "PI", "Other asset"],
};

const sourceQuestions: Record<"buy" | "sell", Question> = {
  buy: {
    id: "destination",
    title: "Where would you like to receive the crypto?",
    helper: "Choose the type of wallet or account you will receive it in.",
    options: ["Personal (non-custodial) wallet", "Exchange wallet"],
  },
  sell: {
    id: "source",
    title: "Where are you sending the crypto from?",
    helper: "Choose the type of wallet or account you will send it from.",
    options: ["Personal (non-custodial) wallet", "Exchange wallet"],
  },
};

const networkQuestion: Question = {
  id: "network",
  title: "Which network is the crypto on?",
  helper: "Choose the network you will use to send or receive the crypto.",
  options: [],
};

const noteQuestion: Question = {
  id: "noteChoice",
  title: "Anything else W3C should know?",
  options: ["No, that’s all", "I have a question"],
};

function buildAmountHelper(asset: string) {
  switch (asset) {
    case "USDT":
    case "USDC":
      return "Enter the quantity only, using numbers. For example, 500.";
    case "BTC":
      return "Enter the quantity only, using numbers. For example, 0.005.";
    case "PI":
      return "Enter the quantity only, using numbers. For example, 500.";
    default:
      return "Enter the quantity only, using numbers. The asset name is collected separately.";
  }
}

function buildMessage(answers: AnswerMap, quote?: MarketQuote | null) {
  const action = answers.tradeType === "Buy crypto" ? "BUY" : "SELL";
  const asset = answers.assetName || answers.asset;
  const isStablecoin = asset.toUpperCase() === "USDT";
  const hasTokenPrice = isStablecoin || Boolean(quote?.tokenUsdt && quote.tokenUsdt > 0);
  const isPricedAsset = Boolean(quote && !quote.error && hasTokenPrice && quote.nairaBuy > 0 && quote.nairaSell > 0);
  const quoteUnit = isPricedAsset
    ? (isStablecoin ? 1 : quote!.tokenUsdt!) * (action === "BUY" ? quote!.nairaBuy : quote!.nairaSell)
    : 0;
  const quoteTotal = quoteUnit * Number(answers.amount || 0);
  const location =
    answers.tradeType === "Buy crypto"
      ? "I’d like to receive the crypto in a " + answers.destination.toLowerCase() + "."
      : "I’m sending the crypto from a " + answers.source.toLowerCase() + ".";

  const note = answers.note && answers.note.trim();

  return [
    "Hello W3C DESK, I’d like to " + action + " " + answers.amount + " " + asset + " through W3C DESK.",
    answers.network ? "Network: " + answers.network : "",
    isPricedAsset && quoteTotal > 0 ? "Indicative estimate: " + money(quoteTotal, 2) + " (" + money(quoteUnit, 2) + " per " + asset + ")" : "",
    location,
    note ? "Additional note: " + note : "",
    "Please confirm the available rate and the next steps before I proceed.",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CryptoP2P({ onNavigateToTab }: { onNavigateToTab: (tab: "consulting" | "desk" | "web" | "community" | "others") => void }) {
  const brand = getServiceBrandColor("W3C DESK");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [marketQuote, setMarketQuote] = useState<MarketQuote | null>(null);
  const [marketLoading, setMarketLoading] = useState(false);
  const [gateNetworks, setGateNetworks] = useState<GateNetwork[]>([]);
  const [networkLoading, setNetworkLoading] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");


  useEffect(() => {
    let cancelled = false;
    const loadMarket = async () => {
      setMarketLoading(true);
      setMarketQuote(null);
      const asset = (answers.asset === "Other asset" ? answers.assetName : answers.asset || "").trim().toUpperCase();
      if (!asset || asset === "OTHER ASSET") {
        setMarketLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/w3c-desk-market?asset=" + encodeURIComponent(asset), {
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error || "Market lookup failed");
        const nairaBuy = Number(payload?.nairaBuy);
        const nairaSell = Number(payload?.nairaSell);
        if (!(nairaBuy > 0) || !(nairaSell > 0)) throw new Error("Invalid market quote");
        if (!cancelled) {
          setMarketQuote({
            nairaBuy: nairaBuy + 10,
            nairaSell: Math.max(0, nairaSell - 10),
            updated: payload?.updated,
            tokenUsdt: asset === "USDT" ? 1 : Number(payload?.tokenUsdt) > 0 ? Number(payload.tokenUsdt) : undefined,
            tokenError: asset !== "USDT" && (payload?.tokenError || !(Number(payload?.tokenUsdt) > 0))
              ? "Asset price currently unavailable"
              : undefined,
          });
        }
      } catch (error) {
        console.error("[W3C DESK] Market quote request failed:", error);
        if (!cancelled) setMarketQuote({ nairaBuy: 0, nairaSell: 0, error: "Rate currently unavailable" });
      } finally {
        if (!cancelled) setMarketLoading(false);
      }
    };
    loadMarket();
    return () => { cancelled = true; };
  }, [answers.asset, answers.assetName]);

  useEffect(() => {
    let cancelled = false;
    const loadNetworks = async () => {
      const asset = (answers.asset === "Other asset" ? answers.assetName : answers.asset || "").trim().toUpperCase();
      if (!asset || asset === "OTHER ASSET") {
        setGateNetworks([]);
        return;
      }
      setNetworkLoading(true);
      setNetworkMessage("");
      setGateNetworks([]);
      try {
        const response = await fetch(
          "https://api.gateio.ws/api/v4/spot/currencies/" + encodeURIComponent(asset),
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Gate.io network information is unavailable for " + asset);
        const payload = await response.json();
        const available = parseGateNetworks(payload).filter((network) =>
          answers.tradeType === "Buy crypto" ? !network.withdrawDisabled : !network.depositDisabled
        );
        if (!cancelled) {
          setGateNetworks(rankNetworks(available));
          if (!available.length) setNetworkMessage("Gate.io did not return an enabled network for this transaction direction. Please confirm the network with W3C before proceeding.");
        }
      } catch (error) {
        if (!cancelled) setNetworkMessage("Network options are currently unavailable. W3C can confirm the supported network with you on WhatsApp.");
      } finally {
        if (!cancelled) setNetworkLoading(false);
      }
    };
    loadNetworks();
    return () => { cancelled = true; };
  }, [answers.asset, answers.assetName, answers.tradeType]);

  const questions = useMemo(() => {
    const selectedAssetQuestion: Question = {
      ...assetQuestion,
      title: answers.tradeType === "Buy crypto"
        ? "Which crypto would you like to buy?"
        : "Which crypto would you like to sell?",
    };
    const amountQuestion: Question = {
      id: "amount",
      title: "How much?",
      helper: answers.asset ? buildAmountHelper(answers.asset) : "Enter the exact amount and unit.",
      options: [],
    };

    const assetInputQuestion: Question = {
      id: "assetName",
      title: "What is the name of the asset?",
      helper: "Enter the token symbol exactly as listed on Gate.io, for example SOL or DOGE.",
      options: [],
    };

    if (!answers.tradeType) return [rootQuestion];

    const action = answers.tradeType === "Buy crypto" ? "buy" : "sell";

    if (answers.asset === "Other asset") {
      return [rootQuestion, selectedAssetQuestion, assetInputQuestion, amountQuestion, networkQuestion, sourceQuestions[action], noteQuestion];
    }

    const asksNetwork = answers.asset !== "Other asset";
    return [
      rootQuestion,
      selectedAssetQuestion,
      amountQuestion,
      ...(asksNetwork ? [networkQuestion] : []),
      sourceQuestions[action],
      noteQuestion,
    ];
  }, [answers.tradeType, answers.asset]);

  const currentQuestion = questions[step];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = answers.tradeType && currentQuestion
    ? Math.round(((step + 1) / questions.length) * 100)
    : 0;

  const advance = (nextAnswers: AnswerMap) => {
    setAnswers(nextAnswers);
    if (currentQuestion.id === "tradeType") {
      setStep(1);
      return;
    }
    if (step < questions.length - 1) setStep(step + 1);
  };

  const openConfirmation = (nextAnswers: AnswerMap) => {
    setAnswers(nextAnswers);
    setConfirming(true);
  };

  const selectAnswer = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };

    if (currentQuestion.id === "tradeType") {
      setAmountError("");
      delete nextAnswers.asset;
      delete nextAnswers.assetName;
      delete nextAnswers.amount;
      delete nextAnswers.source;
      delete nextAnswers.destination;
      delete nextAnswers.note;
      delete nextAnswers.noteChoice;
    }

    if (currentQuestion.id === "asset") {
      setAmountError("");
      delete nextAnswers.assetName;
      delete nextAnswers.amount;
    }

    if (currentQuestion.id === "noteChoice") {
      if (value === "No, that’s all") {
        delete nextAnswers.note;
        openConfirmation(nextAnswers);
        return;
      }

      setAnswers(nextAnswers);
      return;
    }

    advance(nextAnswers);
  };

  const submitInput = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (currentQuestion.id === "amount") {
      const validPositiveNumber = /^(?:\d+)(?:\.\d+)?$/.test(trimmed) && Number.isFinite(Number(trimmed)) && Number(trimmed) > 0;
      if (!validPositiveNumber) {
        setAmountError("Enter a valid amount greater than zero, using numbers only.");
        return;
      }
      setAmountError("");
    }

    advance({ ...answers, [currentQuestion.id]: trimmed });
  };

  const goBack = () => {
    if (complete) {
      setComplete(false);
      setConfirming(true);
      return;
    }
    if (confirming) {
      setConfirming(false);
      setStep(questions.length - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    setAnswers({});
    setAmountError("");
    setMarketQuote(null);
    setGateNetworks([]);
    setNetworkMessage("");
    setStep(0);
    setComplete(false);
    setConfirming(false);
  };

  const sendToWhatsApp = () => {
    const asset = answers.assetName || answers.asset;
    const actionType = answers.tradeType === "Buy crypto" ? "buy" : "sell";
    const numericAmount = Number(answers.amount);

    trackDeskEnquiry(asset, actionType, numericAmount);
    trackContactClick("WhatsApp", "W3C DESK - " + actionType.toUpperCase() + " " + asset);
    setComplete(true);
  };

  if (confirming) {
    return (
      <PageTransition>
        <SEO
          title={"Confirm W3C DESK Trade Request | " + branding.businessName}
          description={"Review your W3C DESK trade request before continuing to WhatsApp."}
          path="/services"
        />
        <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
          <div className="container max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
              <div className="flex justify-center mb-6">
                <FounderAvatar />
              </div>
              <h2 className="text-xs uppercase tracking-widest font-mono font-bold text-orange-400 text-center">CONFIRM YOUR TRADE REQUEST</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">Review your enquiry before sending it. This is not a confirmed trade or an agreed rate. W3C will confirm the rate and settlement details with you first. Do not send NGN or crypto until both sides have agreed on the terms.</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/[0.08]">
                <SummaryRow label="Trade" value={answers.tradeType} />
                <SummaryRow label="Asset" value={answers.assetName || answers.asset} />
                <SummaryRow label="Amount" value={answers.amount + " " + (answers.assetName || answers.asset)} />
                {marketQuote && !marketQuote.error && (answers.asset === "USDT" || Boolean(marketQuote.tokenUsdt)) && answers.amount && (answers.asset !== "Other asset" || answers.assetName) && <SummaryRow label="Indicative estimate" value={money((answers.asset === "USDT" ? 1 : marketQuote.tokenUsdt!) * (answers.tradeType === "Buy crypto" ? marketQuote.nairaBuy : marketQuote.nairaSell) * Number(answers.amount), 2)} />}
                {answers.indicativeUnitPrice && <SummaryRow label="Indicative unit price" value={answers.indicativeUnitPrice} />}
                {answers.indicativeTotal && <SummaryRow label="Indicative total" value={answers.indicativeTotal} />}
                {answers.network && <SummaryRow label="Network" value={answers.network} />}
                <SummaryRow label={answers.tradeType === "Buy crypto" ? "Receive in" : "Sending from"} value={answers.tradeType === "Buy crypto" ? answers.destination : answers.source} />
                {answers.note && <SummaryRow label="Note" value={answers.note} />}
              </div>
              <a
                href={contact.whatsappUrl + "?text=" + encodeURIComponent(buildMessage(answers, marketQuote))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={sendToWhatsApp}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                <SiWhatsapp className="w-4 h-4" /> Continue Transaction on WhatsApp
              </a>
              <button type="button" onClick={goBack} className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (complete) {
    return (
      <PageTransition>
        <SEO
          title={"W3C DESK, Crypto P2P | " + branding.businessName}
          description={"Buy and sell digital assets through W3C DESK with direct WhatsApp coordination from " + branding.founderName + "."}
          path="/services"
        />
        <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
          <div className="container max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
              <div className="flex justify-center mb-6">
                <FounderAvatar />
              </div>
              <h2 className={"text-3xl sm:text-4xl font-display font-bold text-center " + brand.twText}>
                Your trade request is ready.
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed text-center">
                Your WhatsApp enquiry has been opened. The W3C team will review your request, confirm the rate and agree the NGN payment or crypto transfer details with you before the trade proceeds.
              </p>
              <button type="button" onClick={restart} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" />
                Start again
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={"W3C DESK, Crypto P2P | " + branding.businessName}
        description={"Buy and sell digital assets through W3C DESK with direct WhatsApp coordination from " + branding.founderName + "."}
        path="/services"
      />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 50%, " + brand.hex + "15, transparent 70%)" }}
          />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <h1 className={"text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight max-w-4xl " + brand.twText}>
            Buy or sell crypto through W3C DESK.
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mt-6">
            Tell W3C what you want to buy or sell, how much, and where the crypto is coming from or going. Your answers will be used to prepare a clear transaction request for WhatsApp.
          </p>

          
        </div>
      </section>

      <section className="py-20 md:py-28 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <span className={"text-xs uppercase tracking-widest font-mono font-bold " + brand.twText}>
              LET’S SORT OUT YOUR TRANSACTION
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 mb-3 text-xs text-muted-foreground">
            <span>
              {answers.tradeType
                ? `Step ${step + 1} of ${questions.length}`
                : "Start with your transaction"}
            </span>
            <span className="text-right">
              {answers.tradeType
                ? `${progress}% complete`
                : "A few questions to arrange your trade"}
            </span>
          </div>

          <div
            className="h-1 rounded-full bg-white/10 overflow-hidden mb-10"
            role="progressbar"
            aria-label="Transaction request progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <motion.div
              className={"h-full " + brand.twBg}
              animate={{ width: progress + "%" }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id + "-" + step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
            >
              {currentQuestion.id === "network" && (marketLoading || networkLoading) ? <NetworkSkeleton /> : <>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
                {currentQuestion.title}
              </h2>

              {currentQuestion.helper && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{currentQuestion.helper}</p>
              )}

              {currentQuestion.id === "amount" && (
                <InputStep
                  inputMode="decimal"
                  value={currentAnswer || ""}
                  placeholder={
                    answers.asset === "BTC"
                      ? "e.g. 0.005 BTC"
                      : answers.asset === "PI"
                        ? "e.g. 500 PI"
                        : answers.asset === "USDT" || answers.asset === "USDC"
                          ? "e.g. 500"
                          : "e.g. 100 TOKEN"
                  }
                  onContinue={submitInput}
                  error={amountError}
                />
              )}

              {currentQuestion.id === "assetName" && (
                <InputStep inputMode="text" value={currentAnswer || ""} placeholder="e.g. SOL" onContinue={submitInput} />
              )}

              {currentQuestion.id === "noteChoice" && (
                <div className="grid gap-3 mt-8">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(option)}
                      className={
                        "group w-full text-left rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 " +
                        (currentAnswer === option
                          ? brand.twBorder + " " + brand.twBg + " text-white"
                          : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25 hover:bg-white/[0.05]")
                      }
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-sm sm:text-base font-semibold">{option}</span>
                        <ArrowRight className={"w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 " + brand.twText} />
                      </span>
                    </button>
                  ))}
                  {currentAnswer === "I have a question" && (
                    <NoteComposer
                      value={answers.note || ""}
                      onContinue={(note) => {
                        const nextAnswers = { ...answers };
                        if (note.trim()) nextAnswers.note = note.trim();
                        else delete nextAnswers.note;
                        openConfirmation(nextAnswers);
                      }}
                    />
                  )}
                </div>
              )}

              {currentQuestion.id === "network" && (
                <div className="mt-8">
                  
                  
                  {marketQuote && !marketQuote.error && !marketQuote.tokenError && Number(answers.amount) > 0 && (() => {
                    const buying = answers.tradeType === "Buy crypto";
                    const unit = (answers.asset === "USDT" ? 1 : marketQuote.tokenUsdt || 0) * (buying ? marketQuote.nairaBuy : marketQuote.nairaSell);
                    const total = unit * Number(answers.amount);
                    return (
                      <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-sm font-semibold text-white">Indicative estimate</div>
                        <div className="mt-3 flex justify-between gap-3 text-sm"><span className="text-white/60">Rate per {answers.assetName || answers.asset}</span><strong className="text-white">{money(unit, 2)}</strong></div>
                        <div className="mt-2 flex justify-between gap-3 text-sm"><span className="text-white/60">Estimated {buying ? "cost" : "payout"}</span><strong className="text-emerald-300 text-base">{money(total, 2)}</strong></div>
                        <p className="mt-3 text-xs font-medium text-orange-400">Final rate is agreed on WhatsApp.</p>
                      </div>
                    );
                  })()}
                  {networkLoading && <p className="text-sm text-white/60">Loading supported networks from Gate.io…</p>}
                  {!networkLoading && gateNetworks.length > 0 && (
                    <div className="grid gap-3">
                      {gateNetworks.slice(0, 4).map((network) => (
                        <button key={network.chain} type="button" onClick={() => selectAnswer(network.chain)} className={"w-full text-left rounded-2xl border px-5 py-4 transition-all " + (currentAnswer === network.chain ? brand.twBorder + " " + brand.twBg + " text-white" : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25")}>
                          <span className="flex items-center justify-between gap-3"><span className="font-semibold">{network.label}</span><span className="text-xs text-white/45">{network.chain}</span></span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {networkMessage && <p className="mt-3 text-sm text-amber-300">{networkMessage}</p>}
                  <button
                    type="button"
                    onClick={() => selectAnswer("Other network / Not sure")}
                    className={"mt-3 w-full text-left rounded-2xl border px-5 py-4 transition-all " + (currentAnswer === "Other network / Not sure" ? brand.twBorder + " " + brand.twBg + " text-white" : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25")}
                  >
                    <span className="font-semibold">Other network / Not sure</span>
                  </button>
                </div>
              )}

              {currentQuestion.id !== "amount" &&
                currentQuestion.id !== "assetName" &&
                currentQuestion.id !== "noteChoice" &&
                currentQuestion.id !== "network" && (
                  <div className="grid gap-3 mt-8">
                    {currentQuestion.options.map((option) => {
                      const selected = currentAnswer === option;
                      const isTradeType = currentQuestion.id === "tradeType";
                      const isBuy = option === "Buy crypto";
                      const optionTone = isTradeType
                        ? isBuy
                          ? selected
                            ? "border-emerald-400 bg-emerald-500/20 text-white"
                            : "border-emerald-500/40 bg-emerald-500/10 text-white/90 hover:border-emerald-400/70 hover:bg-emerald-500/15"
                          : selected
                            ? "border-red-400 bg-red-500/20 text-white"
                            : "border-red-500/40 bg-red-500/10 text-white/90 hover:border-red-400/70 hover:bg-red-500/15"
                        : selected
                          ? brand.twBorder + " " + brand.twBg + " text-white"
                          : "border-white/10 bg-white/[0.02] text-white/90 hover:border-white/25 hover:bg-white/[0.05]";
                      const arrowTone = isTradeType ? (isBuy ? "text-emerald-400" : "text-red-400") : brand.twText;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectAnswer(option)}
                          className={
                            "group w-full text-left rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 " +
                            optionTone
                          }
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span className="text-sm sm:text-base font-semibold">{option}</span>
                            <ArrowRight className={"w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 " + arrowTone} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-black">
        <div className="container max-w-4xl mx-auto px-6 flex justify-center">
          <a
            href="/ledger"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold text-sm text-orange-400 border border-orange-500 hover:brightness-125 transition-all"
          >
            View Transaction Ledger
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-purple-400">
              Not ready to buy or sell crypto yet?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto mt-5">
              That&apos;s okay. You can take your time to understand how crypto works, ask questions, and learn before you decide to buy or sell. Join W3C Community to learn with others, follow practical conversations around crypto and Web3, and build your understanding first. When you&apos;re ready, you can come back to W3C DESK and start your transaction request.
            </p>
            <button
              type="button"
              onClick={() => onNavigateToTab("community")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-purple-400 border-purple-500 border hover:brightness-125 transition-all"
            >
              Learn with W3C Community <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function NetworkSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Preparing current rates and network options" className="animate-pulse mt-8 space-y-5">
      <div className="h-7 w-3/4 rounded-lg bg-white/10" />
      <div className="h-4 w-2/3 rounded bg-white/[0.07]" />
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-7 w-1/2 rounded bg-white/10" />
        <div className="h-4 w-2/5 rounded bg-white/[0.07]" />
      </div>
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-[58px] rounded-2xl border border-white/[0.07] bg-white/[0.03]" />
      ))}
      <p className="text-xs text-white/45">Preparing your rate estimate and supported networks…</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-5 px-5 py-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-white text-right">{value || "Not provided"}</span>
    </div>
  );
}

function InputStep({
  value,
  placeholder,
  inputMode,
  onContinue,
  error,
}: {
  value: string;
  placeholder: string;
  inputMode: "text" | "decimal";
  onContinue: (value: string) => void;
  error?: string;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="mt-8">
      <input
        type="text"
        inputMode={inputMode}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === "Enter") onContinue(draft);
        }}
        className="w-full rounded-2xl bg-white/[0.02] border border-white/10 px-5 py-4 sm:px-6 sm:py-5 text-white text-base placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10"
        autoFocus
      />
      {error && <p role="alert" className="mt-2 text-sm text-red-400">{error}</p>}
      <div className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => onContinue(draft)}
        disabled={!draft.trim()}
        className={"inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 " + getServiceBrandColor("W3C DESK").twBg + " " + getServiceBrandColor("W3C DESK").twText + " border " + getServiceBrandColor("W3C DESK").twBorder + " font-bold text-sm disabled:opacity-30 disabled:pointer-events-none hover:brightness-125 transition-all"}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function NoteComposer({
  value,
  onContinue,
}: {
  value: string;
  onContinue: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="mt-3">
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Type your note here..."
        rows={4}
        autoFocus
        className="w-full rounded-2xl bg-white/[0.02] border border-white/10 px-5 py-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 resize-none"
      />
      <div className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => onContinue(draft)}
        disabled={!draft.trim()}
        className={"inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 " + getServiceBrandColor("W3C DESK").twBg + " " + getServiceBrandColor("W3C DESK").twText + " border " + getServiceBrandColor("W3C DESK").twBorder + " font-bold text-sm disabled:opacity-30 disabled:pointer-events-none hover:brightness-125 transition-all"}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
