import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { motion } from "framer-motion";
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
          <p className="text-primary/70 text-xs font-mono uppercase tracking-[0.3em] mb-4">
            Blog
          </p>
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
