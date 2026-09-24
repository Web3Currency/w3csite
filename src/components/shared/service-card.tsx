import { ReactNode } from "react";
import { MotionGlassCard } from "./glass-card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { getServiceBrandColor } from "@/config/theme";

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  icon: ReactNode;
  href: string;
  accentColorClass?: string; // made optional since we resolve dynamically now
  ctaText?: string;
  delay?: number;
  /** Optional "Who it's for" line, shown on Services Hub cards. */
  whoFor?: string;
  /** Optional "Primary benefit" line, shown on Services Hub cards. */
  benefit?: string;
  iconStyle?: React.CSSProperties;
  glassStyle?: boolean;
}

export function ServiceCard({ title, tagline, description, icon, href, ctaText = "Explore this pillar", delay = 0, whoFor, benefit, iconStyle, glassStyle = false }: ServiceCardProps) {
  const brand = getServiceBrandColor(title);

  return (
    <MotionGlassCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col h-full min-w-full snap-start sm:min-w-0 group rounded-2xl bg-[#0A0A0A] border border-white/[0.06] p-8 backdrop-blur-none transition-all duration-300 hover:bg-[#0E0E0E] ${brand.twBorderHover}`}
    >
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <div 
          className={`w-1.5 h-1.5 rounded-full ${brand.twDot}`} 
          style={{ boxShadow: `0 0 8px ${brand.hex}` }}
        />
      </div>
      <div 
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-colors duration-300 ${glassStyle ? "bg-white/[0.05] border-white/10" : `${brand.twBg} ${brand.twBorder} ${brand.twBgHover}`}`}
        style={iconStyle}
      >
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 text-white">{title}</h3>
      <p className={`text-sm font-medium mb-4 ${brand.twText}`}>
        {tagline}
      </p>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>

      {(whoFor || benefit) && (
        <div className="mb-6 space-y-3 border-t border-white/[0.06] pt-5">
          {whoFor && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-white/40 mb-1">Who It's For</p>
              <p className="text-sm text-white/75 leading-relaxed">{whoFor}</p>
            </div>
          )}
          {benefit && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-white/40 mb-1">Primary Benefit</p>
              <p className="text-sm text-white/75 leading-relaxed">{benefit}</p>
            </div>
          )}
        </div>
      )}

      <Link 
        href={href} 
        className={`inline-flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 mt-auto w-fit px-4 py-2 rounded-full active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${glassStyle ? "bg-white/[0.05] border border-white/10 text-white hover:bg-white/10" : "text-black hover:brightness-110"}`}
        style={glassStyle ? undefined : { backgroundColor: brand.hex }}
      >
        <span>{ctaText}</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </MotionGlassCard>
  );
}
