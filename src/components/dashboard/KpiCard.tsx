import { AnimatedCard } from "./AnimatedCard";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  delay?: number;
  neonColor?: "cyan" | "blue" | "purple" | "pink" | "green";
}

export function KpiCard({ title, value, change, changeType, icon: Icon, delay = 0, neonColor = "cyan" }: KpiCardProps) {
  return (
    <AnimatedCard delay={delay} neonColor={neonColor}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          <p className={cn(
            "text-xs font-medium",
            changeType === "positive" && "text-neon-green",
            changeType === "negative" && "text-neon-red",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </p>
        </div>
        <div className={cn(
          "p-2.5 rounded-lg",
          neonColor === "cyan" && "bg-neon-cyan/10 text-neon-cyan",
          neonColor === "blue" && "bg-neon-blue/10 text-neon-blue",
          neonColor === "purple" && "bg-neon-purple/10 text-neon-purple",
          neonColor === "pink" && "bg-neon-pink/10 text-neon-pink",
          neonColor === "green" && "bg-neon-green/10 text-neon-green",
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </AnimatedCard>
  );
}
