import React, { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import {
  ArrowRight,
  Clock3,
  Mail,
  MessageCircle,
  Send,
  ChevronDown,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { trackContactClick } from "@/lib/analytics";
import { W3CLocationMap } from "@/components/shared/w3c-location-map";

const enquiryCategories = [
  {
    value: "Digital Services",
    description: "Websites, development and practical digital solutions.",
  },
  {
    value: "W3C DESK",
    description: "Buy or sell crypto (P2P), check rates and arrange a trade.",
  },
  {
    value: "AI & Digital Products",
    description: "AI-assisted tools, applications and digital products.",
  },
  {
    value: "Partnerships",
    description: "Business proposals, collaborations and strategic opportunities.",
  },
  {
    value: "Community & Education",
    description: "Join the W3C community, learn, share and grow together.",
  },
  {
    value: "General Enquiries",
    description: "Other questions, support or information about W3C.",
  },
];

export default function Contact() {
  const [enquiryType, setEnquiryType] = useState("Digital Services");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${branding.businessName}`,
    description: `Contact ${branding.businessName} for digital services, W3C DESK, AI products, partnerships, and community enquiries.`,
    url: "https://web3currency.online/contact",
    mainEntity: {
      "@type": "Organization",
      name: branding.businessName,
      url: "https://web3currency.online",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "business enquiries",
          email: contact.email,
          telephone: contact.phoneNumber,
          url: contact.whatsappUrl,
          availableLanguage: ["English"],
        },
      ],
      sameAs: [contact.twitterUrl, contact.whatsappCommunityUrl, contact.telegramCommunityUrl],
    },
  };

  const handleEnquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`W3C Website Enquiry — ${enquiryType}`);
    const body = encodeURIComponent(
      `Enquiry type: ${enquiryType}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    trackContactClick("Email", "Contact Enquiry Form");
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const selectEnquiry = (value: string) => {
    setEnquiryType(value);
    document.getElementById("send-enquiry")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <PageTransition>
      <SEO
        title={`Contact ${branding.businessName}`}
        description="Get in touch with W3C Digital Network for digital services, crypto P2P, AI products, partnerships, community and general enquiries."
        path="/contact"
        schema={contactSchema}
      />

      <section className="relative min-h-screen overflow-hidden bg-black pb-16 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade opacity-30" />
          <div className="absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-[#a855f7]/[0.09] blur-[130px]" />
          <div className="absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#a855f7]/[0.05] blur-[120px]" />
        </div>

        <div className="site-container relative z-10">
          <header id="contact-hero" className="mb-10 max-w-4xl sm:mb-12">
            <h1 className="font-display text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              How can W3C <span className="text-[#a855f7]">help you?</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
              Get in touch for digital services, crypto (W3C DESK), AI and digital products,
              partnerships, community or any other enquiry.
            </p>
          </header>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(340px,0.95fr)] lg:gap-5 xl:gap-8">
            <div className="space-y-10">
              <section aria-labelledby="enquiry-categories-heading">
                <h2 id="enquiry-categories-heading" className="sr-only">Choose an enquiry category</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {enquiryCategories.map(({ value, description }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => selectEnquiry(value)}
                      className="group flex min-h-[112px] items-center gap-4 rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-5 text-left hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-bold text-white sm:text-lg">{value}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-white/60 sm:text-sm">{description}</span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-white/75 transition-transform group-hover:translate-x-1 group-hover:text-[#a855f7]" />
                    </button>
                  ))}
                </div>
              </section>

              <section id="send-enquiry" className="scroll-mt-28 rounded-3xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 p-5 sm:p-6">
                <div className="mb-5">
                  <h2 className="font-display text-2xl font-bold text-white">Send an Enquiry</h2>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-white/65">
                  Prefer to send a message directly? Use the form below and we’ll prepare an email for you.
                </p>

                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <label className="sr-only" htmlFor="contact-enquiry-type">Enquiry type</label>
                  <div className="relative">
                    <select
                      id="contact-enquiry-type"
                      value={enquiryType}
                      onChange={(event) => setEnquiryType(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#a855f7]"
                    >
                      {enquiryCategories.map(({ value }) => <option key={value} value={value}>{value}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                  </div>

                  <label className="sr-only" htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none placeholder:text-white/55 transition-colors focus:border-[#a855f7]"
                  />

                  <label className="sr-only" htmlFor="contact-email">Your email</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email"
                    className="w-full rounded-xl border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none placeholder:text-white/55 transition-colors focus:border-[#a855f7]"
                  />

                  <label className="sr-only" htmlFor="contact-message">Your message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Your message"
                    className="w-full resize-y rounded-xl border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none placeholder:text-white/55 transition-colors focus:border-[#a855f7]"
                  />

                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#9333ea] px-5 py-3.5 font-bold text-white shadow-lg shadow-purple-950/30 transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                    <Send className="h-4 w-4" />
                    Prepare Email
                  </button>
                </form>

                <div className="mt-4 text-xs leading-relaxed text-white/55">
                  <p>Your details stay in your browser until you choose to send the email. See our <a href="/privacy" className="text-[#c084fc] underline underline-offset-2 hover:text-white">Privacy Policy</a>.</p>
                </div>
              </section>


            </div>

            <aside className="space-y-4">


              <section aria-label="Opening hours" className="flex items-center gap-4 rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 p-4 sm:p-5">
                <Clock3 className="h-10 w-10 shrink-0 text-[#a855f7]" strokeWidth={1.8} />
                <div className="h-12 w-px shrink-0 bg-white/25" />
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-bold text-white">Opening Hours</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/85 sm:text-base">
                    Monday – Sunday:
                    <span className="font-bold text-white">24/7</span>
                  </p>
                </div>
              </section>

              <section id="other-contact-options" aria-labelledby="other-contact-heading">
                <div className="mb-5 pl-4">
                  <h2 id="other-contact-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Other Ways to Reach W3C
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick("WhatsApp", "W3C Contact Channel")}
                    className="group flex min-h-[190px] flex-col items-center rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-4 text-center hover:bg-emerald-500/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <SiWhatsapp className="mb-3 h-8 w-8 text-emerald-400" />
                    <span className="font-bold text-white">WhatsApp</span>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#c084fc] transition-colors group-hover:text-white">Chat on WhatsApp <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </a>

                  <a
                    href={contact.telegramCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick("Telegram", "W3C Contact Channel")}
                    className="group flex min-h-[190px] flex-col items-center rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-4 text-center hover:bg-sky-500/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <SiTelegram className="mb-3 h-8 w-8 text-sky-400" />
                    <span className="font-bold text-white">Telegram</span>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#c084fc] transition-colors group-hover:text-white">Join Telegram <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    onClick={() => trackContactClick("Email", "W3C Contact Channel")}
                    className="group flex min-h-[190px] flex-col items-center rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-4 text-center hover:bg-[#a855f7]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
                  >
                    <Mail className="mb-3 h-8 w-8 text-red-500" />
                    <span className="font-bold text-white">Business Email</span>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#c084fc] transition-colors group-hover:text-white">Email W3C <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </a>

                  <a
                    href={contact.personalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick("WhatsApp", "Direct Jake Contact Channel")}
                    className="group flex min-h-[190px] flex-col items-center rounded-2xl bg-white/[0.05] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:bg-white/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-4 text-center hover:bg-[#a855f7]/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
                  >
                    <MessageCircle className="mb-3 h-8 w-8 text-[#c084fc]" />
                    <span className="font-bold text-white">Direct Contact (Jake)</span>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-[#c084fc] transition-colors group-hover:text-white">Contact Jake <ArrowRight className="ml-1 h-3 w-3" /></span>
                  </a>
                </div>
              </section>
            </aside>
          </div>

          <section aria-labelledby="w3c-location-heading" className="mt-12 sm:mt-16">
            <div className="mb-5">
              <h2 id="w3c-location-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">Our Location</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">Online operations based in Nigeria, serving clients digitally worldwide.</p>
            </div>
            <W3CLocationMap />
          </section>

        </div>
      </section>
    </PageTransition>
  );
}
