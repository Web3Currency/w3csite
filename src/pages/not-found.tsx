import { Link } from "wouter";
import { AlertCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { SEO } from "@/components/shared/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden px-6">
      <SEO title="Page Not Found | W3C Digital Network" description="This page could not be found." />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-black to-black opacity-40" />
        <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
      </div>
      <GlassCard className="w-full max-w-md relative z-10 text-center border-white/10 bg-white/[0.02] p-10">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          This page doesn't exist, or may have moved. Let's get you back to the network.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Back to Home
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </GlassCard>
    </div>
  );
}
