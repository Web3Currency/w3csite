import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Globe, Mail, PenTool, MapPin, X, ChevronDown } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { servicesContent } from "@/content/services";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { trackContactClick } from "@/lib/analytics";
import { FounderAvatar } from "@/components/shared/founder-avatar";
import DigitalSolutions from "@/components/services/digital-consulting";
import CryptoP2P from "@/components/services/crypto-p2p";
import WebDevelopment from "@/components/services/web-development";
import CommunityService from "@/components/services/community";

type ServiceTab = "consulting" | "desk" | "web" | "community" | "others";

const tabs: Array<{
  id: ServiceTab;
  label: string;
  activeClass: string;
}> = [
  { id: "consulting", label: "Digital Solutions", activeClass: "border-green-400 text-white" },
  { id: "desk", label: "W3C DESK", activeClass: "border-orange-400 text-white" },
  { id: "web", label: "Web Dev", activeClass: "border-yellow-400 text-white" },
  { id: "community", label: "W3C Community", activeClass: "border-purple-400 text-white" },
  { id: "others", label: "Others", activeClass: "border-white text-white" },
];

export default function Services() {
  const { extras, cta } = servicesContent;
  const getTabFromUrl = (): ServiceTab => {
    const value = new URLSearchParams(window.location.search).get("tab");
    return tabs.some((tab) => tab.id === value) ? (value as ServiceTab) : "consulting";
  };

  const [activeTab, setActiveTab] = useState<ServiceTab>(getTabFromUrl);
  const [inquiryService, setInquiryService] = useState<string | null>(null);
  const serviceGuideCards = [
    { title: "Choose a service and answer a few questions", description: "Each service uses a simple questionnaire. Your answers help JAKE understand what you need before you contact him. When you finish, your answers are prepared for the next conversation, so you do not have to explain everything again." },
    { title: "Digital Solutions", description: "You answer what you need help with, what kind of situation you are in, and the result you want. If you are unsure, there is an option for that too." },
    { title: "W3C DESK", description: "You choose whether you want to buy or sell crypto, select the asset, provide the amount and wallet type, add any note, review the request, and continue to WhatsApp." },
    { title: "Website Design & Development", description: "You describe what kind of website you need, what it is for, your main goal, your content situation, and when you want to start. Your answers can then be sent to JAKE by WhatsApp, Telegram, or email." },
    { title: "W3C Community", description: "You answer a short set of questions about your interests, experience, learning goals, connections, updates, opportunities, and the kind of help you need. Before joining, you review the community safety rules and then continue to WhatsApp." },
    { title: "Other services", description: "You can also ask JAKE about CAC business name registration, domain and hosting, business email setup, logo and brand identity, Google Business Profile, or another digital task that is not listed. Choose the service, make an inquiry, and continue through WhatsApp or Telegram." },
  ];
  const [serviceGuideIndex, setServiceGuideIndex] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<ServiceTab, HTMLButtonElement | null>>({
    consulting: null,
    desk: null,
    web: null,
    community: null,
    others: null,
  });

  useEffect(() => {
    const handleUrlChange = () => setActiveTab(getTabFromUrl());
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const container = tabsContainerRef.current;
    const tab = tabRefs.current[activeTab];
    if (!container || !tab) return;

    requestAnimationFrame(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const targetScrollLeft =
        tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2;
      const clampedScrollLeft = Math.max(
        0,
        Math.min(targetScrollLeft, maxScrollLeft),
      );

      container.scrollTo({
        left: clampedScrollLeft,
        behavior: "smooth",
      });
    });
  }, [activeTab]);

  const selectTab = (tab: ServiceTab) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url);
    setActiveTab(tab);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const getExtraIcon = (name: string) => {
    switch (name) {
      case "building":
        return Building2;
      case "mail":
        return Mail;
      case "pentool":
        return PenTool;
      case "globe":
        return Globe;
      default:
        return MapPin;
    }
  };

  const renderActiveService = () => {
    switch (activeTab) {
      case "consulting":
        return (
          <>
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, #22C55E15, transparent 70%)" }}
                />
              </div>
              <div className="container max-w-5xl mx-auto px-6 relative z-10">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight max-w-4xl text-[#22C55E]">
                  Let&apos;s find the right digital solution for you.
                </h1>
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mt-6">
                  I help individuals, creators, and businesses figure out what they need, improve what they already have, and turn digital ideas into practical solutions.
                </p>
              </div>
            </section>
            <DigitalSolutions />
            <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
              <div className="container max-w-4xl mx-auto px-6">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#22C55E]">
                    Still wondering?
                  </h2>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
                    Not sure if this is the right service?
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-2xl mx-auto mt-5">
                    That&apos;s okay. Send me a message anyway. If Digital Solutions isn&apos;t the right fit, I&apos;ll point you to the service that is. Sometimes the best advice is simply knowing where to start.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-6 py-3 bg-[#22C55E]/10 text-[#22C55E] font-bold text-sm border border-[#22C55E]/20 hover:bg-[#22C55E]/20 transition-all"
                    >
                      Start a Conversation
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      case "desk":
        return <CryptoP2P onNavigateToTab={selectTab} />;
      case "web":
        return <WebDevelopment onNavigateToTab={selectTab} />;
      case "community":
        return <CommunityService />;
      case "others":
        return (
          <section className="py-20 md:py-24 bg-zinc-950 border-y border-white/[0.08]">
            <div className="site-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground block mb-2">
                  {extras.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
                  {extras.subtitle}
                </h2>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  {extras.description}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {extras.list.map((item, i) => {
                  const IconComponent = getExtraIcon(item.iconName);
                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => setInquiryService(item.title)}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="group w-full text-left rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-primary/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:border-primary/30 transition-colors">
                        <IconComponent className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-display font-bold text-white text-sm mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {item.body}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 group-hover:text-primary transition-colors">
                        Make Inquiry
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>
        );
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Digital Services by ${branding.businessName}`,
    description: `Questionnaire-led services from ${branding.businessName}: Digital Solutions, W3C DESK crypto P2P, Website Design & Development, W3C Community, and other digital services.`,
    provider: {
      "@type": "ProfessionalService",
      name: branding.businessName,
      url: "https://web3currency.online",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "W3C Service Catalog",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "W3C DESK Crypto P2P",
            description: "A questionnaire-led peer-to-peer crypto service. Choose buy or sell, select the asset and amount, provide the relevant wallet information, review the request, and continue to WhatsApp.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Solutions",
            description: "A questionnaire that helps JAKE understand a digital problem, idea, AI need, or online-presence goal before the conversation continues.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development & Design",
            description: "A questionnaire that gathers website type, purpose, goals, content readiness, and timing before the project conversation continues.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "W3C Community Hub",
            description: "A questionnaire that helps visitors identify their Web3, crypto, AI, learning, connection, update, and opportunity interests before joining the WhatsApp community.",
          },
        },
      ],
    },
  };

  return (
    <PageTransition>
      <SEO
        title={`Services | ${branding.businessName}`}
        description={`Choose a W3C service questionnaire to explain what you need. Digital Solutions helps clarify digital problems and goals; W3C DESK handles crypto P2P requests; Website Design & Development gathers website requirements; W3C Community helps people find the right learning and community path; Other services are available for common digital tasks.`}
        path="/services"
        schema={servicesSchema}
      />

      {/* Service guide carousel appears before the sticky tabs. */}
      <section aria-labelledby="service-questionnaire-guide" className="border-b border-white/[0.08] bg-zinc-950 py-10 md:py-14 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: "translateX(-" + (serviceGuideIndex * 100) + "%)" }}
            >
              {serviceGuideCards.map((card, index) => (
                <article key={card.title} className={"min-w-full p-7 sm:p-9 md:p-12 " + (index === 0 ? "bg-gradient-to-br from-emerald-500 via-orange-500 via-50% to-purple-600" : index === 1 ? "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400" : index === 2 ? "bg-gradient-to-br from-orange-700 via-orange-500 to-amber-400" : index === 3 ? "bg-gradient-to-br from-yellow-600 via-yellow-400 to-amber-200" : index === 4 ? "bg-gradient-to-br from-purple-800 via-purple-600 to-fuchsia-400" : "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-400") + " text-white"} aria-hidden={serviceGuideIndex !== index}>
                  <div className="max-w-3xl min-h-[250px] sm:min-h-[280px] md:min-h-[300px] flex flex-col">
                    <h2 id={index === 0 ? "service-questionnaire-guide" : undefined} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white leading-tight drop-shadow-sm">
                      {card.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-white leading-relaxed drop-shadow-sm">{card.description}</p>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => selectTab((["consulting", "desk", "web", "community", "others"] as ServiceTab[])[index - 1])}
                        className="mt-auto self-end inline-flex items-center gap-2 rounded-full px-4 py-2.5 bg-white text-black font-bold text-sm hover:brightness-110 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        <span>{["Find the Right Solution", "Start a Trade Request", "Plan My Website", "Enter the Community", "Explore Other Services"][index - 1]}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="flex items-center justify-end px-6 py-4 sm:px-8">
              <div className="flex items-center gap-2" aria-label="Service guide carousel controls">
                {serviceGuideCards.map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    aria-label={"Show " + card.title}
                    aria-current={serviceGuideIndex === index ? "true" : undefined}
                    onClick={() => setServiceGuideIndex(index)}
                    className={"h-1.5 rounded-full transition-all duration-300 " + (serviceGuideIndex === index ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functional sticky service tabs */}
      <section className="sticky top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/[0.08]" aria-label="Service navigation" role="tablist">
        <div className="w-full">
          <div ref={tabsContainerRef} className="flex items-stretch overflow-x-auto scrollbar-hide whitespace-nowrap">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(element) => { tabRefs.current[tab.id] = element; }}
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  role="tab"
                  aria-selected={active}
                  aria-controls="selected-service-questionnaire"
                  className={"shrink-0 md:flex-1 px-5 py-4 md:py-5 border-b-2 text-base sm:text-lg font-bold uppercase tracking-wide transition-colors " + (active ? tab.activeClass : "border-transparent text-white/60 hover:text-white")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* The selected service content renders here. */}
      <main id="selected-service-questionnaire" aria-label="Selected service questionnaire">{renderActiveService()}</main>

      <AnimatePresence>
        {inquiryService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInquiryService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-7 sm:p-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setInquiryService(null)}
                aria-label="Close"
                className="absolute top-5 right-5 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex justify-center mb-6">
                <FounderAvatar />
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-center text-primary">
                Ready to make an inquiry?
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed text-center">
                Your inquiry is about <span className="text-white font-semibold">{inquiryService}</span>. Choose where you would like to continue.
              </p>

              <div className="grid gap-3 mt-8">
                <a
                  href={`${contact.whatsappUrl}?text=${encodeURIComponent(`Hi ${branding.founderName}, I'd like to make an inquiry about ${inquiryService}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("WhatsApp", `Others Service Inquiry: ${inquiryService}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#25D366] text-black font-bold text-sm hover:brightness-110 transition-all"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Continue on WhatsApp
                </a>
                <a
                  href={`${contact.telegramUrl}?text=${encodeURIComponent(`Hi ${branding.founderName}, I'd like to make an inquiry about ${inquiryService}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("Telegram", `Others Service Inquiry: ${inquiryService}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-[#229ED9] text-white font-bold text-sm hover:brightness-110 transition-all"
                >
                  <SiTelegram className="w-4 h-4" />
                  Continue on Telegram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA remains only for the Others tab */}
      {activeTab === "others" && (
        <section id="services-final-cta" className="py-24 md:py-32 relative overflow-hidden bg-black border-t border-white/[0.08]">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
        <div className="site-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] border border-white/[0.08] bg-white/[0.015] backdrop-blur-sm px-6 py-14 sm:px-16 sm:py-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
              {cta.title}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Link
                id="cta-contact-btn"
                href="/contact"
                className="w-full sm:w-auto glow-primary-hover inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-black font-bold text-lg active:scale-95 hover:bg-primary/95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Start the Conversation
              </Link>
              <Link
                id="cta-projects-btn"
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border border-white/15 text-white font-semibold text-lg transition-all hover:bg-white/5 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Recent Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      )}
    </PageTransition>
  );
}
