import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { navigation } from "@/config/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-black pt-16 md:pt-20 pb-8">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 mb-14 md:mb-16 text-center md:text-left">
          <div className="col-span-1 md:col-span-1 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 group mb-6 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
              <img 
                src="https://i.imgur.com/FwLZZ8d.png" 
                alt={branding.businessName} 
                className="h-10 sm:h-12 w-auto min-w-[40px] max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {branding.businessName.replace("W3C ", "")}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed md:block hidden">
              Built around Web3, crypto and the wider digital economy.
            </p>
            <div className="mt-2 flex flex-row items-center justify-center gap-3 flex-nowrap md:hidden">
              <a href={`tel:${contact.phoneNumber}`} aria-label="Phone" className="group flex items-center justify-center text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Phone className="w-4 h-4 text-white/50" />
                </div>
              </a>
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="group flex items-center justify-center text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:border-[#25D366]/50 transition-colors">
                  <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
                </div>
              </a>
              <a href={contact.telegramUrl} target="_blank" rel="noreferrer" aria-label="Telegram" className="group flex items-center justify-center text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-center justify-center group-hover:border-[#0088cc]/50 transition-colors">
                  <SiTelegram className="w-4 h-4 text-[#0088cc]" />
                </div>
              </a>
              <a href={contact.twitterUrl} target="_blank" rel="noreferrer" aria-label="X" className="group flex items-center justify-center text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current text-white/60" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              </a>
              <a href={`mailto:${contact.email}`} aria-label="Email" className="group flex items-center justify-center text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Mail className="w-4 h-4 text-white/50" />
                </div>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 text-center md:text-left">
            <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-sm text-center md:text-left">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:block justify-items-center md:justify-items-start">
              {navigation.footerQuickLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`text-white/80 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${link.label === "FAQ" ? "hidden md:block" : "block"} md:mb-4`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:block hidden">
            <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-sm">Social & Community</h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${contact.phoneNumber}`} className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors"><Phone className="w-4 h-4 text-white/50" /></div>
                {contact.phoneNumberFormatted}
              </a>
              <a href={contact.whatsappUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center group-hover:border-[#25D366]/50 transition-colors"><SiWhatsapp className="w-4 h-4 text-[#25D366]" /></div>
                WhatsApp Chat
              </a>
              <a href={contact.telegramUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-center justify-center group-hover:border-[#0088cc]/50 transition-colors"><SiTelegram className="w-4 h-4 text-[#0088cc]" /></div>
                Telegram
              </a>
              <a href={contact.twitterUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors"><svg className="w-3.5 h-3.5 fill-current text-white/60" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></div>
                X
              </a>
              <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors"><Mail className="w-4 h-4 text-white/50" /></div>
                Email
              </a>
            </div>
          </div>

          <div className="col-span-1 text-right">
            <h4 className="font-display font-semibold text-white mb-6 uppercase tracking-wider text-sm">Registered Business (CAC)</h4>
            <div className="space-y-1.5 text-sm text-white/80">
              <p className="font-mono">RC: 957908</p>
              <p className="text-muted-foreground">Nigeria</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70 text-center">
          <p>© {currentYear} {branding.businessName}. All rights reserved.</p>
          <div className="flex gap-6">
            {navigation.footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
