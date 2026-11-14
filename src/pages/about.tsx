import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Users,
  CheckCircle2,
  ShieldCheck,
  Wallet,
  Bot,
  LayoutTemplate,
  Compass,
  Globe,
} from "lucide-react";
import { branding } from "@/config/branding";

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `Meet ${branding.founderName} | ${branding.businessName}`,
    "description": `Meet ${branding.founderName}, founder of ${branding.businessName}, and learn about the vision and work behind the network.`,
    "url": "https://web3currency.online/about",
    "isPartOf": {
      "@type": "WebSite",
      "name": branding.businessName,
      "url": "https://web3currency.online"
    },
    "mainEntity": {
      "@id": "https://web3currency.online/#founder"
    }
  };

  const currentAreas = [
    {
      title: "Crypto P2P",
      body: "P2P cryptocurrency services through W3C DESK, with clear communication and transparent processes.",
      icon: Wallet,
    },
    {
      title: "Websites & Development",
      body: "Websites, landing pages and digital experiences for individuals, businesses and projects.",
      icon: LayoutTemplate,
    },
    {
      title: "Digital Solutions",
      body: "Practical support for digital needs, tools and challenges.",
      icon: Compass,
    },
    {
      title: "Web3 & AI",
      body: "Exploring emerging technology and finding useful ways to apply it.",
      icon: Bot,
    },
    {
      title: "Community & Education",
      body: "Spaces to learn, ask questions, exchange knowledge and connect with others.",
      icon: Users,
    },
    {
      title: "Digital Products",
      body: "Developing tools and applications with a clear purpose.",
      icon: Globe,
    },
  ];

  const principles = [
    {
      title: "People Before Sales",
      body: "Understand what someone needs before recommending a service. The right solution matters more than making a sale.",
      icon: Users,
    },
    {
      title: "Clear Communication",
      body: "Keep people informed, explain things plainly and make expectations clear from the beginning.",
      icon: ShieldCheck,
    },
    {
      title: "Practicality Over Hype",
      body: "Focus on useful work and real outcomes rather than following trends for their own sake.",
      icon: CheckCircle2,
    },
    {
      title: "Keep Improving",
      body: "Stay curious, learn continuously and refine the way things are built and delivered.",
      icon: Compass,
    },
  ];

  const sections = [
    {
      eyebrow: "THE PERSON BEHIND THE NETWORK",
      title: "A creative approach to technology.",
      paragraphs: [
        "My background in visual creativity shaped how I approach ideas, design and problem-solving. Over time, that interest expanded into technology, cryptocurrency, Web3 and artificial intelligence.",
        "Today, I bring those areas together through projects that solve problems, make digital services more accessible and create room for new opportunities."
      ],
      background: "bg-zinc-950",
    },
    {
      eyebrow: "THE VISION",
      title: "Why I built W3C.",
      paragraphs: [
        "The digital world offers enormous opportunities, but finding reliable services, useful tools and clear guidance is not always straightforward.",
        "I created W3C Digital Network to bring different parts of that world into one connected ecosystem.",
        "W3C stands for Web3 Currency. The Digital Network reflects a broader vision that extends beyond cryptocurrency into digital services, technology, products and community."
      ],
      background: "bg-black",
    },
  ];

  return (
    <PageTransition>
      <SEO
        title="Meet JAKE | Founder of W3C Digital Network"
        description="Meet JAKE, founder of W3C Digital Network. Explore the vision, work and principles behind its crypto P2P services, digital solutions, website development and Web3 community."
        path="/about"
        schema={aboutSchema}
      />

      {/* Founder introduction */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-black border-b border-white/[0.08]">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src="https://i.imgur.com/cGKA8AC.png"
            alt="JAKE"
            className="w-full h-full object-cover object-center opacity-45 md:opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        <div className="site-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-primary block mb-6">
              Meet the Founder
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight text-white">
              {branding.founderName}
            </h1>
            <p className="mt-5 text-base sm:text-lg uppercase tracking-[0.16em] text-white/65">
              Founder, {branding.businessName}
            </p>
            <div className="h-1 w-12 bg-primary mx-auto my-8 rounded-full" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold leading-tight tracking-tight text-white">
              Ideas into practical digital solutions.
            </h2>
            <p className="mt-7 text-base sm:text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl mx-auto">
              I work across technology, digital services, crypto, Web3 and creative projects. W3C Digital Network is where these interests come together through practical products, services and communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Background and vision */}
      {sections.map((section, index) => (
        <section key={section.eyebrow} className={`py-20 md:py-24 ${section.background} border-b border-white/[0.08]`}>
          <div className="site-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <span className="text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary block mb-5">
                {section.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-8">
                {section.title}
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* The work */}
      <section className="py-20 md:py-28 bg-zinc-950 border-b border-white/[0.08]">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary block mb-5">
              THE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Different disciplines. One direction.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-5 leading-relaxed">
              W3C brings together several areas of work, connected by a shared focus on useful digital experiences.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <GlassCard className="p-6 h-full border-white/10 bg-white/[0.015] hover:border-primary/20 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{area.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{area.body}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach and principles */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary block mb-5">
              THE APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Useful work. Clear communication. Trust.
            </h2>
            <p className="mt-7 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              I believe good digital work should serve a real purpose. That means understanding the problem before recommending a solution, communicating clearly, being transparent about what is possible and treating every interaction with respect.
            </p>
            <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              Whether it involves a digital project or a crypto transaction, trust should never be an afterthought.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <GlassCard className="p-7 h-full border-white/10 bg-white/[0.015] hover:border-primary/20 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-3">{principle.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{principle.body}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Looking ahead */}
      <section className="py-20 md:py-24 bg-zinc-950 border-b border-white/[0.08]">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary block mb-5">
              LOOKING AHEAD
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-8">
              Building with purpose.
            </h2>
            <div className="space-y-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              <p>
                W3C is an evolving network. The focus is on strengthening what already works, developing useful digital products, expanding services and building meaningful connections.
              </p>
              <p>
                The direction is growth, but not growth for its own sake. The priority is to build things that people can use, understand and trust.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] border border-white/[0.08] bg-white/[0.01] backdrop-blur-sm px-6 py-14 sm:px-16 sm:py-16"
          >
            <span className="text-xs uppercase tracking-[0.18em] font-mono font-semibold text-primary block mb-5">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Let's make something useful.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              If you have a project, need a digital solution, want to explore a partnership or simply have an idea worth discussing, I'm open to a conversation.
            </p>
            <p className="text-white font-semibold text-lg mb-10">
              {branding.founderName} · Founder, {branding.businessName}
            </p>

            <div className="flex justify-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-black font-bold text-base sm:text-lg border border-primary/40 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
