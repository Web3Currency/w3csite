import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Users,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Globe,
  Compass,
  PenTool,
  Wallet,
  Bot,
  LayoutTemplate,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `The Story Behind ${branding.businessName}`,
    "description": `The story, journey, values, and work behind ${branding.businessName} and its founder, ${branding.founderName}.`,
    "mainEntity": {
      "@type": "Person",
      "name": branding.founderName,
      "description": branding.shortBio,
    },
  };

  const currentAreas = [
    {
      title: "Crypto P2P",
      body: "Helping people buy and sell cryptocurrency through W3C DESK.",
      icon: Wallet,
    },
    {
      title: "Websites & Landing Pages",
      body: "Designing and building websites and landing pages for people, businesses and projects.",
      icon: LayoutTemplate,
    },
    {
      title: "Digital Solutions & Consulting",
      body: "Helping people understand digital tools and find practical ways to solve digital problems.",
      icon: Compass,
    },
    {
      title: "Crypto, Web3 & AI Community",
      body: "Creating a space where people can learn, ask questions, share opportunities and understand what is happening in the digital world.",
      icon: Users,
    },
    {
      title: "Digital Products",
      body: "Building and experimenting with useful digital tools and applications.",
      icon: Bot,
    },
  ];

  const principles = [
    {
      title: "People Before Sales",
      body: "I would rather recommend what you actually need than sell you something you don't.",
      icon: Users,
    },
    {
      title: "Keep Things Simple",
      body: "Technology is already complicated enough. I believe people should be able to understand what they are using and why they are using it.",
      icon: MessageCircle,
    },
    {
      title: "Create Something Useful",
      body: "I don't want to build things simply because they are trending. I want what I build to have a purpose.",
      icon: CheckCircle2,
    },
    {
      title: "Keep Learning",
      body: "Technology changes quickly. So I keep learning, experimenting and trying new tools. There is always something new to discover.",
      icon: Sparkles,
    },
  ];

  return (
    <PageTransition>
      <SEO
        title={`The Story Behind ${branding.businessName}`}
        description={`Read the story, journey, values, and work behind ${branding.businessName}.`}
        path="/about"
        schema={aboutSchema}
      />

      {/* SECTION 1: Hero */}
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
            <span className="text-xs uppercase tracking-widest font-mono font-semibold text-primary block">
              The Story Behind W3C Digital Network
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
              You already know what I do.
              <br />
              <span className="text-primary italic">This page is about why I do it.</span>
            </h1>
            <div className="h-1 w-12 bg-primary mx-auto my-8 rounded-full" />
            <div className="space-y-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              <p>
                W3C Digital Network didn't start with a business plan, an office, or a big team.
              </p>
              <p className="text-white font-semibold text-lg sm:text-xl">
                It started with curiosity.
              </p>
              <p>
                And, honestly, it started with me being interested in many different things.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Before W3C */}
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
              Before W3C
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>I've always been someone who likes to learn, create and try things.</p>
              <p>
                From childhood, I was interested in art. I drew anime and cartoons. I painted houses. I experimented with lettering and different forms of artwork.
              </p>
              <p>
                Later, I spent a lot of time doing pencil drawings and eventually got to the point where people were willing to pay for my work. I focused on realism and spent years improving my ability to look at something and recreate it.
              </p>
              <p>
                Then I moved into digital art and photo editing.
              </p>
              <p>
                Eventually, I discovered AI and started experimenting with creating images and bringing ideas I had in my head to life.
              </p>
              <p className="border-l-2 border-primary pl-4 py-1 italic text-primary font-medium">
                Looking back, I didn't realize it at the time, but all of this was teaching me something important:
              </p>
              <p className="text-white font-semibold text-lg sm:text-xl">
                How to see an idea in my head and find a way to create it.
              </p>
              <p className="text-muted-foreground">
                That ability still influences the things I build today.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Then Came the Digital World */}
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
              Then Came the Digital World
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>My curiosity eventually moved deeper into technology.</p>
              <p>
                I started exploring cryptocurrency, blockchain, Web3, artificial intelligence, websites and other digital tools.
              </p>
              <p className="text-muted-foreground">
                I wasn't learning these things because I had already decided to build a company.
              </p>
              <p>I simply wanted to understand them.</p>
              <p>And I like applying what I learn.</p>
              <p className="text-primary font-semibold text-lg sm:text-xl border-l-2 border-primary pl-4 py-1">
                If I learn something useful, I want to try it. If I see a problem, I want to see if I can solve it.
              </p>
              <p className="text-muted-foreground">
                That is how many of the things I do today started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: From Learning to Helping */}
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
              From Learning to Helping
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>As I learned more about crypto and Web3, people started asking me questions.</p>
              <div className="grid sm:grid-cols-2 gap-3 py-2">
                {["How does this work?", "How do I buy this?", "How do I sell this?", "Is this safe?", "What does this project do?"].map((question) => (
                  <div key={question} className="p-4 rounded-xl border border-white/5 bg-black/40 text-white/90 text-sm sm:text-base">
                    {question}
                  </div>
                ))}
              </div>
              <p>
                Sometimes people simply needed someone to explain something without making it more complicated than it already was.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl">
                So I started helping.
              </p>
              <p className="text-muted-foreground">
                Over time, that turned into community building, education, crypto P2P trading and other digital services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: W3C DESK */}
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
              W3C DESK
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>Crypto eventually became a major part of what I do.</p>
              <p>
                W3C DESK grew from the need for a practical way to help people buy and sell cryptocurrency through P2P transactions.
              </p>
              <p className="text-muted-foreground">
                It wasn't just about completing trades.
              </p>
              <p className="text-white font-semibold text-lg sm:text-xl">
                It taught me the importance of communication, speed, transparency and trust.
              </p>
              <p>
                Every trade involves another person trusting me to handle something valuable.
              </p>
              <p className="border-l-2 border-primary pl-4 py-1 italic text-primary font-medium">
                That responsibility matters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: Websites, AI & Building Things */}
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
              Websites, AI & Building Things
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>My interest in websites came from another direction.</p>
              <p>
                I've always been visual. When I look at a website, I don't only think about the technology behind it. I think about how it looks, how it feels, what people will see first, and whether the whole thing makes sense.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl border-l-2 border-primary pl-4 py-1">
                I can usually visualize what I want before I know exactly how to build it.
              </p>
              <p>AI has changed how I work.</p>
              <p>
                I'm not a traditional developer who learned everything through the conventional software-development path. I use AI heavily as a development partner.
              </p>
              <p>
                I bring the idea, the visual direction and the decisions.
              </p>
              <p className="text-muted-foreground">
                AI helps me turn those ideas into working software.
              </p>
              <p>
                That is how I've been able to build websites, landing pages and applications while continuing to learn along the way.
              </p>
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 space-y-3">
                <h3 className="font-display font-bold text-white text-xl">W3C Pi Bookings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  W3C Pi Bookings is one example. It started as an idea and gradually became something people can actually test and use.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Why W3C Exists */}
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
              Why W3C Exists
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>At some point, I realized that all these different things I was doing were connected.</p>
              <p className="text-white font-semibold text-lg sm:text-xl">
                Crypto. Web3. AI. Websites. Digital art. Digital solutions. Community. Education.
              </p>
              <p>They are all part of the digital world I've been exploring for years.</p>
              <p className="text-primary font-semibold text-lg sm:text-xl">
                That's where W3C Digital Network comes in.
              </p>
              <p>
                W3C stands for Web3 Currency.
              </p>
              <p className="text-muted-foreground">
                The name came from my connection with Web3 and cryptocurrency, which have been a major part of my journey and the work I've done over the years.
              </p>
              <p>
                The "Digital Network" represents the broader direction W3C has grown into.
              </p>
              <p className="text-muted-foreground">
                Today, W3C brings together the different digital services, products, communities and experiments that I build and work on.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: How I Think About My Work */}
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
              How I Think About My Work
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>I've never been someone who enjoys doing only one thing for a very long time.</p>
              <p>I get curious.</p>
              <p>I learn something.</p>
              <p>I apply it.</p>
              <p>I build with it.</p>
              <p>Then I start wondering what else I can do.</p>
              <p className="text-primary font-semibold text-lg sm:text-xl border-l-2 border-primary pl-4 py-1">
                Sometimes that means moving into something completely new. Other times, it means expanding into something connected to what I'm already doing.
              </p>
              <p>
                I've learned that I don't necessarily need to fight that part of myself.
              </p>
              <p className="text-muted-foreground">
                I just need to make sure the things I'm learning and building are useful.
              </p>
              <p className="text-white font-semibold">That's how I continue to grow.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: What W3C Is Today */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              What W3C Is Today
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              W3C Digital Network currently brings together several areas of work:
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
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
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

          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-white font-semibold text-lg sm:text-xl">
              These areas may look different, but they come from the same place:
            </p>
            <p className="mt-3 text-primary font-semibold text-lg sm:text-xl">
              Curiosity, creativity, technology and a desire to create something useful.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: How I Work */}
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
              How I Work
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p className="text-primary font-semibold text-lg sm:text-xl">
                I prefer to keep things simple.
              </p>
              <p>
                When you come to W3C, you are not being passed from one department to another.
              </p>
              <p>You can talk directly with me.</p>
              <p>We start with a conversation.</p>
              <p>
                I try to understand what you actually need before deciding what solution makes sense.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 py-2">
                {[
                  "Sometimes that solution is a website.",
                  "Sometimes it's a digital product.",
                  "Sometimes it's a crypto transaction.",
                  "Sometimes it's advice.",
                ].map((item) => (
                  <div key={item} className="p-5 rounded-xl border border-white/5 bg-black/40">
                    <p className="text-white font-medium text-sm sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                And sometimes, the best thing I can tell you is that you don't need to spend money on something.
              </p>
              <p className="border-l-2 border-primary pl-4 py-1 text-primary font-semibold text-lg sm:text-xl">
                The goal is not to sell you everything I can do. The goal is to find what actually makes sense for you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 11: What I Believe */}
      <section className="py-20 md:py-28 bg-black border-b border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              What I Believe
            </h2>
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
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
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

      {/* SECTION 12: W3C Is Still Growing */}
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
              W3C Is Still Growing
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>W3C is not a finished story.</p>
              <p>I'm still learning.</p>
              <p>I'm still experimenting.</p>
              <p>I'm still building.</p>
              <p className="text-muted-foreground">
                Some ideas will work. Some won't.
              </p>
              <p className="text-muted-foreground">
                Some things will stay. Others will change.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl border-l-2 border-primary pl-4 py-1">
                That's part of the journey.
              </p>
              <p>
                The goal isn't to become the biggest company.
              </p>
              <p className="text-white font-semibold text-lg sm:text-xl">
                It's to keep building something useful, trustworthy and genuinely valuable to the people who interact with it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 13: A Note From Jake */}
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
              A Note From Jake
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-white/95 leading-relaxed pt-4">
              <p>
                If you've been around W3C for a while, you've probably noticed that I do many different things.
              </p>
              <p>
                You might see me talking about crypto today, building an application tomorrow, discussing AI another day, and then working on a website or helping someone with a digital problem.
              </p>
              <p className="text-primary font-semibold text-lg sm:text-xl">
                That's not a new phase I'm going through. That's simply how I've always been.
              </p>
              <p>
                I've never been interested in putting myself into one box.
              </p>
              <p>
                I'm curious about many things, and I enjoy learning how things work and finding ways to create with them.
              </p>
              <p className="text-muted-foreground">
                W3C is simply the place where many of those interests have come together.
              </p>
              <p>And I'm still figuring out where it all leads.</p>
              <p>But I'm enjoying the process.</p>
              <p className="text-white font-display font-bold text-xl sm:text-2xl">
                This is W3C Digital Network.
              </p>
              <p className="text-primary font-display font-bold text-xl sm:text-2xl">
                And I'm Jake.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL SECTION: Start a Conversation */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
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
                Whether you need a website, want to complete a crypto transaction, have questions about Web3, or simply need help thinking through a digital problem, you can start by talking to me.
              </p>
              <p>
                There is no need to know exactly what service you need before reaching out. We can start with the problem and work from there.
              </p>
              <p className="text-white font-medium">
                Talk directly with Jake and let's see what makes sense for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-black font-bold text-base sm:text-lg border border-primary/40 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <SiWhatsapp className="w-5 h-5" />
                Message on WhatsApp
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.03] text-white font-semibold text-base sm:text-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                View Contact Options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
