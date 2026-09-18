import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { ServiceCard } from "@/components/shared/service-card";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, ChevronRight, ChevronDown, Globe, Headset, Shield, Users, Wallet, Mail, MessageCircle, Terminal, Send, MessageSquare, Search, HelpCircle, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { homepageContent } from "@/content/homepage";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { projects } from "@/data/portfolio";
import { testimonials } from "@/content/testimonials";
import { getServiceBrandColor } from "@/config/theme";
import { useLiveMetrics } from "@/hooks/useLiveMetrics";
import { faqs } from "@/content/faq";

const getProjectImage = (id: string) => {
  switch (id) {
    case "w3c-digital-network":
      return "https://i.imgur.com/by3ldeW.jpeg";
    case "gold-marine-group":
      return "https://i.imgur.com/qO5yasK.jpeg";
    case "w3c-test-token-tracker":
      return "https://i.imgur.com/oFxxGhs.jpeg";
    case "ceecar":
      return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80";
    default:
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
  }
};

export default function Home() {
  const { totalTrades, totalVolumeFormatted, avgMonthlyVolumeFormatted } = useLiveMetrics();
  const { hero, features, trust, projectsTeaser, cta } = homepageContent;
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(0);

  const handleServicesScroll = () => {
    const el = servicesScrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveService(Math.max(0, Math.min(index, features.list.length - 1)));
  };
  const [, setLocation] = useLocation();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  // Transform scroll position to vertical translation for parallax effect
  const yParallax = useTransform(scrollY, [0, 800], [0, 240]);

  const scrollPastHero = () => {
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("about");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case "headphones": return <Headset className="w-6 h-6 text-white" />;
      case "wallet": return <Wallet className="w-6 h-6 text-white" />;
      case "terminal": return <Terminal className="w-6 h-6 text-white" />;
      default: return <Users className="w-6 h-6 text-white" />;
    }
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case "shield": return Shield;
      case "wallet": return Wallet;
      default: return Headset;
    }
  };

  // Featured projects on the homepage (Gold Marine Group and CEECAR Bot)
  const featuredProjects = [
    projects.find(p => p.id === "gold-marine-group"),
    projects.find(p => p.id === "ceecar")
  ].filter((p): p is typeof projects[0] => !!p);

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": branding.businessName,
    "image": "https://web3currency.online/opengraph.jpeg",
    "url": "https://web3currency.online",
    "description": branding.description,
    "founder": {
      "@type": "Person",
      "name": branding.founderName
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG"
    }
  };

  return (
    <PageTransition>
      <SEO 
        title={branding.businessName} 
        description={branding.description}
        path="/"
        schema={schemaOrg}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 md:pt-[120px] pb-20 md:pb-[100px] overflow-hidden min-h-[95vh] flex items-center bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated Parallax Background Video */}
          <motion.div 
            style={{ y: yParallax }} 
            className="absolute inset-x-0 -top-[15%] h-[135%] w-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/hero.png"
              className="w-full h-full object-cover opacity-40 scale-105 select-none pointer-events-none"
              aria-label="Abstract background video displaying trading charts and market activity data"
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Chart-EVd3zqX4CxBIDarHPrWzR6LlyOLh1P.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Dark Overlay Gradient to preserve readability with high typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-[1]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-[1]" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid-fade opacity-20 z-[2]" aria-hidden="true" />
        </div>
        
        <div className="container max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] tracking-tight">
                <span className="text-gradient-hero">Practical Digital Solutions, </span>
                <span className="text-primary italic">Built Around Your Needs.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 drop-shadow-sm mb-10 leading-relaxed max-w-2xl">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="glow-primary-hover inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-black font-bold text-lg active:scale-95 hover:bg-primary/95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {hero.primaryCta}
                </Link>
                <Link 
                  href="/services" 
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/15 text-white font-semibold text-lg transition-all hover:bg-white/5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {hero.secondaryCta}
                </Link>
              </div>

              {/* Scroll Past Hero Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-12 hidden md:block"
              >
                <button
                  onClick={scrollPastHero}
                  className="inline-flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-4 py-2"
                  aria-label="Scroll down to introduction section"
                >
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">Discover More</span>
                  <ChevronDown className="w-5 h-5 animate-bounce text-primary" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Jake Section */}
      <section className="py-20 md:py-24 bg-zinc-950 relative border-y border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1 hidden md:block"
            >
              <div className="absolute -inset-6 bg-primary/5 rounded-[3rem] blur-2xl opacity-70" aria-hidden="true" />
              <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#0A0A0A] shadow-2xl flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/cGKA8AC.png" 
                  alt="Jake" 
                  className="w-full h-auto object-contain block"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                Hi, I'm {branding.founderName.toUpperCase()}.
              </h2>
              <div className="space-y-5 text-[1.125rem] text-white/90 leading-[1.6]">
                <p>
                  I created {branding.businessName} as one place where I can bring together everything I do in the digital space. Over the years, I have helped people through crypto P2P trading, built a growing Web3 community, developed modern websites using AI-powered workflows, and provided practical digital guidance.
                </p>
                <p className="text-muted-foreground">
                  My goal is simple: to make digital opportunities easier to understand, easier to access, and easier to use. I believe in being approachable, explaining complex things clearly, and keeping myself genuinely available to help you make sense of the digital world.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center text-white font-medium hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  <span className="border-b border-white/30 group-hover:border-primary pb-1">Read my full story</span>
                  <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid (Four Pillars) */}
      <section className="py-20 md:py-24 bg-black relative">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-display font-bold text-white mb-4 tracking-tight">{features.title}</h2>
          </div>
          
          <div ref={servicesScrollRef} onScroll={handleServicesScroll} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 md:gap-6">
            {features.list.map((feature) => (
              <ServiceCard 
                key={feature.title}
                title={feature.title}
                tagline={feature.tagline}
                description={feature.description}
                icon={getFeatureIcon(feature.iconName)}
                href={feature.href}
                accentColorClass={feature.accentColorClass}
                ctaText={feature.ctaText}
                delay={feature.delay}
                iconStyle={feature.iconStyle}
              />
            ))}
          </div>
          <div className="flex sm:hidden items-center justify-center gap-2 mt-4" aria-label="Service card position">
            {features.list.map((feature, index) => (
              <span key={feature.title} className={"h-1.5 rounded-full transition-all duration-200 " + (index === activeService ? "w-5 bg-white" : "w-1.5 bg-white/30")} aria-hidden="true" />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-display font-bold text-white mb-4">Why People Trust W3C</h2>

          </div>

          {/* Trust Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Trading Record */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col justify-between p-6 border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white text-xl">Trading Record</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/[0.06] overflow-hidden">
                    <div className="min-w-0 px-2 py-4 sm:px-4 text-center">
                      <p className="text-xl sm:text-3xl font-display font-black text-white">{totalTrades}</p>
                      <p className="mt-1 text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wide sm:tracking-wider font-mono leading-tight">Completed Trades</p>
                    </div>
                    <div className="min-w-0 px-2 py-4 sm:px-4 text-center">
                      <p className="text-xl sm:text-3xl font-display font-black text-primary">{totalVolumeFormatted}</p>
                      <p className="mt-1 text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wide sm:tracking-wider font-mono leading-tight">Total Trading Volume</p>
                    </div>
                    <div className="min-w-0 px-2 py-4 sm:px-4 text-center">
                      <p className="text-xl sm:text-3xl font-display font-black text-white">{avgMonthlyVolumeFormatted}</p>
                      <p className="mt-1 text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wide sm:tracking-wider font-mono leading-tight">Average Monthly Volume</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/ledger"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-black font-bold text-sm hover:bg-primary/90 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    View W3C DESK Ledger
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>

            {/* Card 2: Registered Business */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col justify-between p-6 border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white text-xl">Registered Business</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-3xl font-display font-black text-primary">CAC Registered</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">RC 957908</p>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Operating under a registered business with transparent trading records and direct founder accountability.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-tight">{projectsTeaser.title}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">{projectsTeaser.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {featuredProjects.map((project, i) => (
              <MotionGlassCard 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-4 group rounded-2xl border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 bg-white/[0.01]"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative bg-zinc-950 border border-white/10 flex flex-col justify-between">
                  {/* Browser Header */}
                  <div className="bg-zinc-900/80 px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/60 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60 inline-block" />
                    </div>
                    <div className="bg-black/40 border border-white/[0.04] rounded px-3 py-0.5 text-[9px] text-white/40 font-mono flex items-center gap-1">
                      <span className="text-primary">●</span>
                      <span>
                        {project.id === "w3c-digital-network" && "web3currency.online"}
                        {project.id === "gold-marine-group" && "goldmarinegroup.com"}
                        {project.id === "w3c-test-token-tracker" && "tw3c-tracker.vercel.app"}
                        {project.id === "ceecar" && "t.me/ceecarbot"}
                      </span>
                    </div>
                    <div className="w-6 shrink-0" />
                  </div>

                  {/* Mockup Preview Area */}
                  <div className="relative flex-1 w-full h-full overflow-hidden">
                    <img 
                      src={getProjectImage(project.id)} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Interactive overlay text */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono font-bold text-white tracking-wider bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 uppercase">
                        {project.id === "w3c-digital-network" && "W3C Digital"}
                        {project.id === "gold-marine-group" && "Gold Marine"}
                        {project.id === "w3c-test-token-tracker" && "Token Tracker"}
                        {project.id === "ceecar" && "Ceecar"}
                      </span>
                      <span className="text-[8px] font-mono text-white/60 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded uppercase">
                        Preview
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-2xl font-display font-bold text-white mb-3 transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>
              </MotionGlassCard>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-12 gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/20 hover:text-primary text-white text-sm font-semibold transition-all duration-300">
              {projectsTeaser.ctaText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24 bg-black relative overflow-hidden border-t border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">What People Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Real feedback from people I've worked with across W3C DESK, website projects, and digital consulting.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => {
              const getServiceBadge = (service: string) => {
                const brand = getServiceBrandColor(service);
                return (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${brand.twBg} ${brand.twBorder} text-[10px] font-mono font-medium ${brand.twText}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${brand.twDot}`} />
                    {service}
                  </span>
                );
              };

              return (
                <MotionGlassCard
                  key={testi.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 border-white/10 bg-white/[0.015] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-0.5 mb-4 text-amber-400">
                      {Array.from({ length: testi.rating }).map((_, i) => (
                        <span key={i} className="text-sm font-bold">★</span>
                      ))}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                      "{testi.statement}"
                    </p>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white leading-none mb-1">{testi.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {testi.role}{testi.company ? `, ${testi.company}` : ""}
                      </p>
                    </div>
                    {getServiceBadge(testi.serviceUsed)}
                  </div>
                </MotionGlassCard>
              );
            })}
          </div>
        </div>
      </section>



      {/* Searchable Help Hub & FAQ Section */}
      <section id="homepage-faq-section" className="py-20 md:py-24 bg-black border-t border-white/[0.08] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              How can I help you today?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Search or browse the most common questions. If you don't find what you're looking for, send me a message.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Search & filters */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="help-search-input"
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setExpandedFaq(null);
                  }}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 pl-12 pr-10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm font-sans"
                />
                {searchQuery && (
                  <button
                    id="help-search-clear-btn"
                    onClick={() => {
                      setSearchQuery("");
                      setExpandedFaq(null);
                    }}
                    className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 font-bold">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "about", label: "About" },
                    { id: "web-dev", label: "Web Dev" },
                    { id: "consulting", label: "Advisory" },
                    { id: "p2p", label: "W3C DESK" },
                    { id: "community", label: "Community" },
                    { id: "communication", label: "Channels" },
                    { id: "projects", label: "Projects" }
                  ].map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        id={`help-cat-btn-${cat.id}`}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setExpandedFaq(null);
                        }}
                        className={`text-xs font-mono px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
                          isSelected
                            ? "bg-primary text-black font-bold border-primary"
                            : "bg-white/[0.02] text-white/60 hover:text-white border-white/10 hover:bg-white/[0.05]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>


            </div>

            {/* Right side: Accordion of matched FAQs */}
            <div className="lg:col-span-7 space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = expandedFaq === faq.q;
                    return (
                      <motion.div
                        key={faq.q}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button
                          id={`faq-toggle-btn-${index}`}
                          onClick={() => setExpandedFaq(isOpen ? null : faq.q)}
                          className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/20 transition-all flex items-start justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-primary/30"
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold px-2 py-0.5 bg-primary/10 border border-primary/20 rounded">
                              {faq.category === "web-dev" 
                                ? "Web Dev" 
                                : faq.category === "p2p" 
                                ? "Crypto P2P" 
                                : faq.category === "consulting" 
                                ? "Advisory" 
                                : faq.category === "about" 
                                ? "About"
                                : faq.category === "community"
                                ? "Community"
                                : faq.category === "communication"
                                ? "Channels"
                                : faq.category === "projects"
                                ? "Projects"
                                : faq.category || "General"}
                            </span>
                            <h4 className="font-display font-bold text-white text-sm sm:text-base md:text-md pt-2">
                              {faq.q}
                            </h4>
                          </div>
                          <div className="mt-1 shrink-0">
                            <ChevronDown
                              className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                                isOpen ? "rotate-180 text-primary" : ""
                              }`}
                            />
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-answer-container-${index}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 border-x border-b border-white/5 bg-white/[0.005] rounded-b-xl text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4">
                                <p className="whitespace-pre-line">{faq.a}</p>
                                
                                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.04]">
                                  {/* Left/Contextual CTA Trigger Button */}
                                  {faq.action ? (
                                    faq.action.isExternal ? (
                                      <a
                                        id={`faq-action-${index}`}
                                        href={faq.action.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-mono font-bold text-xs hover:bg-opacity-90 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] transition-all duration-300"
                                      >
                                        {faq.action.label}
                                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                                      </a>
                                    ) : (
                                      <Link
                                        id={`faq-action-${index}`}
                                        href={faq.action.url}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-black font-mono font-bold text-xs hover:bg-opacity-90 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] transition-all duration-300"
                                      >
                                        {faq.action.label}
                                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                                      </Link>
                                    )
                                  ) : (
                                    <div />
                                  )}

                                  {/* Right WhatsApp Support */}
                                  <a
                                    id={`faq-whatsapp-link-${index}`}
                                    href={contact.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                                  >
                                    Ask about this on WhatsApp
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
                  >
                    <HelpCircle className="w-10 h-10 text-white/20 mx-auto mb-3" />
                    <h4 className="font-display font-bold text-white text-base">No matches found</h4>
                    <p className="text-xs text-muted-foreground mt-1">Try searching for keywords like "developer", "P2P", or "security".</p>
                    <button
                      id="faq-reset-btn"
                      onClick={() => { setSearchQuery(""); setSelectedCategory("about"); }}
                      className="mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-xl text-xs font-bold transition-all"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        </div>
        
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="relative rounded-[2.5rem] border border-white/[0.08] bg-white/[0.015] backdrop-blur-md px-8 py-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Premium Pitch & Founder Info */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Direct Founder Consultation Active</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">
                  {cta.title}
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {cta.description}
                </p>
                
                <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full border border-primary/20 overflow-hidden bg-primary/5">
                      <img 
                        src="https://i.imgur.com/9q4rYyq.png" 
                        alt={branding.founderName} 
                        className="w-full h-full object-cover scale-110" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-base leading-tight">{branding.founderName}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">Founder, {branding.businessName}</div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Direct High-Fidelity Quick Contact Tiles */}
              <div className="lg:col-span-5 space-y-4">
                <a 
                  href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(`Hi ${branding.founderName}, I'm reaching out from your website. Let's start a conversation.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.06] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <SiWhatsapp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      Message on WhatsApp
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Instant chat, direct consultation</div>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/[0.05] transition-all" />
                </a>

                <a 
                  href={contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border border-sky-500/10 bg-sky-500/[0.02] hover:bg-sky-500/[0.06] hover:border-sky-500/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Send className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      Connect on Telegram
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Secure messaging, private inquiries</div>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/[0.02] rounded-full blur-xl pointer-events-none group-hover:bg-sky-500/[0.05] transition-all" />
                </a>

                <a 
                  href={`mailto:${contact.email}`}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border border-primary/10 bg-primary/[0.02] hover:bg-primary/[0.06] hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      Send an Email
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">Detailed queries, project briefs</div>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] rounded-full blur-xl pointer-events-none group-hover:bg-primary/[0.05] transition-all" />
                </a>

                <div className="pt-2 text-center lg:text-left">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-xs font-mono font-medium text-white/50 hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    <span className="border-b border-white/20 group-hover:border-primary pb-0.5">View all contact channels</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-white/30 group-hover:text-primary transition-all group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
