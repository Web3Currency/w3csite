import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { branding } from "@/config/branding";

export default function Blog() {
  return (
    <PageTransition>
      <SEO
        title={"Blog | " + branding.businessName}
        description={"Notes, ideas and things worth sharing from " + branding.businessName + "."}
        path="/blog"
      />

      <main className="min-h-[calc(100vh-5rem)] bg-black flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <Newspaper
            aria-hidden="true"
            strokeWidth={1}
            className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-8 text-white/[0.05]"
          />
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Nothing to read here. Yet.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Check back. We might have something.
          </p>
        </motion.div>
      </main>
    </PageTransition>
  );
}
