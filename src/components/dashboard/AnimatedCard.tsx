import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  neonColor?: "cyan" | "blue" | "purple" | "pink" | "green";
}

const glowMap = {
  cyan: "hover:shadow-[0_0_20px_hsl(172_66%_50%/0.15)]",
  blue: "hover:shadow-[0_0_20px_hsl(217_91%_60%/0.15)]",
  purple: "hover:shadow-[0_0_20px_hsl(263_70%_58%/0.15)]",
  pink: "hover:shadow-[0_0_20px_hsl(330_81%_60%/0.15)]",
  green: "hover:shadow-[0_0_20px_hsl(142_71%_45%/0.15)]",
};

export function AnimatedCard({ children, className, delay = 0, neonColor = "cyan" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "rounded-lg bg-card border border-border p-5 transition-shadow duration-300",
        glowMap[neonColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
