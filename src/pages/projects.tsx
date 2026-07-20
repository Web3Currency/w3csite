import { useState, useEffect } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { MotionGlassCard, GlassCard } from "@/components/shared/glass-card";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Laptop, 
  ShieldCheck, 
  Cpu, 
  Code, 
  Terminal, 
  Sparkles, 
  Glasses, 
  Workflow, 
  FolderGit2,
  FileCode,
  LineChart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

const getProjectImage = (id: string) => {
  switch (id) {
    case "w3c-digital-network":
      return "https://i.imgur.com/by3IdeW.jpeg";
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

export default function Projects() {
  const techStacks = [
    {
      title: "AI-Assisted Development",
      icon: Cpu,
      tags: ["Google AI Studio", "Replit", "Claude Code", "ChatGPT", "Gemini", "V0"],
      description: "AI-powered tools that accelerate planning, prototyping, coding, debugging, and delivery while keeping human decision-making at the center."
    },
    {
      title: "Modern Web",
      icon: Code,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      description: "Modern technologies used to build responsive, scalable, and production-ready websites and digital experiences."
    },
    {
      title: "Development & Deployment",
      icon: FolderGit2,
      tags: ["Git", "GitHub", "Vercel", "Supabase", "REST APIs"],
      description: "Tools used for version control, deployment, backend integration, database management, and reliable project delivery."
    },
    {
      title: "Design & Experience",
      icon: Layers,
      tags: ["Responsive Design", "Landing Page Design", "Business Website Design", "Design Systems", "AI-Assisted Design"],
      description: "A practical design workflow focused on clarity, usability, consistency, and helping businesses communicate effectively online."
    },
    {
      title: "Web3 Experience",
      icon: ShieldCheck,
      tags: ["Crypto P2P Operations", "Testnet Participation", "Community Building", "Digital Asset Research", "Blockchain Ecosystem Support"],
      description: "Hands-on experience gained through operating W3C Digital Network, supporting users, researching blockchain ecosystems, and participating in Web3 communities."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Solutions" },
    { id: "web", label: "Websites & Branding" },
    { id: "web3", label: "Web3 & Blockchain" },
    { id: "automation", label: "Automation & Bots" }
  ];

  const filteredProjects = projects.filter((project) => {
    if (selectedProjectCategory === "all") return true;
    if (selectedProjectCategory === "web") {
      return project.category === "Personal Brand Website" || project.category === "Corporate Website";
    }
    if (selectedProjectCategory === "web3") {
      return project.category === "Internal Web3 Tool";
    }
    if (selectedProjectCategory === "automation") {
      return project.category === "Telegram Trading Assistant";
    }
    return true;
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % techStacks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + techStacks.length) % techStacks.length);
  };

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Portfolio of ${branding.businessName}`,
    "description": "Real Work. Real Progress. Every project represents a problem solved, a skill improved, or an idea brought to life.",
    "url": "https://web3currency.online/projects",
    "about": {
      "@type": "Person",
      "name": branding.founderName
    }
  };

  return (
    <PageTransition>
      <SEO 
        title={`Projects | ${branding.businessName}`}
        description="Real Work. Real Progress. Every project represents a problem solved, a skill improved, or an idea brought to life."
        path="/projects"
        schema={portfolioSchema}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black border-b border-white/[0.06] pt-32 pb-20 md:pt-40 md:pb-24 animate-fade-in">
        
        {/* Animated Background Image covering the entire section */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1.02, 1.06, 1.02],
              x: [-2, 2, -2],
              y: [-1, 1, -1]
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-full h-full"
          >
            <img
              src="https://i.imgur.com/dRrJnw5.png"
              alt="Projects Hero Background"
              className="w-full h-full object-cover object-center select-none"
            />
          </motion.div>
          
          {/* Custom Bottom-to-Middle Gradient: fading smoothly from the bottom to the middle */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center sm:text-left">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-black/50 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl border border-white/[0.06] shadow-2xl space-y-6"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-white">
                Real Work. Real Progress.
              </h1>
              
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium">
                  Every project represents a problem solved, a skill improved, or an idea brought to life.
                </p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Some projects were built for my own business, while others were created to explore modern web development, AI-assisted workflows, and practical digital solutions. As {branding.businessName} continues to grow, this portfolio will grow with it.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center sm:justify-start">
                <Link 
                  href="/contact"
                  className="glow-primary-hover inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-black font-bold text-sm hover:bg-primary/95 transition-all w-full sm:w-auto shadow-md"
                >
                  Start the Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/services" 
                  className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-white font-bold text-sm hover:bg-white/[0.05] transition-all w-full sm:w-auto block text-center"
                >
                  View Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section & Case Study Vision */}
      <section className="py-20 bg-zinc-950 border-y border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            
            {/* Left Box: Building Solutions That Matter */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Building Solutions That Matter
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                I believe the best way to demonstrate capability is through real work. Instead of making promises, I prefer to build, improve, experiment, and continuously refine digital solutions that solve practical problems.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Some projects are commercial.",
                  "Some are internal tools.",
                  "Some support the W3C community.",
                  "Every project contributes to my experience as a builder."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: The Evolution to Case Studies */}
            <div className="md:col-span-5">
              <GlassCard className="p-6 border border-white/5 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary font-bold mb-3">Our Core Standard</h3>
                <h4 className="text-white font-display font-bold text-lg mb-2">Evolving into Case Studies</h4>
                <p className="text-xs text-muted-foreground leading-relaxed space-y-2">
                  <span>
                    A project shows what was built. A <strong>Case Study</strong> explains the client's problem, my direct approach, the engineered solution, and the actual real-world outcome.
                  </span>
                  <span className="block mt-2">
                    As client engagements and custom builds are finalized, each placeholder card below will transform into a comprehensive case study. This ensures complete transparency and shows exactly how W3C creates measurable value.
                  </span>
                </p>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 md:py-24 bg-black">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Featured Projects
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Explore custom systems, websites, and community utilities in active development.
              </p>
            </div>

            {/* Premium Category Filter Pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 bg-white/[0.02] border border-white/[0.06] p-1.5 rounded-full backdrop-blur-md">
              {filterOptions.map((opt) => {
                const isActive = selectedProjectCategory === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedProjectCategory(opt.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300 focus:outline-none ${
                      isActive 
                        ? "text-black font-bold" 
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectCategory"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div 
            layout 
            className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="h-full flex flex-col justify-between overflow-hidden p-0 border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all duration-300 group">
                    
                    {/* Premium Abstract Browser Mockup Placeholder */}
                    <div className="h-48 relative bg-zinc-950 flex flex-col justify-between overflow-hidden border-b border-white/[0.05]">
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
                            {project.id === "ceecar" && "ceecar.tg.bot"}
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
                            Live Preview
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                            {project.category}
                          </span>
                          <span className={`text-[10px] font-mono uppercase border px-2.5 py-0.5 rounded-full font-bold shrink-0 ${project.statusColorClass}`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <h3 className="font-display font-bold text-white text-xl group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {project.shortDescription}
                        </p>

                        <div className="pt-3 border-t border-white/[0.04] space-y-2">
                          <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Core Features</h4>
                          <ul className="space-y-1.5">
                            {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2 text-xs text-white/80">
                                <span className="text-primary font-bold shrink-0">✓</span>
                                <span className="leading-relaxed">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-white/[0.04]">
                          <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold mb-1.5">Technologies</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-[9px] font-mono text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/[0.04]">
                        <a
                          href={project.externalLink || "/"}
                          target={project.externalLink ? "_blank" : undefined}
                          rel={project.externalLink ? "noopener noreferrer" : undefined}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 text-primary text-xs font-bold uppercase tracking-wider transition-all duration-200"
                        >
                          Visit Project
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>



      {/* Technology Stack Carousel Section */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden border-t border-white/[0.04]">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight animate-fade-in">
              Technology Stack
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              The technologies, platforms, and AI-powered workflow behind every project I build.
            </p>
          </div>

          {/* Carousel container */}
          <div className="relative max-w-3xl mx-auto" id="tech-stack-carousel">
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8 justify-between">
              
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-primary/40 text-white hover:text-primary flex items-center justify-center transition-all duration-300 shrink-0 shadow-lg group focus:outline-none focus:ring-1 focus:ring-primary/40"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Central Card Stage */}
              <div 
                className="flex-1 min-w-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                    className="cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    <GlassCard className="p-6 sm:p-10 border-white/10 bg-white/[0.015] hover:border-primary/20 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden min-h-[380px] sm:min-h-[340px] flex flex-col justify-between rounded-2xl group">
                      
                      {/* Purple accent lighting background glow */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />
                      
                      <div className="space-y-6">
                        {/* Header: Icon & Title */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                            {(() => {
                              const IconComponent = techStacks[currentIndex].icon;
                              return <IconComponent className="w-6 h-6" />;
                            })()}
                          </div>
                          <h3 className="font-display font-bold text-white text-lg sm:text-2xl tracking-tight leading-tight">
                            {techStacks[currentIndex].title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                          {techStacks[currentIndex].description}
                        </p>
                      </div>

                      {/* Technology Tags/Pills */}
                      <div className="mt-8 pt-6 border-t border-white/[0.06]">
                        <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold mb-3">
                          Featured Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {techStacks[currentIndex].tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-[10px] sm:text-xs font-mono text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </GlassCard>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-primary/40 text-white hover:text-primary flex items-center justify-center transition-all duration-300 shrink-0 shadow-lg group focus:outline-none focus:ring-1 focus:ring-primary/40"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

            {/* Pagination dots below */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {techStacks.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative h-2.5 focus:outline-none focus:ring-1 focus:ring-primary/40 rounded-full transition-all duration-300"
                  style={{ width: currentIndex === idx ? "24px" : "10px" }}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      currentIndex === idx 
                        ? "bg-primary" 
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    layoutId="activeDot"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Looking Ahead Section */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            More Projects Are On The Way
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              This portfolio is only the beginning.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              As I continue working with businesses, founders, and the W3C community, new projects and case studies will be published here. Every completed project represents another opportunity to learn, improve, and create something valuable.
            </p>
          </div>
        </div>
      </section>

      {/* Final Refined CTA */}
      <section className="py-20 md:py-28 bg-black border-t border-white/[0.08]">
        <div className="container max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight">
              Let's Build Something Useful Together
            </h2>
            <div className="space-y-2 max-w-xl mx-auto">
              <p className="text-white/80 text-sm sm:text-base">
                Whether you need a modern website, digital guidance, or simply want to discuss an idea, I'm always open to a conversation.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                Every project starts with understanding your goals.
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Link
              href="/contact"
              className="glow-primary-hover inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-black font-bold text-sm hover:bg-primary/95 transition-all justify-center shadow-lg"
            >
              Start the Conversation
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
