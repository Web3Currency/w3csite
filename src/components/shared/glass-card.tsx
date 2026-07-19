import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 transition-colors duration-300 hover:bg-white/[0.05]",
        className
      )} 
      {...props} 
    />
  );
}

export function MotionGlassCard({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div 
      className={cn(
        "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 transition-colors duration-300 hover:bg-white/[0.05]",
        className
      )} 
      {...props} 
    />
  );
}