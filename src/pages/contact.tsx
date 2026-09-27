import React from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { MotionGlassCard } from "@/components/shared/glass-card";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { trackContactClick } from "@/lib/analytics";

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${branding.founderName} - ${branding.businessName}`,
    "description": `Get in touch with ${branding.businessName} for Digital Solutions, development, crypto operations, or community access.`,
    "url": "https://web3currency.online/contact",
    "mainEntity": {
      "@type": "Person",
      "name": branding.founderName,
      "sameAs": [contact.telegramUrl, contact.twitterUrl]
    },
    "sameAs": [contact.whatsappCommunityUrl],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": contact.whatsappUrl,
        "telephone": contact.phoneNumber
      },
      {
        "@type": "ContactPoint",
        "contactType": "WhatsApp personal/direct",
        "url": contact.personalWhatsappUrl
      },
      {
        "@type": "ContactPoint",
        "contactType": "WhatsApp community",
        "url": contact.whatsappCommunityUrl
      },
      {
        "@type": "ContactPoint",
        "contactType": "Telegram direct",
        "url": contact.telegramUrl
      },
      {
        "@type": "ContactPoint",
        "contactType": "Telegram community",
        "url": contact.telegramCommunityUrl
      },
      {
        "@type": "ContactPoint",
        "contactType": "telephone",
        "telephone": contact.phoneNumber
      }
    ]
  };

  return (
    <PageTransition>
      <SEO 
        title={`Contact ${branding.founderName} | ${branding.businessName}`} 
        description={`Get in touch with ${branding.founderName} for Digital Solutions, development, crypto operations, or community access.`}
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

            <div id="official-channels" className="mt-8 space-y-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-purple-400">Official Channels & Anti-Impersonation</span>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03]">
                <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                  Use this page as the reference for W3C Digital Network&apos;s official contact channels. Before sending money or cryptocurrency, confirm that you are communicating through an official W3C channel listed on this page.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/70 leading-relaxed">
                  <li><strong className="text-white">Service requests:</strong> W3C Digital Network WhatsApp Business at +234 703 275 4611.</li>
                  <li><strong className="text-white">Direct conversation with Jake:</strong> Jake&apos;s personal WhatsApp and Telegram are available below.</li>
                  <li><strong className="text-white">Payments:</strong> Verify the official W3C payment details on the Terms page and with W3C before sending funds.</li>
                  <li><strong className="text-white">Security:</strong> W3C will never ask for your password, OTP, verification code, 2FA code, recovery phrase, or private key. Never share these with anyone claiming to represent W3C.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. W3C Digital Network */}
          <section id="w3c-digital-network" className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">W3C Digital Network</h2>
              <p className="mt-2 text-sm text-white/60">Official channels for services, business enquiries, and updates.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('WhatsApp', 'W3C Digital Network Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-emerald-500/10 bg-emerald-500/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-emerald-400 font-bold">OFFICIAL WHATSAPP BUSINESS</span>
                      <SiWhatsapp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">W3C Digital Network</h3>
                    <p className="text-xs text-white/60 leading-relaxed">The official W3C WhatsApp Business account for W3C DESK trades, Digital Solutions, website projects, and other service requests.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors pt-6"><span>Chat with W3C</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>

              <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('Twitter', 'W3C Digital Network Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-purple-500/10 bg-purple-500/[0.01] hover:border-purple-500/40 hover:bg-purple-500/[0.04] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-purple-400 font-bold">OFFICIAL X ACCOUNT</span>
                      <svg className="w-4 h-4 fill-current text-purple-400" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">X</h3>
                    <p className="text-xs text-white/60 leading-relaxed">Follow the W3C Digital Network account for public updates, announcements, and project news.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-purple-400 transition-colors pt-6"><span>Follow on X</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>

              <a href={`mailto:${contact.email}`} onClick={() => trackContactClick('Email', 'W3C Digital Network Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71d07] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-[#a71d07]/10 bg-[#a71d07]/[0.01] hover:border-[#a71d07]/40 hover:bg-[#a71d07]/[0.04] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-wider text-[#a71d07] font-bold">BUSINESS EMAIL</span>
                      <Mail className="w-5 h-5 text-[#a71d07]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a71d07] transition-colors">Email</h3>
                    <p className="text-xs text-white/60 leading-relaxed">For business proposals, documents, partnerships, and detailed enquiries.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#a71d07] transition-colors pt-6"><span>Send Email</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>
            </div>
          </section>

          <div className="border-t border-white/10" aria-hidden="true" />

          {/* 3. Community */}
          <section id="community" className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Community</h2>
              <p className="mt-2 text-sm text-white/60">Join the official W3C communities for participation and updates.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href={contact.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('WhatsApp', 'W3C WhatsApp Community Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-emerald-500/10 bg-emerald-500/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4"><span className="font-mono text-[10px] tracking-wider text-emerald-400 font-bold">COMMUNITY</span><SiWhatsapp className="w-5 h-5 text-emerald-400" /></div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">W3C WhatsApp Community</h3>
                    <p className="text-xs text-white/60 leading-relaxed">Join the W3C WhatsApp Community for community participation, discussions, and updates.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors pt-6"><span>Join WhatsApp Community</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>

              <a href={contact.telegramCommunityUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('Telegram', 'W3C Telegram Community Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089c4] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-[#0089c4]/10 bg-[#0089c4]/[0.01] hover:border-[#0089c4]/40 hover:bg-[#0089c4]/[0.04] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4"><span className="font-mono text-[10px] tracking-wider text-[#0089c4] font-bold">COMMUNITY</span><SiTelegram className="w-5 h-5 text-[#0089c4]" /></div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0089c4] transition-colors">W3C Telegram Community</h3>
                    <p className="text-xs text-white/60 leading-relaxed">Join the W3C Digital Network Telegram community for community participation and updates.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#0089c4] transition-colors pt-6"><span>Join Telegram Community</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>
            </div>
          </section>

          <div className="border-t border-white/10" aria-hidden="true" />

          {/* 4. Talk to Jake */}
          <section id="talk-to-jake" className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Talk to Jake</h2>
              <p className="mt-2 text-sm text-white/60">For direct conversations and personal enquiries with Jake.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href={contact.personalWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('WhatsApp', 'Direct Jake Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-emerald-500/10 bg-emerald-500/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.05] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4"><span className="font-mono text-[10px] tracking-wider text-emerald-400 font-bold">DIRECT CONTACT</span><SiWhatsapp className="w-5 h-5 text-emerald-400" /></div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">WhatsApp</h3>
                    <p className="text-xs text-white/60 leading-relaxed">Direct WhatsApp conversation with Jake. Service requests should go to W3C Digital Network.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors pt-6"><span>Chat with Jake</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>

              <a href={contact.telegramUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('Telegram', 'Direct Jake Card')} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089c4] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-[2rem]">
                <MotionGlassCard className="p-6 h-full flex flex-col justify-between border-[#0089c4]/10 bg-[#0089c4]/[0.01] hover:border-[#0089c4]/40 hover:bg-[#0089c4]/[0.04] transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4"><span className="font-mono text-[10px] tracking-wider text-[#0089c4] font-bold">DIRECT CONTACT</span><SiTelegram className="w-5 h-5 text-[#0089c4]" /></div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0089c4] transition-colors">Telegram</h3>
                    <p className="text-xs text-white/60 leading-relaxed">Direct Telegram conversation with Jake.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#0089c4] transition-colors pt-6"><span>Open Telegram</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></div>
                </MotionGlassCard>
              </a>
            </div>
          </section>
        </div>
      </section>
    </PageTransition>
  );
}