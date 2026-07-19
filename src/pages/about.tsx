import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Mail, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  FileText, 
  PenTool, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Sparkles, 
  Clock, 
  Compass, 
  Calendar,
  ChevronRight,
  BookOpen,
  Briefcase
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { metrics } from "@/config/metrics";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="text-xs uppercase tracking-widest font-mono font-semibold text-primary block mb-3">
      {text}
    </span>
  );
}

export default function About() {
  const handleWhatsappInquiry = () => {
    const text = `Hi ${branding.founderName}, I read your story on the About page and would like to start a conversation.`;
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const timelineSteps = [
    {
      phase: "01",
      title: "Community & Learning",
      body: "Everything started with building a community where people could learn about cryptocurrency, Web3, and digital technology without unnecessary hype or confusion. Helping people understand came before offering any service.",
      icon: Users,
    },
    {
      phase: "02",
      title: "W3C DESK",
      body: `As the community grew, many members needed a safer and more reliable way to buy and sell cryptocurrency. That led to the creation of W3C DESK, a WhatsApp-based crypto P2P service built around speed, transparency, and trust. Every trade reinforced the importance of clear communication and dependable service.`,
      icon: Compass,
    },
    {
      phase: "03",
      title: "Website Design & Development",
      body: "Working with businesses introduced another challenge. Many people needed a professional online presence but found traditional web development expensive, slow, or unnecessarily complicated. Using modern AI-assisted workflows together with thoughtful design, I began helping businesses launch websites faster while maintaining quality.",
      icon: PenTool,
    },
    {
      phase: "04",
      title: "W3C Digital Network",
      body: "Eventually, it became clear that all these services shared the same purpose: Helping people navigate the digital world with confidence. Instead of keeping everything separate, I brought them together under one identity. Today, W3C Digital Network represents the complete ecosystem I continue building.",
      icon: Globe,
    },
  ];

  const principles = [
    {
      title: "People Before Sales",
      body: "I would rather recommend a simpler solution than convince someone to pay for something they do not need. Long-term trust matters more than short-term income.",
      icon: Users,
    },
    {
      title: "Clear Communication",
      body: "Technology can already be complicated. My job is to make it easier to understand, not harder. I explain things in plain language and keep communication open throughout every project.",
      icon: MessageCircle,
    },
    {
      title: "Practical Solutions",
      body: "I care more about results than trends. Every recommendation should solve a real problem and create genuine value.",
      icon: CheckCircle2,
    },
    {
      title: "Continuous Learning",
      body: "Technology changes every day. I spend time exploring new tools, participating in Web3 ecosystems, testing AI workflows, and improving the way I work so I can continue delivering better solutions.",
      icon: Sparkles,
    },
  ];

  const workflowSteps = [
    { step: "01", text: "You contact me." },
    { step: "02", text: "We discuss your goals." },
    { step: "03", text: "I recommend the most practical approach." },
    { step: "04", text: "Once we agree on a plan, I keep you informed throughout the entire process." },
  ];

  const { totalTrades, totalVolumeFormatted, lastTradeDate } = useLiveMetrics();

  const statCards = [
    { label: "Total Trading Volume", value: totalVolumeFormatted, icon: TrendingUp },
    { label: "Trades Completed", value: totalTrades.toString(), icon: CheckCircle2 },
    { label: "Community Members", value: metrics.communitySize, icon: Users },
    { label: "Protocol Explored", value: metrics.testnetsCompleted, icon: Compass },
    { label: "People Supported", value: metrics.clientsSupported, icon: Globe },
    { label: "Year Founded", value: metrics.activeSince, icon: BookOpen },
    { label: "Officially Registered", value: branding.cacStatus, subValue: branding.rcNumber, icon: ShieldCheck },
    { label: "Last Updated", value: lastTradeDate, icon: Clock },
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${branding.founderName} - ${branding.businessName}`,
    "description": `Meet ${branding.founderName} and read the story, values, and journey behind ${branding.businessName}.`,
    "mainEntity": {
      "@type": "Person",
      "name": branding.founderName,
      "description": branding.shortBio,
      "jobTitle": "Lead Architect, UI Designer & Core Developer"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`About ${branding.founderName} | ${branding.businessName}`}
        description={`Meet ${branding.founderName} and read the story, values, and journey behind ${branding.businessName}.`}
        path="/about"
        schema={aboutSchema}
      />

      {/* SECTION 1: Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-black border-b border-white/[0.08]">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="https://i.imgur.com/cGKA8AC.png" 
            alt="Jake Background" 
            className="w-full h-full object-cover object-center opacity-45 md:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
        </div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
              You already know what I do.<br/>
              <span className="text-primary italic">This page is about why I do it.</span>
            </h1>
            <div className="h-1 w-12 bg-primary mx-auto my-8 rounded-full" />
            <div className="space-y-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              <p>
                W3C Digital Network didn't begin with a business plan or a company office. It grew from years of helping people solve real digital problems, answering questions, completing crypto trades, building websites, and guiding people through technologies that often felt confusing.
              </p>
              <p>
                Behind every service you see on this website is one person who believes digital tools should be practical, accessible, and genuinely useful.
              </p>
              <p className="font-display font-bold text-white text-lg">
                This is the story behind W3C Digital Network.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: How It All Started */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              How It All Started
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4 font-normal">
              <p>
                My journey into the digital world wasn't driven by the idea of starting a company.
              </p>
              <p className="border-l-2 border-primary pl-4 py-1 italic text-primary font-medium">
                It started with curiosity.
              </p>
              <p className="text-muted-foreground">
                I spent years learning about cryptocurrency, blockchain technology, artificial intelligence, website development, and digital systems because I wanted to understand how they worked and how they could create opportunities.
              </p>
              <p>
                As I learned, people naturally began asking questions.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 py-2 text-muted-foreground text-sm">
                <li className="flex items-center gap-3 bg-black/45 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Some wanted help understanding crypto.</span>
                </li>
                <li className="flex items-center gap-3 bg-black/45 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Others wanted a safer way to buy or sell assets.</span>
                </li>
                <li className="flex items-center gap-3 bg-black/45 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Some needed websites.</span>
                </li>
                <li className="flex items-center gap-3 bg-black/45 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Others simply wanted honest advice.</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                The more I helped, the more I realized something.
              </p>
              <p className="text-white font-semibold">
                Most people weren't looking for another company.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl">
                They were looking for someone they could trust to explain things clearly and help them make better decisions.
              </p>
              <p className="text-muted-foreground">
                That realization became the foundation of W3C Digital Network.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: The Journey Timeline */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              The Journey
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              The step-by-step growth from an informal community into a comprehensive digital ecosystem.
            </p>
          </motion.div>

          <div className="relative border-l border-white/10 md:border-l-0 md:grid md:grid-cols-4 md:gap-6 pl-6 md:pl-0 space-y-12 md:space-y-0">
            {timelineSteps.map((step, idx) => {
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Phase badge on top */}
                  <div className="hidden md:flex items-center justify-center gap-2 mb-4">
                    <div className="h-px flex-grow bg-white/10" />
                    <span className="text-xs font-mono text-primary font-bold shrink-0">PHASE {step.phase}</span>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <GlassCard className="p-6 md:p-5 h-full flex flex-col justify-between border-white/5 bg-white/[0.015] hover:border-primary/20 transition-all duration-300">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why W3C Digital Network Exists */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Why W3C Digital Network Exists
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4 font-normal">
              <p className="text-white font-semibold text-lg sm:text-xl">
                Technology should create opportunities, not confusion.
              </p>
              <p className="text-muted-foreground">
                Unfortunately, many digital services feel complicated, impersonal, or difficult to trust.
              </p>
              <p className="border-l-2 border-primary pl-4 text-primary font-medium py-1">
                My goal is different.
              </p>
              <p>
                I want people to know there is one place they can go when they need practical digital support.
              </p>
              <p className="text-muted-foreground">
                Whether that means completing a secure crypto trade, building a modern website, exploring Web3, or simply asking questions, the experience should always feel personal, honest, and straightforward.
              </p>
              <p className="font-display font-bold text-primary text-lg">
                That is the purpose of W3C Digital Network.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How I Work */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              How I Work
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p className="text-primary font-semibold text-lg sm:text-xl">
                Every project begins with a conversation.
              </p>
              <p className="text-muted-foreground">
                I believe good solutions come from understanding people before recommending tools. When someone contacts me, I focus on understanding what they are trying to achieve before discussing services.
              </p>
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Scenario A</span>
                  <p className="text-xs sm:text-sm text-white font-medium">Sometimes the answer is a website.</p>
                </div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Scenario B</span>
                  <p className="text-xs sm:text-sm text-white font-medium">Sometimes it is guidance.</p>
                </div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Scenario C</span>
                  <p className="text-xs sm:text-sm text-white font-medium">Sometimes it is a secure crypto transaction.</p>
                </div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Scenario D</span>
                  <p className="text-xs sm:text-sm text-white font-medium">Sometimes it is simply helping someone avoid making an expensive mistake.</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                The goal has never been to sell the most services.
              </p>
              <p className="text-white font-semibold border-l-2 border-primary pl-4 py-1 italic">
                The goal is to provide the right solution.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: The Principles Behind Everything I Do */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              The Principles Behind Everything I Do
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((pr, idx) => {
              const Icon = pr.icon;
              return (
                <motion.div
                  key={pr.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <GlassCard className="p-8 h-full flex flex-col gap-4 border-white/10 bg-white/[0.015] hover:border-primary/20 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl">{pr.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{pr.body}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: What Working With Me Looks Like */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                What Working With Me Looks Like
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                The process is intentionally simple. There are no complicated ticketing systems. No unnecessary meetings. No passing your project between different departments. You work directly with me from beginning to end.
              </p>
            </div>
            <div className="md:col-span-6">
              <GlassCard className="p-6 border-white/10 bg-white/[0.01] divide-y divide-white/[0.06]">
                {workflowSteps.map((ws) => (
                  <div key={ws.step} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="text-sm font-mono font-bold text-primary shrink-0">{ws.step}</span>
                    <p className="text-sm text-white/90 font-medium leading-relaxed">{ws.text}</p>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Building Trust Through Consistency */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Building Trust Through Consistency
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4 font-normal">
              <p>
                W3C Digital Network is an officially registered business operating with transparency and accountability.
              </p>
              <p className="text-muted-foreground">
                Over time, the work has expanded from community building into secure crypto trading, website development, and digital consulting, but one thing has remained the same:
              </p>
              <p className="border-l-2 border-primary pl-4 text-primary font-medium py-1 italic">
                Consistency.
              </p>
              <p>
                Every conversation, every trade, every project, and every recommendation contributes to the reputation I continue building.
              </p>
              <p className="text-muted-foreground font-semibold">
                For me, trust is not something claimed. It is something earned through consistent actions.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/5 text-xs font-mono text-white/85">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>CAC Registered • {branding.rcNumber}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: By the Numbers */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              By the Numbers
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              Live, dynamic metrics pulled from our centralized content management system.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((sc, idx) => {
              const Icon = sc.icon;
              return (
                <motion.div
                  key={sc.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <GlassCard className="p-6 h-full flex flex-col justify-between border-white/5 bg-white/[0.015] hover:border-primary/10 transition-colors">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider block mb-2">{sc.label}</span>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-display font-bold text-white leading-none">{sc.value}</div>
                      {sc.subValue && (
                        <div className="text-[10px] font-mono text-muted-foreground mt-1">{sc.subValue}</div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: Looking Ahead */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Looking Ahead
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4 font-normal">
              <p className="text-white font-semibold">
                W3C Digital Network is still growing.
              </p>
              <p className="text-muted-foreground">
                The vision is not to become the biggest company.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl border-l-2 border-primary pl-4 py-1 italic">
                The vision is to become one of the most trusted digital partners for individuals and businesses looking to navigate technology with confidence.
              </p>
              <p className="text-muted-foreground">
                As the network grows, I will continue expanding the services, improving the platforms, and exploring new technologies while keeping the experience personal and approachable.
              </p>
              <p className="font-display font-bold text-white">
                Growth should never come at the cost of trust.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL SECTION: Let's Start With a Conversation */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
        
        <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm px-6 py-14 sm:px-16 sm:py-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Let's Start With a Conversation
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              <p>
                Whether you need a website, want to complete a secure crypto trade, have questions about Web3, or simply need someone to help you think through a digital challenge, I would be glad to hear from you.
              </p>
              <p>
                I have created a central Contact Hub on this website so you can easily choose your preferred communication channel — whether it's WhatsApp for quick trades, Telegram for ongoing chats, or Email for formal proposals.
              </p>
              <p className="text-white font-medium text-base">
                Visit the W3C Communication Hub to choose your preferred way to connect and get in touch directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto glow-primary-hover inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-black font-bold text-base sm:text-lg border border-primary/40 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Start the Conversation
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/[0.03] text-white font-semibold text-base sm:text-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
