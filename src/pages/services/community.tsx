import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Users,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  Compass,
  Wallet,
  Wrench,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackCommunityJoin } from "@/lib/analytics";

function SectionLabel({ text }: { text: string }) {
  const brand = getServiceBrandColor("Web3 Community & Learning");
  return (
    <span className={`text-xs uppercase tracking-widest font-medium ${brand.twText} block mb-2`}>
      {text}
    </span>
  );
}

const learn = [
  { icon: Compass, title: "Web3 Navigation", body: "Blockchain fundamentals, secure wallet setup, and how to evaluate new networks and projects." },
  { icon: ShieldCheck, title: "Scam & Risk Awareness", body: "How to spot common Web3 scams, hype-driven traps, and unsafe token launches before they cost you." },
  { icon: Wrench, title: "Testnet & Airdrop Research", body: "Curated, active testnet participation and airdrop research shared as a group, not chased alone." },
  { icon: Wallet, title: "Practical Crypto Skills", body: "Safe day-to-day handling of digital assets, including how the W3C DESK P2P process actually works." },
];

const culture = [
  "No hype, no financial advice, just real Web3 knowledge and honest discussion.",
  "Education first: nothing is gatekept, and questions from total beginners are welcome.",
  "Members share research and ask questions openly; no one learns alone.",
  "Safety and risk-mitigation are prioritized over chasing trends.",
];

export default function CommunityService() {
  const brand = getServiceBrandColor("Web3 Community & Learning");

  const communitySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "W3C Community Hub",
    "description": `A free, WhatsApp-based Web3 learning community founded by ${branding.founderName}, built to make crypto and Web3 easy, safe, and educational.`,
    "provider": {
      "@type": "ProfessionalService",
      "name": branding.businessName,
      "url": "https://web3currency.online"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`W3C Community | ${branding.businessName}`}
        description={`A free, WhatsApp-based Web3 learning community founded by ${branding.founderName}, built to make crypto and Web3 easy, safe, and educational.`}
        path="/services/community"
        schema={communitySchema}
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
                <Users className={`w-6 h-6 ${brand.twText}`} />
              </div>
              <span className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium ${brand.twText}`}>
                Service: W3C Community
              </span>
              <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono font-semibold tracking-widest border ${brand.twBg} ${brand.twBorder} ${brand.twText}`}>
                LEARN • EXPLORE • EARN
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] tracking-tight text-gradient-hero">
              Learn Web3, together, for free.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              W3C Community is a free, WhatsApp-based learning space focused on making Web3 easy, safe, and educational, especially for beginners. It's the same standard for Web3 navigation {branding.founderName} built at Web3 Currency, now folded into {branding.businessName}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why it exists + why WhatsApp */}
      <section className="py-20 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-7 space-y-8">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <SectionLabel text="Why the Community Exists" />
                <p className="text-white/80 leading-[1.75] text-[1.05rem]">
                  The digital asset landscape is fragmented and full of noise. W3C Community exists to cut through it, a structured environment where people learn Web3 fundamentals, ask questions without judgment, and build digital confidence together, without hype or empty promises.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.05 }}>
                <SectionLabel text="Why It Operates on WhatsApp" />
                <p className="text-muted-foreground leading-[1.75]">
                  While the W3C website serves as our central business headquarters, the community operates on WhatsApp because of its direct, everyday accessibility. There's no app to download, no confusing forum to navigate, and no algorithm deciding what you see. Just a direct, real-time space where members and {branding.founderName} talk plainly, and questions get real answers.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                <SectionLabel text="What Members Learn" />
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {learn.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
                        <item.icon className={`w-4 h-4 ${brand.twText}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-5">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }} className="sticky top-32">
                <GlassCard 
                  className="flex flex-col gap-6 p-8 border transition-all duration-300"
                  style={{ borderColor: `${brand.hex}33`, backgroundColor: `${brand.hex}0A` }}
                >
                  <div>
                    <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-3`}>Community Culture</p>
                    <ul className="space-y-3">
                      {culture.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${brand.twText}`} />
                          <span className="text-sm text-white/80 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-white/[0.08] pt-6">
                    <p className={`text-xs uppercase tracking-widest font-medium ${brand.twText} mb-2`}>Join Process</p>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      The W3C Community is part of W3C Digital Network and currently operates primarily on WhatsApp. Joining is free and takes one tap.
                    </p>
                    <a
                      href={contact.whatsappCommunityUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackCommunityJoin('Community Service Page Card')}
                      className="whatsapp-glow-hover flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-full bg-[#25D366] text-black font-bold hover:bg-[#20c05a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <SiWhatsapp className="w-5 h-5" />
                      Join W3C Community
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content shared + benefits */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="mb-12 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
              <GraduationCap className={`w-7 h-7 ${brand.twText}`} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Content Shared & Benefits of Joining</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Curated Web3 News", body: "Real-time updates and research on emerging protocols and networks, filtered for relevance, not hype." },
              { title: "Direct Access to JAKE", body: `Ask questions and get answers from ${branding.founderName} directly, without layers of support tiers.` },
              { title: "A Vetted, Serious Network", body: "Connect with other members who are actually building, learning, and trading, not just lurking." },
            ].map((item, i) => (
              <MotionGlassCard key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 border-white/10 bg-white/[0.02]">
                <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </MotionGlassCard>
            ))}
          </div>


        </div>
      </section>

      <section className="py-16 md:py-20 bg-zinc-950 border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground">
            Curious about trading once you've learned the basics?{" "}
            <Link href="/services/crypto-p2p" className="text-white font-medium hover:text-purple-400 transition-colors underline underline-offset-4">
              See W3C DESK
            </Link>{" "}
            or{" "}
            <Link href="/services" className="text-white font-medium hover:text-purple-400 transition-colors underline underline-offset-4">
              browse all services
            </Link>
            .
          </p>
          <Link
            href="/contact"
            style={{ backgroundColor: brand.hex }}
            className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-black font-bold hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${brand.twRingFocus}`}
          >
            Contact {branding.founderName}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
