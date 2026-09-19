import { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Wallet,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Tag,
  Handshake,
  Zap,
  Shield,
  Eye,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { metrics } from "@/config/metrics";
import { getServiceBrandColor } from "@/config/theme";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";
import { trackDeskEnquiry, trackContactClick } from "@/lib/analytics";

function SectionLabel({ text }: { text: string }) {
  const brand = getServiceBrandColor("W3C DESK");
  return (
    <span className={`text-xs uppercase tracking-widest font-medium ${brand.twText} block mb-2`}>
      {text}
    </span>
  );
}

const steps = [
  { num: "01", icon: MessageCircle, title: "Send a direct message", body: "Message the desk on WhatsApp to buy or sell any publicly tradable cryptocurrency." },
  { num: "02", icon: Tag, title: "Specify the trade", body: "Tell me exactly which cryptocurrency and how much you want to trade." },
  { num: "03", icon: Handshake, title: "Get a fair rate", body: "You receive the current exchange rate, inclusive of the service fee, upfront, no hidden spreads." },
  { num: "04", icon: Zap, title: "Trade is settled", body: "Once you agree, the trade is processed promptly, typically within 10–15 minutes." },
];

const assets = ["BTC", "ETH", "USDT", "USDC", "PI", "TRX", "BNB", "SOL", "& more"];

export default function CryptoP2P() {
  const { totalTrades, totalVolumeFormatted, avgMonthlyVolumeFormatted, lastTradeDate, isActive, supportedAssets } = useLiveMetrics();
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY");
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const brand = getServiceBrandColor("W3C DESK");

  const handleGenerateRequest = () => {
    const formattedAmount = amount ? `${amount}` : "[Enter Amount]";
    const numAmount = Number(amount) || 0;
    
    // Track custom analytic events
    trackDeskEnquiry(asset, tradeType.toLowerCase() as 'buy' | 'sell', numAmount);
    trackContactClick('WhatsApp', `W3C DESK - ${tradeType} ${asset} (Amount: ${formattedAmount})`);

    const text = `Hi ${branding.founderName}, I'd like to ${tradeType} ${formattedAmount} ${asset} through the W3C DESK. Can I get your current rate?`;
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const p2pSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "W3C DESK Crypto P2P",
    "description": `A secure, transparent peer-to-peer desk for converting crypto to Naira and back, coordinated directly on WhatsApp with ${branding.founderName}.`,
    "provider": {
      "@type": "ProfessionalService",
      "name": branding.businessName,
      "url": "https://web3currency.online"
    },
    "areaServed": {
      "@type": "Country",
      "name": "NG"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`W3C DESK, Crypto P2P Trading | ${branding.businessName}`}
        description={`A secure, transparent peer-to-peer desk for converting crypto to Naira and back, coordinated directly on WhatsApp with ${branding.founderName}.`}
        path="/services"
        schema={p2pSchema}
      />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}15, transparent 70%)` }} />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
                <Wallet className={`w-6 h-6 ${brand.twText}`} />
              </div>
              <span className={`text-xs uppercase tracking-widest font-medium ${brand.twText}`}>Service: W3C DESK</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] tracking-tight text-gradient-hero">
              A P2P desk you can actually trust.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-6">
              W3C DESK is a streamlined alternative to traditional exchanges, a way to convert digital assets to Naira, and back, securely and directly with a registered, verified operator. All coordination happens on WhatsApp for maximum clarity and safety.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 tracking-wide">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${brand.twDot}`} />
              OPERATIONS COORDINATED DIRECTLY VIA WHATSAPP
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trading Transparency Section */}
      <section className="py-20 md:py-24 bg-[#050505] relative border-b border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>Verifiable Transparency</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">Trading Transparency</h2>
              <p className="text-base text-white/70 leading-relaxed max-w-xl">
                Every completed trade is recorded in the <strong>W3C DESK Transparency Ledger</strong>. You don't have to rely on marketing claims. You can review my trading activity, volumes, and transaction history yourself.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/ledger"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm transition-all hover:bg-white/10 hover:border-white/20`}
                >
                  View Trading Ledger
                  <ArrowRight className="w-4 h-4 text-white/60" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white/70 hover:text-white font-semibold text-sm transition-colors"
                >
                  Learn How W3C DESK Works
                </a>
              </div>
            </div>
            
            <div className="md:col-span-5">
              <GlassCard 
                className="p-6 sm:p-8 border border-white/5 space-y-6 bg-gradient-to-br from-[#0A0A0A] to-[#0E0E0E]"
              >
                <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                  <span className="text-xs font-mono font-bold text-white/50">W3C DESK STATE</span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? 'bg-[#25D366]' : 'bg-amber-500'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-[#25D366]' : 'bg-amber-500'}`}></span>
                    </span>
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#25D366]' : 'text-amber-500'}`}>{isActive ? 'ACTIVE' : 'STANDBY'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border bg-white/[0.01] border-white/5 text-left">
                    <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">TOTAL TRADES</span>
                    <div className="text-xl sm:text-2xl font-mono font-black text-white">{totalTrades}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border bg-white/[0.01] border-white/5 text-left">
                    <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">TOTAL VOLUME</span>
                    <div className="text-xl sm:text-2xl font-mono font-black text-[#f97316]">{totalVolumeFormatted}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border bg-white/[0.01] border-white/5 text-left">
                    <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">AVG MONTHLY</span>
                    <div className="text-xl sm:text-2xl font-mono font-black text-white">{avgMonthlyVolumeFormatted}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border bg-white/[0.01] border-white/5 text-left">
                    <span className="text-[10px] font-mono font-bold text-white/30 block mb-1">LAST UPDATED</span>
                    <div className="text-[11px] sm:text-xs font-mono font-bold text-white/70 py-1">{lastTradeDate}</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* What it is + How it works */}
      <section id="how-it-works" className="py-20 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-7 space-y-10">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <SectionLabel text="What W3C DESK Is" />
                <p className="text-white/80 leading-[1.75] text-[1.05rem]">
                  A fully compliant peer-to-peer transaction desk handling major digital assets including BTC, USDT, USDC, PI, and other core tokens, connecting you directly with a verified merchant instead of an anonymous exchange order book.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.05 }}>
                <SectionLabel text="How the Trading Process Works" />
                <div className="space-y-4 mt-4">
                  {steps.map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${brand.twBg} ${brand.twBorder}`}>
                          <step.icon className={`w-5 h-5 ${brand.twText}`} />
                        </div>
                        <span className="text-[0.65rem] font-mono text-muted-foreground">{step.num}</span>
                      </div>
                      <div className="pt-1.5">
                        <p className="font-semibold text-white">{step.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                <SectionLabel text="Why WhatsApp" />
                <p className="text-muted-foreground leading-[1.75]">
                  I chose WhatsApp because it's where most of my clients are already comfortable communicating.
                  It makes every trade more direct, more transparent, and easier to coordinate. You speak directly with me, receive updates as your trade progresses, and always know who you're dealing with from start to finish.
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-5">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }} className="sticky top-32">
                <GlassCard 
                  className="flex flex-col gap-6 p-8 border transition-all duration-300"
                  style={{ borderColor: `${brand.hex}33`, backgroundColor: `${brand.hex}0A` }}
                >
                  <div>
                    <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-1`}>Interactive Desk Assistant</p>
                    <h3 className="text-lg font-display font-bold text-white mb-3">Trade Request Assistant</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Select transaction details to pre-configure your request before chatting directly with {branding.founderName}.
                    </p>
                  </div>

                  {/* Buy / Sell Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setTradeType("BUY")}
                      style={tradeType === "BUY" ? { backgroundColor: brand.hex } : undefined}
                      className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        tradeType === "BUY"
                          ? `text-black shadow-md ${brand.twShadow}`
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      BUY Crypto
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeType("SELL")}
                      style={tradeType === "SELL" ? { backgroundColor: brand.hex } : undefined}
                      className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        tradeType === "SELL"
                          ? `text-black shadow-md ${brand.twShadow}`
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      SELL Crypto
                    </button>
                  </div>

                  {/* Asset Selection */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-2 uppercase tracking-wide">Select Digital Asset</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["USDT", "USDC", "BTC", "PI"].map((token) => (
                        <button
                          key={token}
                          type="button"
                          onClick={() => setAsset(token)}
                          style={asset === token ? { borderColor: brand.hex } : undefined}
                          className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all duration-200 ${
                            asset === token
                              ? `${brand.twBg} ${brand.twText}`
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          {token}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-2 uppercase tracking-wide">
                      Target Amount ({asset})
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

                  {/* Action Button */}
                  <div className="border-t border-white/[0.08] pt-6 flex flex-col gap-3">
                    <button
                      onClick={handleGenerateRequest}
                      className="w-full whatsapp-glow-hover flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <SiWhatsapp className="w-5 h-5" />
                      Request Current Rate
                    </button>
                    <p className="text-[10px] text-center text-white/40 leading-normal">
                      W3C DESK is a human-operated service, not an automated exchange. Click above to send these exact details to {branding.founderName}.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-black">
        <div className="container max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground">
            Not ready to trade yet?{" "}
            <Link href="/services?tab=community" className="text-white font-medium hover:text-primary transition-colors underline underline-offset-4">
              Join W3C Community
            </Link>{" "}
            to learn first, or{" "}
            <Link href="/services" className="text-white font-medium hover:text-primary transition-colors underline underline-offset-4">
              browse all services
            </Link>
            .
          </p>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Contact {branding.founderName}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
