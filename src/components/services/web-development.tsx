import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Link } from "wouter";
import { branding } from "@/config/branding";
import { getServiceBrandColor } from "@/config/theme";
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
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight max-w-4xl ${brand.twText}`}>
            Let&apos;s build the right website for you.
          </h1>

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mt-6">
            Whether you need a new website, want to improve an existing one, or have an idea you want to turn into a website, let&apos;s start by figuring out what you need.
          </p>
        </div>
      </section>

      <WebsiteQuestionnaire />

      <section className="py-16 md:py-20 bg-black border-t border-white/[0.08]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="text-base sm:text-lg leading-relaxed font-semibold text-white/90">
            Not sure what your business needs yet?{" "}
            <Link
              href="/services?tab=consulting"
              className="text-[#22C55E] font-bold hover:brightness-125 transition-colors no-underline"
            >
              Start with Digital Solutions
            </Link>
            {" "}and we&apos;ll figure it out together before building anything.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
