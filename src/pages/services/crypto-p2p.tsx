import { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Wallet,
  ArrowRight,
  MessageCircle,
  Tag,
  Handshake,
  Zap,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";
import { trackDeskEnquiry, trackContactClick } from "@/lib/analytics";

const steps = [
  { num: "01", icon: MessageCircle, title: "Message the desk", body: "Open WhatsApp and say what you want to buy or sell." },
  { num: "02", icon: Tag, title: "Confirm the pair", body: "Asset and amount. Rate is quoted inclusive of the desk fee." },
  { num: "03", icon: Handshake, title: "Accept the rate", body: "No hidden spread. You see the number before anything moves." },
  { num: "04", icon: Zap, title: "Settle", body: "Typical completion: 10–15 minutes after agreement." },
];

const assistantAssets = ["USDT", "USDC", "BTC", "PI"];

export default function CryptoP2P() {
  const { totalTrades, totalVolumeFormatted, avgMonthlyVolumeFormatted, lastTradeDate, isActive, supportedAssets } = useLiveMetrics();
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const brand = getServiceBrandColor("W3C DESK");
  const assetChips = supportedAssets?.length ? supportedAssets : ["BTC", "ETH", "USDT", "USDC", "PI", "TRX", "BNB", "SOL"];

  const handleGenerateRequest = () => {
    const formattedAmount = amount ? `${amount}` : "[Enter Amount]";
    const numAmount = Number(amount) || 0;

    trackDeskEnquiry(asset, tradeType.toLowerCase() as "buy" | "sell", numAmount);
    trackContactClick("WhatsApp", `W3C DESK - ${tradeType} ${asset} (Amount: ${formattedAmount})`);

    const text = `Hi W3C DESK, I'd like to ${tradeType} ${formattedAmount} ${asset}. Can I get the current rate?`;
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const p2pSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "W3C DESK Crypto P2P",
    description: "Peer-to-peer desk for converting crypto to Naira and back. Coordinated on WhatsApp. Public ledger of completed trades.",
    provider: {
      "@type": "ProfessionalService",
      name: branding.businessName,
      url: "https://web3currency.online",
    },
    areaServed: {
      "@type": "Country",
      name: "NG",
    },
  };

  return (
    <PageTransition>
      <SEO
        title={`W3C DESK | ${branding.businessName}`}
        description="Buy and sell crypto for Naira through W3C DESK. Quote on WhatsApp. Public ledger of completed trades."
        path="/services/crypto-p2p"
        schema={p2pSchema}
      />

      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}15, transparent 70%)` }}
          />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
                <Wallet className={`w-5 h-5 ${brand.twText}`} />
              </div>
              <span className={`text-xs uppercase tracking-widest font-medium ${brand.twText}`}>W3C DESK</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-3 leading-[1.1] tracking-tight text-gradient-hero">
              Buy and sell crypto for Naira.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
              WhatsApp quote. Public ledger. Typical settlement in 10–15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#desk-assistant"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-colors"
              >
                <SiWhatsapp className="w-4 h-4" />
                Request a rate
              </a>
              <Link
                href="/ledger"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm hover:bg-white/10"
              >
                View ledger
                <ArrowRight className="w-4 h-4 text-white/60" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[#050505] border-y border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <GlassCard className="p-5 sm:p-6 border border-white/5 bg-gradient-to-br from-[#0A0A0A] to-[#0E0E0E]">
            <div className="flex justify-between items-center pb-4 border-b border-white/[0.05] mb-4">
              <span className="text-xs font-mono font-bold text-white/50">DESK STATE</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? "bg-[#25D366]" : "bg-amber-500"} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? "bg-[#25D366]" : "bg-amber-500"}`} />
                </span>
                <span className={`text-xs font-mono font-bold ${isActive ? "text-[#25D366]" : "text-amber-500"}`}>
                  {isActive ? "ACTIVE" : "STANDBY"}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border bg-white/[0.01] border-white/5">
                <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">TRADES</span>
                <div className="text-xl font-mono font-black text-white">{totalTrades}</div>
              </div>
              <div className="p-3 rounded-xl border bg-white/[0.01] border-white/5">
                <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">VOLUME</span>
                <div className="text-xl font-mono font-black text-[#f97316]">{totalVolumeFormatted}</div>
              </div>
              <div className="p-3 rounded-xl border bg-white/[0.01] border-white/5">
                <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">AVG MONTHLY</span>
                <div className="text-xl font-mono font-black text-white">{avgMonthlyVolumeFormatted}</div>
              </div>
              <div className="p-3 rounded-xl border bg-white/[0.01] border-white/5">
                <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">LAST TRADE</span>
                <div className="text-xs font-mono font-bold text-white/70 py-1">{lastTradeDate}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-16 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-6 space-y-8">
              <div>
                <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-2`}>How it works</p>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${brand.twBg} ${brand.twBorder}`}>
                        <step.icon className={`w-5 h-5 ${brand.twText}`} />
                      </div>
                      <div className="pt-1">
                        <p className="font-semibold text-white text-sm">
                          <span className="font-mono text-white/30 mr-2">{step.num}</span>
                          {step.title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-3`}>Assets</p>
                <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {assetChips.map((token) => (
                    <span
                      key={token}
                      className="snap-start shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border bg-white/5 border-white/10 text-white/80"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-6" id="desk-assistant">
              <MotionGlassCard
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 p-7 border"
                style={{ borderColor: `${brand.hex}33`, backgroundColor: `${brand.hex}0A` }}
              >
                <div>
                  <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-1`}>Trade request</p>
                  <h2 className="text-lg font-display font-bold text-white">Build a WhatsApp quote</h2>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
                  {(["BUY", "SELL"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTradeType(type)}
                      style={tradeType === type ? { backgroundColor: brand.hex } : undefined}
                      className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        tradeType === type ? `text-black shadow-md ${brand.twShadow}` : "text-white/60 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2 uppercase tracking-wide">Asset</label>
                  <div className="grid grid-cols-4 gap-2">
                    {assistantAssets.map((token) => (
                      <button
                        key={token}
                        type="button"
                        onClick={() => setAsset(token)}
                        style={asset === token ? { borderColor: brand.hex } : undefined}
                        className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all duration-200 ${
                          asset === token ? `${brand.twBg} ${brand.twText}` : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                        }`}
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2 uppercase tracking-wide">
                    Amount ({asset})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 500"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 transition-colors ${brand.twBorderFocus} ${brand.twRingFocus}`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 font-bold">
                      {asset}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/[0.08] pt-5 flex flex-col gap-3">
                  <button
                    onClick={handleGenerateRequest}
                    className="w-full whatsapp-glow-hover flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    Request current rate
                  </button>
                  <p className="text-[10px] text-center text-white/40 leading-normal">
                    Opens WhatsApp with this request. Human desk — not an automated exchange.
                  </p>
                </div>
              </MotionGlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-black">
        <div className="container max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/ledger" className="text-sm text-white/70 hover:text-white underline underline-offset-4">
            Review completed trades
          </Link>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all"
          >
            Contact W3C
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
