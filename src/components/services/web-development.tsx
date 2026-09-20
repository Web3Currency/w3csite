import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Link } from "wouter";
import { Code, ArrowRight } from "lucide-react";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { getServiceBrandColor } from "@/config/theme";
import { trackContactClick } from "@/lib/analytics";
import WebsiteQuestionnaire from "@/components/services/website-questionnaire";

export default function WebDevelopment() {
  const brand = getServiceBrandColor("Website Design & Development");

  const devSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Design & Development",
    description: `Professional websites designed and delivered directly by ${branding.founderName}. Built around your needs and goals.`,
    provider: {
      "@type": "ProfessionalService",
      name: branding.businessName,
      url: "https://web3currency.online"
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`Website Design & Development | ${branding.businessName}`}
        description={`Professional websites designed and delivered directly by ${branding.founderName}. Built around your needs and goals.`}
        path="/services"
        schema={devSchema}
      />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${brand.hex}15, transparent 70%)` }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${brand.twBg} ${brand.twBorder}`}>
              <Code className={`w-6 h-6 ${brand.twText}`} />
            </div>
            <span className={`text-xs uppercase tracking-widest font-mono font-bold ${brand.twText}`}>
              Website Design & Development
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight text-white max-w-4xl">
            Let&apos;s build the right website for you.
          </h1>

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mt-6">
            Whether you need a new website, want to improve an existing one, or have an idea you want to turn into a website, let&apos;s start by figuring out what you need.
          </p>
        </div>
      </section>

      <WebsiteQuestionnaire />

      <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Not sure what your business needs yet?{" "}
            <Link
              href="/services?tab=consulting"
              className="text-white font-medium hover:text-primary transition-colors underline underline-offset-4"
            >
              Start with Digital Consulting
            </Link>
            {" "}and we&apos;ll figure it out together before building anything.
          </p>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: brand.hex }}
            onClick={() => trackContactClick("WhatsApp", "WebDev - Bottom Banner")}
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
