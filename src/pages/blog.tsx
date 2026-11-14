import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { branding } from "@/config/branding";
import { Link } from "wouter";

export default function Blog() {
  return (
    <PageTransition>
      <SEO
        title={"Blog | " + branding.businessName}
        description={"Notes, ideas and things worth sharing from " + branding.businessName + "."}
        path="/blog"
      />

      <main className="min-h-[calc(100vh-5rem)] bg-black">
        <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 pt-28 pb-20">
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
        </section>

        <section className="relative isolate overflow-hidden border-t border-white/[0.06] px-6 py-24 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.16),transparent_58%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-[#A78BFA]">
              Stay Connected.
            </h2>
            <p className="mt-5 text-lg sm:text-2xl font-semibold text-white">
              Don't miss what's happening in the community.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
              The blog is just one way to stay informed. Join the W3C Community to receive updates, discover useful insights, learn from shared experiences, and connect with people exploring Web3, crypto, AI, and digital opportunities.
            </p>
            <Link
              to="/services?tab=community"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-[#7C3AED] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(124,58,237,0.28)] transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Join the W3C Community
            </Link>
            <p className="mt-4 text-xs text-white/45">
              A place to learn, connect, and stay updated.
            </p>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}
