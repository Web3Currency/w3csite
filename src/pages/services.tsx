import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Mail, PenTool, MapPin } from "lucide-react";
import { Link } from "wouter";
import { servicesContent } from "@/content/services";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import DigitalConsulting from "@/components/services/digital-consulting";
import CryptoP2P from "@/components/services/crypto-p2p";
import WebDevelopment from "@/components/services/web-development";
import CommunityService from "@/components/services/community";

type ServiceTab = "consulting" | "desk" | "web" | "community" | "others";

const tabs: Array<{
  id: ServiceTab;
  label: string;
  activeClass: string;
}> = [
  { id: "consulting", label: "Digital Consulting", activeClass: "border-green-400 text-white" },
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
  };

  const getExtraIcon = (name: string) => {
    switch (name) {
      case "building":
        return Building2;
      case "mail":
        return Mail;
      case "pentool":
        return PenTool;
      default:
        return MapPin;
    }
  };

  const renderActiveService = () => {
    switch (activeTab) {
      case "consulting":
        return <DigitalConsulting />;
      case "desk":
        return <CryptoP2P />;
      case "web":
        return <WebDevelopment />;
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {extras.list.map((item, i) => {
                  const IconComponent = getExtraIcon(item.iconName);
                  return (
                    <motion.a
                      key={item.title}
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/30 hover:bg-primary/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                        Ask on WhatsApp
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.a>
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
    description: `Digital consulting, secure crypto P2P trading, AI-powered web development, and a Web3 community, all delivered personally by ${branding.founderName}.`,
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
            description: "Secure, fast, and confidential peer-to-peer cryptocurrency trades (buy/sell crypto with Naira).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Consulting & Strategy",
            description: "Personalized technical guidance and consulting on Web3, software setup, and digital strategy.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development & Design",
            description: "Custom-built, fast, and elegant websites tailored to your specific requirements.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "W3C Community Hub",
            description: "Join our free WhatsApp community for Web3 learning, market insights, and daily opportunities.",
          },
        },
      ],
    },
  };

  return (
    <PageTransition>
      <SEO
        title={`Services | ${branding.businessName}`}
        description={`Digital consulting, secure crypto P2P trading, AI-powered web development, and a Web3 community, all delivered personally by ${branding.founderName}. Find the right service for your situation.`}
        path="/services"
        schema={servicesSchema}
      />

      {/* Functional sticky service tabs */}
      <section className="sticky top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/[0.08]" aria-label="Service navigation">
        <div className="w-full">
          <div
            ref={tabsContainerRef}
            className="flex items-stretch overflow-x-auto scrollbar-hide whitespace-nowrap"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[tab.id] = element;
                  }}
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  className={`shrink-0 md:flex-1 px-5 py-4 md:py-5 border-b-2 text-base sm:text-lg font-bold uppercase tracking-wide transition-colors ${
                    active ? tab.activeClass : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* The selected service content renders here. */}
      <main>{renderActiveService()}</main>

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
