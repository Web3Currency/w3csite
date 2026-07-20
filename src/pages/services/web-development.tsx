import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Code,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  FileText,
  PenTool,
  Rocket,
  Sparkles,
  Gauge,
  Terminal,
  Users,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackWebsiteProjectEnquiry, trackContactClick } from "@/lib/analytics";

function SectionLabel({ text }: { text: string }) {
  const brand = getServiceBrandColor("Website Design & Development");
  return (
    <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText} block mb-2`}>
      {text}
    </span>
  );
}

interface WebsiteType {
  title: string;
  for: string;
  solves: string;
  why: string;
  icon: React.ComponentType<any>;
  accentClass: string;
  glowClass: string;
  selectedBorderClass: string;
  selectedBgClass: string;
}

const websiteTypes: WebsiteType[] = [
  {
    title: "Business Websites",
    for: "Local businesses, service providers, and growing brands.",
    solves: "Builds instant trust and gives your clients a central, professional place to find your services, contact info, and business hours.",
    why: "It replaces social media pages with a professional domain that you fully own, making your brand look credible and established.",
    icon: Code,
    accentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    glowClass: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    selectedBorderClass: "border-purple-500/50",
    selectedBgClass: "bg-purple-500/[0.04]"
  },
  {
    title: "Landing Pages",
    for: "Products, marketing campaigns, or validating a new idea.",
    solves: "Directs all visitor attention to a single, high-impact goal without distracting links or side paths.",
    why: "It loads incredibly fast and is written with clear, distraction-free messaging structured to turn visitors into WhatsApp messages or calls.",
    icon: Rocket,
    accentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    selectedBorderClass: "border-emerald-500/50",
    selectedBgClass: "bg-emerald-500/[0.04]"
  },
  {
    title: "Hotel & Guest Websites",
    for: "Hotels, short-lets, guest houses, and apartments.",
    solves: "Stops relying entirely on third-party booking platforms with high commission fees, putting booking and details back in your hands.",
    why: "Showcases rooms and amenities in high resolution, answers common guest questions, and provides a direct 'book now' link via WhatsApp.",
    icon: Sparkles,
    accentClass: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    glowClass: "shadow-[0_0_15px_rgba(234,179,8,0.15)]",
    selectedBorderClass: "border-yellow-500/50",
    selectedBgClass: "bg-yellow-500/[0.04]"
  },
  {
    title: "School & Academy Websites",
    for: "Primary schools, secondary schools, academies, and learning centers.",
    solves: "Streamlines communication with parents and students, reducing phone calls about school terms, calendars, and admissions.",
    why: "Provides a clean directory for term schedules, admission processes, and parent notices, establishing your school as a modern institution.",
    icon: FileText,
    accentClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    selectedBorderClass: "border-blue-500/50",
    selectedBgClass: "bg-blue-500/[0.04]"
  },
  {
    title: "Church & Ministry Websites",
    for: "Churches, ministries, and community organizations.",
    solves: "Keeps members engaged, shares weekly programs, and welcomes newcomers who want to find times, location, and beliefs beforehand.",
    why: "Acts as a digital extension of your physical space—holding sermon recordings, event announcements, and direct links for donations and support.",
    icon: Users,
    accentClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    glowClass: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    selectedBorderClass: "border-rose-500/50",
    selectedBgClass: "bg-rose-500/[0.04]"
  },
  {
    title: "Event & Conference Websites",
    for: "Conferences, festivals, exhibitions, and corporate events.",
    solves: "Handles registration, displays speakers, highlights schedules, and builds excitement in one clean, lightweight place.",
    why: "Gives attendees and sponsors a high-signal resource they can pull up instantly on their phones while walking the event floor.",
    icon: Gauge,
    accentClass: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    glowClass: "shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    selectedBorderClass: "border-indigo-500/50",
    selectedBgClass: "bg-indigo-500/[0.04]"
  },
  {
    title: "Portfolio Websites",
    for: "Consultants, creators, professionals, and freelancers.",
    solves: "Solves the 'can I see your work?' question instantly with a highly curated, beautiful grid of your absolute best projects.",
    why: "It is designed to highlight your personal role, outcomes, and contact links, standing out far better than a standard PDF resume.",
    icon: PenTool,
    accentClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    glowClass: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    selectedBorderClass: "border-cyan-500/50",
    selectedBgClass: "bg-cyan-500/[0.04]"
  },
  {
    title: "Custom Websites",
    for: "Founders with unique business ideas or specific requirements.",
    solves: "For ideas that don't fit into a standard box—whether it's an interactive pricing tool, a directory, or a custom web interface.",
    why: "You work directly with me to define the exact layout and features you need, keeping it light, extremely fast, and highly secure.",
    icon: Terminal,
    accentClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    selectedBorderClass: "border-amber-500/50",
    selectedBgClass: "bg-amber-500/[0.04]"
  }
];

const processSteps = [
  {
    icon: MessageCircle,
    title: "Message me on WhatsApp",
    body: "No complex brief forms or ticketing systems. Just send a direct text to start our conversation."
  },
  {
    icon: FileText,
    title: "Tell me what you're building",
    body: "We'll chat about what you do, who your customers are, and look at other websites you really like."
  },
  {
    icon: CheckCircle2,
    title: "We'll choose the right approach",
    body: "I'll help you figure out exactly what pages and features you need to keep things simple and cost-effective."
  },
  {
    icon: PenTool,
    title: "Design, Build & Review",
    body: "I design and build your site, sharing live staging links along the way so you can review and give feedback in real time."
  },
  {
    icon: Rocket,
    title: "We launch your website",
    body: "Once you are completely happy, I'll connect your domain name, set up hosting, and launch your brand-new website."
  }
];

const expectations = [
  {
    title: "A professional online presence",
    body: "A clean, custom design that matches the quality of your business and builds immediate trust."
  },
  {
    title: "A mobile-friendly website",
    body: "Designed to look great on phones, tablets, and computers so your customers get a perfect experience on any device."
  },
  {
    title: "Fast loading pages",
    body: "I build lightweight, optimized pages so your customers don't wait around for the site to load."
  },
  {
    title: "Easy to manage",
    body: "Your website is built so it can grow with your business, making future updates and improvements straightforward."
  },
  {
    title: "Clear communication",
    body: "You deal directly with me—no account managers, no middle-men, just direct updates."
  },
  {
    title: "Ongoing support",
    body: "Need an update in the future? Just send me a message. I'm always available to help you keep things current."
  }
];

export default function WebDevelopment() {
  const brand = getServiceBrandColor("Website Design & Development");

  const devSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Design & Development",
    "description": `Professional business websites, landing pages, and portfolios designed and delivered directly by ${branding.founderName}. Fast, mobile-friendly, and built around your needs.`,
    "provider": {
      "@type": "ProfessionalService",
      "name": branding.businessName,
      "url": "https://web3currency.online"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`Website Design & Development | ${branding.businessName}`}
        description={`Professional business websites, landing pages, and portfolios designed and delivered directly by ${branding.founderName}. Fast, mobile-friendly, and built around your needs.`}
        path="/services/web-development"
        schema={devSchema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}15, transparent 70%)` }} />
        </div>
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
                <Code className={`w-6 h-6 ${brand.twText}`} />
              </div>
              <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>Website Design & Development</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight text-white">
              A website your business can be proud of.
            </h1>
            <div className="space-y-4 max-w-3xl">
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium">
                Your website is often the first impression people have of your business. I build clean, modern websites that help you earn trust, explain what you do clearly, and make it easy for customers to reach you.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Every project starts with a conversation, not a complicated process.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Every Website Includes Section */}
      <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText} block mb-2`}>
              INCLUDED BY DEFAULT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              What Every Website Includes
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">
              Regardless of the type of website you choose, every single project is built to a professional standard and includes:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Mobile-friendly design",
              "Fast loading pages",
              "Professional layout",
              "WhatsApp integration",
              "Contact forms",
              "Basic SEO setup",
              "Secure deployment",
              "Domain connection assistance",
            ].map((feature, idx) => (
              <GlassCard key={idx} className="p-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${brand.twText}`} />
                  <span className="text-white/95 text-xs sm:text-sm font-medium">{feature}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Selection Section */}
      <section className="py-20 md:py-24 bg-zinc-950 border-t border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText} block mb-2`}>CHOOSE YOUR PATH</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">What kind of website do you have in mind?</h2>
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto text-base">
              Explore the exact website structures I specialize in. Each path is fully optimized and customized to serve your specific goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {websiteTypes.map((type, i) => {
              const Icon = type.icon;
              const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${branding.founderName}, I'm interested in discussing a "${type.title}" build for my business.`
              )}`;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex flex-col h-full"
                >
                  <GlassCard 
                    className="p-6 h-full flex flex-col justify-between border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Corner gradient glow */}
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-white/[0.04] transition-all" />
                    
                    <div className="space-y-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${type.accentClass} group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <h3 className="font-display font-bold text-white text-base tracking-tight mb-2 group-hover:text-primary transition-colors">
                          {type.title}
                        </h3>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-0.5">Best For</span>
                            <p className="text-xs text-white/85 leading-relaxed font-medium">{type.for}</p>
                          </div>
                          <div>
                            <span className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-0.5">What it Solves</span>
                            <p className="text-xs text-muted-foreground leading-relaxed">{type.solves}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.04]">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          trackWebsiteProjectEnquiry(type.title);
                          trackContactClick('WhatsApp', `WebDev Enquiry - ${type.title}`);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs hover:border-primary/20 transition-all"
                      >
                        <SiWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                        Inquire
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process & Outcomes Split Section */}
      <section className="py-20 md:py-24 bg-black border-y border-white/[0.08]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Process & Expectations */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Build Process */}
              <div>
                <SectionLabel text="Build Process" />
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-6">
                  Simple. Professional.
                </h2>
                <div className="space-y-6 mt-6">
                  {processSteps.map((step, i) => (
                    <div key={step.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${brand.twBg} ${brand.twBorder}`}>
                          <step.icon className={`w-5 h-5 ${brand.twText}`} />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground font-bold">0{i + 1}</span>
                      </div>
                      <div className="pt-1.5">
                        <h4 className="font-semibold text-white text-base">{step.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-1">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Can Expect */}
              <div className="border-t border-white/[0.08] pt-12">
                <SectionLabel text="What You Can Expect" />
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-6">
                  Honest outcomes, no exaggeration.
                </h2>
                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  {expectations.map((exp) => (
                    <div key={exp.title} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${brand.twText}`} />
                        <h4 className="font-semibold text-white text-sm">{exp.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                        {exp.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Why Build with W3C Digital Network? */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <GlassCard 
                  className="p-8 border border-white/5 bg-white/[0.01]"
                >
                  <h3 className="text-xl font-display font-bold text-white mb-6">Why Build With W3C Digital Network?</h3>
                  <ul className="space-y-4">
                    {[
                      "You work directly with me from start to finish.",
                      "Every website is built around your business, not a template.",
                      "Designed to look great on phones, tablets, and computers.",
                      "Clear communication throughout the project.",
                      "Need an update in the future? Just send me a message."
                    ].map((text, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${brand.twText}`} />
                        <span className="text-white/80 text-sm leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-white/[0.08] mt-8 pt-6">
                    <Link
                      href="/projects"
                      className="group flex items-center justify-between w-full text-white font-semibold hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm mb-6 text-sm"
                    >
                      <span>View recent website examples</span>
                      <ArrowRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                    
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20${branding.founderName}%2C%20I%27d%20like%20to%20discuss%20a%20website%20project`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        trackWebsiteProjectEnquiry('Core Card');
                        trackContactClick('WhatsApp', 'WebDev - Start Conversation');
                      }}
                      className="whatsapp-glow-hover flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#20c05a] transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                    >
                      <SiWhatsapp className="w-5 h-5" />
                      Start a Conversation
                    </a>
                  </div>
                </GlassCard>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Nav Banner */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="container max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Not sure what your business needs yet?{" "}
            <Link href="/services/digital-consulting" className="text-white font-medium hover:text-primary transition-colors underline underline-offset-4">
              Start with Digital Consulting
            </Link>{" "}
            and we'll figure it out together before building anything.
          </p>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: brand.hex }}
            onClick={() => trackContactClick('WhatsApp', 'WebDev - Bottom Banner')}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-black font-bold hover:brightness-110 transition-all transform hover:-translate-y-0.5"
          >
            Message {branding.founderName}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
