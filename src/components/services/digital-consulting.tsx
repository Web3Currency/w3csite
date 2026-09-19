import { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Headphones,
  Check,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";

function SectionLabel({ text }: { text: string }) {
  const brand = getServiceBrandColor("Digital Consulting");
  return (
    <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText} block mb-3`}>
      {text}
    </span>
  );
}

interface ConsultingTopic {
  id: string;
  label: string;
  emoji: string;
  colorClass: string;
  activeColorClass: string;
  message: string;
}

const topics: ConsultingTopic[] = [
  {
    id: "web3",
    label: "Web3 & Crypto",
    emoji: "🟣",
    colorClass: "border-purple-500/20 bg-purple-500/[0.02] text-purple-400 hover:bg-purple-500/[0.05] hover:border-purple-500/40",
    activeColorClass: "border-purple-500 bg-purple-500/[0.08] text-purple-300 ring-2 ring-purple-500/20",
    message: "Hi Jake, I'm reaching out from your website and would like some consulting advice on Web3 & Crypto."
  },
  {
    id: "websites",
    label: "Websites",
    emoji: "🟡",
    colorClass: "border-amber-500/20 bg-amber-500/[0.02] text-amber-400 hover:bg-amber-500/[0.05] hover:border-amber-500/40",
    activeColorClass: "border-amber-500 bg-amber-500/[0.08] text-amber-300 ring-2 ring-amber-500/20",
    message: "Hi Jake, I'm reaching out from your website and would like some consulting advice on Website planning or development."
  },
  {
    id: "ai",
    label: "AI Tools",
    emoji: "🟢",
    colorClass: "border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-400 hover:bg-emerald-500/[0.05] hover:border-emerald-500/40",
    activeColorClass: "border-emerald-500 bg-emerald-500/[0.08] text-emerald-300 ring-2 ring-emerald-500/20",
    message: "Hi Jake, I'm reaching out from your website and would like some consulting advice on choosing or using AI tools."
  },
  {
    id: "strategy",
    label: "Digital Strategy",
    emoji: "🔵",
    colorClass: "border-blue-500/20 bg-blue-500/[0.02] text-blue-400 hover:bg-blue-500/[0.05] hover:border-blue-500/40",
    activeColorClass: "border-blue-500 bg-blue-500/[0.08] text-blue-300 ring-2 ring-blue-500/20",
    message: "Hi Jake, I'm reaching out from your website and would like some consulting advice on digital strategy or workflows."
  },
  {
    id: "other",
    label: "Something Else",
    emoji: "⚪",
    colorClass: "border-zinc-500/20 bg-zinc-500/[0.02] text-zinc-400 hover:bg-zinc-500/[0.05] hover:border-zinc-500/40",
    activeColorClass: "border-zinc-500 bg-zinc-500/[0.08] text-zinc-300 ring-2 ring-zinc-500/20",
    message: "Hi Jake, I'm reaching out from your website and have a digital question about something else."
  }
];

export default function DigitalConsulting() {
  const brand = getServiceBrandColor("Digital Consulting");
  const [selectedTopic, setSelectedTopic] = useState<ConsultingTopic>(topics[0]);

  const handleWhatsAppRedirect = (customMessage?: string) => {
    const textToSend = customMessage || selectedTopic.message;
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const consultingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Consulting & Strategy",
    "description": "Clear answers for digital decisions. Independent, honest advisory and strategy without the corporate jargon.",
    "provider": {
      "@type": "ProfessionalService",
      "name": branding.businessName,
      "url": "https://web3currency.online"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`Digital Consulting | ${branding.businessName}`}
        description={`Clear answers for digital decisions. Independent, honest advisory and strategy without the corporate jargon.`}
        path="/services"
        schema={consultingSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}10, transparent 70%)` }} />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center sm:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-6">
            <div className="flex flex-row items-center gap-3 justify-center sm:justify-start">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
                <Headphones className={`w-6 h-6 ${brand.twText}`} />
              </div>
              <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>Digital Consulting</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-black leading-[1.1] tracking-tight text-white">
              Clear answers for digital decisions.
            </h1>
            <div className="space-y-4 max-w-3xl">
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium">
                Sometimes you don't need someone to build anything. You just need someone you can trust to help you make the right decision.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Whether you're exploring Web3, planning a website, choosing digital tools, or trying to solve a technical problem, I'll help you understand your options and recommend the most practical way forward.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Core Content Grid */}
      <section className="py-20 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Talk about & Who it's for */}
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                <SectionLabel text="What We Can Talk About" />
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  There isn't a fixed checklist. Every conversation is different, but people usually reach out when they need help with things like:
                </p>
                <ul className="space-y-3">
                  {[
                    "Understanding a Web3 project before getting involved",
                    "Choosing the right tools for their business",
                    "Planning a website before hiring a developer",
                    "Improving an existing digital workflow",
                    "Getting a second opinion before spending money",
                    "Solving a technical problem they can't figure out alone",
                    "Learning how to approach a new digital opportunity"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0 mt-2.5" />
                      <span className="text-white/80 text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                <SectionLabel text="Who It's For" />
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {["Business Owners", "Creators", "Freelancers", "Students", "Crypto Users"].map((user) => (
                      <span key={user} className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono font-medium text-white/90">
                        {user}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    Anyone who wants honest advice before making an important digital decision.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Reach Out If & What You'll Leave With */}
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.05 }}>
                <SectionLabel text="You Might Reach Out If..." />
                <ul className="space-y-3">
                  {[
                    "You're not sure if a crypto opportunity is genuine.",
                    "You're overwhelmed by different tools and opinions.",
                    "You want someone to explain things without unnecessary jargon.",
                    "You're planning a digital project and want a second opinion.",
                    "You know where you want to go but aren't sure of the next step."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 shrink-0 mt-2.5" />
                      <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.15 }}>
                <SectionLabel text="What You'll Leave With" />
                <ul className="space-y-3.5">
                  {[
                    "A clearer understanding of your options.",
                    "A practical action plan.",
                    "Recommended tools or platforms.",
                    "Answers to questions you've been stuck on.",
                    "More confidence in your next decision."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-[#f97316]/10 bg-[#f97316]/[0.01]">
                      <Check className="w-4 h-4 shrink-0 mt-1 text-[#f97316]" />
                      <span className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* How Our Conversation Works */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center sm:text-left mb-12">
            <SectionLabel text="How Our Conversation Works" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">Direct human-to-human process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Tell me what's going on",
                body: "Start by explaining your situation on WhatsApp. No forms. No complicated booking process."
              },
              {
                step: "2",
                title: "We'll figure it out together",
                body: "I'll ask questions, understand your situation, and identify where you actually need help."
              },
              {
                step: "3",
                title: "I'll recommend the best path",
                body: "If there's a simple solution, I'll tell you. If something isn't worth your time, I'll tell you that too."
              },
              {
                step: "4",
                title: "Keep moving forward",
                body: "If you need more guidance afterwards, you can always reach out again."
              }
            ].map((step, i) => (
              <GlassCard key={step.step} className="p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between">
                <div>
                  <span className={`text-2xl font-mono font-black ${brand.twText} block mb-4`}>
                    0{step.step}
                  </span>
                  <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Topic selector (Simplified Interactive diagnosis) */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText} block mb-2`}>Get Started</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">What do you need help with?</h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Choose the topic closest to your situation to instantly tailor our starting discussion.
            </p>
          </div>

          <div className="space-y-8">
            {/* Quick selectors */}
            <div className="flex flex-wrap gap-3 justify-center">
              {topics.map((t) => {
                const isSelected = selectedTopic.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTopic(t)}
                    className={`py-3 px-5 rounded-2xl text-sm font-semibold transition-all duration-200 border flex items-center gap-2 ${
                      isSelected ? t.activeColorClass : `${t.colorClass} border-white/5`
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Message Preview Box */}
            <motion.div 
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border border-white/5 bg-black/40 text-left space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">WhatsApp Starter Message</span>
                <span className="text-[10px] font-mono text-[#f97316] font-bold uppercase tracking-wider">Ready to send</span>
              </div>
              <p className="text-sm font-mono text-white/80 leading-relaxed bg-black/50 p-4 rounded-xl border border-white/[0.02]">
                {selectedTopic.message}
              </p>
              
              <button
                onClick={() => handleWhatsAppRedirect()}
                className="w-full whatsapp-glow-hover flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              >
                <SiWhatsapp className="w-5 h-5" />
                Consult regarding {selectedTopic.label}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Refined CTA */}
      <section className="py-20 md:py-28 bg-zinc-950 border-t border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <SectionLabel text="Still wondering?" />
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">Not sure if this is the right service?</h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              That's okay. Send me a message anyway. If Digital Consulting isn't the right fit, I'll point you to the service that is. Sometimes the best advice is simply knowing where to start.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleWhatsAppRedirect("Hi Jake, I saw your digital consulting page. I'm not sure if my problem fits consulting, but I'd like to ask a quick question.")}
              className="whatsapp-glow-hover inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-all w-full sm:w-auto justify-center"
            >
              <SiWhatsapp className="w-5 h-5" />
              Start a Conversation
            </button>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl border border-white/10 bg-white/[0.02] text-white font-bold text-sm hover:bg-white/[0.05] transition-all w-full sm:w-auto block text-center"
            >
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
