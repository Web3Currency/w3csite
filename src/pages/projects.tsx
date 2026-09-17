import { useState } from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { GlassCard } from "@/components/shared/glass-card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { branding } from "@/config/branding";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "web3", label: "Web3" },
  { id: "automation", label: "Bots" },
];

function matchesFilter(category: string, filter: string) {
  if (filter === "all") return true;
  if (filter === "web") return category === "Personal Brand Website" || category === "Corporate Website";
  if (filter === "web3") return category === "Internal Web3 Tool";
  if (filter === "automation") return category === "Telegram Trading Assistant";
  return true;
}

export default function Projects() {
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("all");
  const filteredProjects = projects.filter((project) => matchesFilter(project.category, selectedProjectCategory));

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projects | ${branding.businessName}`,
    description: "Websites, Web3 tools, and trading utilities built by W3C Digital Network.",
    url: "https://web3currency.online/projects",
  };

  return (
    <PageTransition>
      <SEO
        title={`Projects | ${branding.businessName}`}
        description="Websites, Web3 tools, and trading utilities built by W3C Digital Network."
        path="/projects"
        schema={portfolioSchema}
      />

      <section className="pt-28 pb-10 md:pt-36 md:pb-12 bg-black border-b border-white/[0.06]">
        <div className="container max-w-6xl mx-auto px-6">
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-3">
            Work
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-xl">
            Live sites, internal tools, and products in progress.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8 bg-white/[0.02] border border-white/[0.06] p-1.5 rounded-full w-fit">
            {filterOptions.map((opt) => {
              const isActive = selectedProjectCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedProjectCategory(opt.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all ${
                    isActive ? "text-black font-bold" : "text-white/60 hover:text-white"
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

          <motion.div layout className="grid sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={project.href}>
                    <GlassCard className="h-full overflow-hidden p-0 border border-white/5 hover:border-primary/25 transition-all group">
                      <div className="h-44 relative overflow-hidden border-b border-white/[0.05]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          {project.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-display font-bold text-white text-lg group-hover:text-primary transition-colors">
                            {project.title}
                          </h2>
                          <span className={`text-[10px] font-mono uppercase border px-2 py-0.5 rounded-full shrink-0 ${project.statusColorClass}`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{project.oneLiner}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                          View project
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
