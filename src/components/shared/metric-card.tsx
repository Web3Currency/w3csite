import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "./glass-card";

interface MetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export function MetricCard({ label, value, prefix = "", suffix = "", duration = 2, delay = 0 }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeOut * value));

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard className="text-center py-8">
        <div className="text-4xl sm:text-5xl font-display font-bold text-white mb-2 tracking-tight">
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </GlassCard>
    </motion.div>
  );
}