import React from "react";
import { Link } from "wouter";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard, MotionGlassCard } from "@/components/shared/glass-card";
import { Mail, ArrowRight, Users, ShieldAlert, GraduationCap, Flame, CheckCircle2, Bookmark } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { communityContent } from "@/content/community";
import { trackContactClick, trackCommunityJoin } from "@/lib/analytics";

export default function Contact() {
  const getCommunityIcon = (name: string) => {
    if (name === "flame") return <Flame className="w-7 h-7 text-primary" />;
    if (name === "graduation") return <GraduationCap className="w-7 h-7 text-primary" />;
    return <ShieldAlert className="w-7 h-7 text-primary" />;
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${branding.founderName} - ${branding.businessName}`,
    "description": `Get in touch with ${branding.founderName} for consulting, development, crypto operations, or community access.`,
    "url": "https://web3currency.online/contact"
  };

  return (
    <PageTransition>
      <SEO 
        title={`Contact ${branding.founderName} | ${branding.businessName}`} 
        description={`Get in touch with ${branding.founderName} for consulting, development, crypto operations, or community access.`}
        path="/contact"
        schema={contactSchema}
      />
      
      <section className="pt-32 pb-24 bg-black min-h-screen relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-fade opacity-30" />
        </div>

        <div className="site-container relative z-10 space-y-24">
          
          {/* 1. Hero Section */}
          <div id="contact-hero" className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Let's Start the <span className="text-purple-500 italic">Conversation</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              Whether you need a website, digital guidance, Web3 support, or a crypto P2P trade, the first step is simply reaching out.
            </p>
          </div>

          {/* 2. Communication Hub */}
          <div id="contact-hub" className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-purple-400">Communication Hub</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* WhatsApp */}
              <a 
                href={contact.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackContactClick('WhatsApp', 'Communication Hub Card')}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]"
              >
                <MotionGlassCard
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 h-full flex flex-col justify-between border-emerald-500/10 bg-emerald-500/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-emerald-400 font-bold">FASTEST RESPONSE</span>
                      </div>
                      <SiWhatsapp className="w-5 h-5 text-emerald-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      WhatsApp
                    </h3>
                    
                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      This is the best place to reach me for new enquiries, project discussions, W3C DESK trades, digital consulting, and community support.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors pt-2">
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </MotionGlassCard>
              </a>

              {/* Telegram */}
              <a 
                href={contact.telegramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackContactClick('Telegram', 'Communication Hub Card')}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089c4] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]"
              >
                <MotionGlassCard
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 h-full flex flex-col justify-between border-[#0089c4]/10 bg-[#0089c4]/[0.01] hover:border-[#0089c4]/40 hover:bg-[#0089c4]/[0.04] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0089c4] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0089c4]"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-[#0089c4] font-bold">COMMUNITY & CHAT</span>
                      </div>
                      <SiTelegram className="w-5 h-5 text-[#0089c4]" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0089c4] transition-colors">
                      Telegram
                    </h3>
                    
                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      For quick conversations and the W3C community.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#0089c4] transition-colors pt-2">
                    <span>Open Telegram</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </MotionGlassCard>
              </a>

              {/* X (Twitter) */}
              <a 
                href={contact.twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackContactClick('Twitter', 'Communication Hub Card')}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]"
              >
                <MotionGlassCard
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 h-full flex flex-col justify-between border-purple-500/10 bg-purple-500/[0.01] hover:border-purple-500/40 hover:bg-purple-500/[0.04] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-purple-400 font-bold">CORE ANNOUNCEMENTS</span>
                      </div>
                      <svg className="w-4 h-4 fill-current text-purple-400" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      X
                    </h3>
                    
                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      Follow for core development announcements, technical updates, and official project updates.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-purple-400 transition-colors pt-2">
                    <span>Follow on X</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </MotionGlassCard>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${contact.email}`} 
                onClick={() => trackContactClick('Email', 'Communication Hub Card')}
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71d07] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]"
              >
                <MotionGlassCard
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 h-full flex flex-col justify-between border-[#a71d07]/10 bg-[#a71d07]/[0.01] hover:border-[#a71d07]/40 hover:bg-[#a71d07]/[0.04] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a71d07] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a71d07]"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-[#a71d07] font-bold">BUSINESS PROPOSALS & FILES</span>
                      </div>
                      <Mail className="w-5 h-5 text-[#a71d07]" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a71d07] transition-colors">
                      Email
                    </h3>
                    
                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      Best for business proposals, documents, partnerships, and detailed enquiries.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#a71d07] transition-colors pt-2">
                    <span>Send Email</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </MotionGlassCard>
              </a>
            </div>
          </div>

          {/* 3. Stay Connected Guarantee */}
          <div id="contact-stay-connected" className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-zinc-950 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center">
                    <Bookmark className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-base text-white tracking-tight">Stay Connected Guarantee</h4>
                </div>
                <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
                  Communication channels may change over time, but <strong className="text-white font-semibold">W3C Digital Network</strong> will always be available through this website. Bookmark this website for the latest updates and contact information.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Fast Response Advisory */}
          <div id="fast-response-advisory" className="pt-4">
            <GlassCard className="p-8 sm:p-12 border border-white/5 bg-gradient-to-r from-[#0C0C0C] via-[#050505] to-[#0A0A0A] rounded-[2rem] overflow-hidden relative">
              <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] font-extrabold text-purple-400">FAST RESPONSE ADVISORY</span>
                </div>

                <h3 className="text-3xl font-display font-bold text-white tracking-tight">
                  Need a quick response?
                </h3>

                <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
                  <p>
                    For most enquiries, WhatsApp is still the fastest option.
                  </p>
                  <p>
                    Whether you're planning a website, exploring Web3, looking for digital guidance, or ready to make a crypto trade, just send me a message and we'll take it from there.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a 
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick('WhatsApp', 'Advisory CTA')}
                    className="px-6 py-3 rounded-full bg-emerald-500 text-black font-bold text-xs sm:text-sm hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* 5. W3C Community (Title & Intro) */}
          <div id="community" className="border-t border-white/[0.08] pt-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
                Learn with the <span className="text-primary italic">operators.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {communityContent.hero.description}
              </p>
            </div>
          </div>

          {/* 6. Community Benefits */}
          <div id="community-benefits">
            <div className="grid md:grid-cols-3 gap-6">
              {communityContent.modules.map((module, i) => (
                <MotionGlassCard 
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="w-14 h-14 mx-auto bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6">
                    {getCommunityIcon(module.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{module.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{module.description}</p>
                </MotionGlassCard>
              ))}
            </div>
          </div>

          {/* 7. Membership */}
          <div id="community-membership" className="max-w-3xl">
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              {communityContent.membership.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {communityContent.membership.description}
            </p>
          </div>

          {/* 8. Community Card */}
          <div id="community-card" className="max-w-xl mx-auto w-full">
            <div className="relative p-8 rounded-3xl border border-white/15 bg-gradient-to-br from-zinc-900 via-neutral-950 to-zinc-900 shadow-[0_0_50px_rgba(168,85,247,0.06)] overflow-hidden flex flex-col justify-between min-h-[340px] group hover:border-purple-500/30 transition-all duration-500">
              
              {/* Card Hologram & Mesh Grid Background Overlay */}
              <div className="absolute inset-0 bg-grid-fade opacity-10 pointer-events-none" />
              <div className="absolute -right-24 -top-24 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all duration-500" />
              <div className="absolute -left-24 -bottom-24 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Premium Header */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="font-display font-black text-white text-base sm:text-lg tracking-wider bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent uppercase flex items-center gap-2">
                    <span className="text-purple-400">W3C</span> OPERATOR
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40 mt-1">
                    {communityContent.sidebar.subtitle}
                  </div>
                </div>

                {/* Micro SIM Chip for Credential Look */}
                <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-400/25 via-amber-300/35 to-amber-500/15 border border-amber-500/35 p-1.5 flex flex-col justify-between shadow-inner shrink-0">
                  <div className="grid grid-cols-3 gap-0.5 h-full opacity-70">
                    <div className="border-r border-b border-amber-500/20" />
                    <div className="border-r border-b border-amber-500/20" />
                    <div className="border-b border-amber-500/20" />
                    <div className="border-r border-amber-500/20" />
                    <div className="border-r border-amber-500/20" />
                    <div className="opacity-0" />
                  </div>
                </div>
              </div>

              {/* Benefits list (middle part of card) */}
              <div className="relative z-10 my-6 space-y-3">
                {communityContent.sidebar.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-white/80 tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-end justify-between">
                <div>
                  <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1.5">MEMBERSHIP TYPE</span>
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                    {communityContent.sidebar.footerLeft}
                  </span>
                </div>
              </div>
              
              {/* Watermark Signature overlay */}
              <div className="absolute right-6 bottom-16 opacity-[0.03] group-hover:opacity-[0.06] pointer-events-none select-none transition-all duration-500">
                <span className="font-serif italic text-4xl text-white font-light tracking-widest">
                  Jake W3C
                </span>
              </div>
            </div>
          </div>

          {/* 9. Join Community CTA */}
          <div id="community-join-cta" className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href={contact.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCommunityJoin('Contact Page CTA')}
              className="whatsapp-glow-hover w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-black font-bold rounded-full hover:bg-primary/95 transition-all hover:scale-[1.02] active:scale-95 text-base shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <SiWhatsapp className="w-6 h-6 text-black" />
              {communityContent.membership.ctaText}
            </a>
            <Link 
              href="/services/community"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Learn More <ArrowRight className="w-5 h-5 text-white/60" />
            </Link>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}