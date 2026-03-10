import { AnimatedCard } from "./AnimatedCard";
import { motion } from "framer-motion";

const activities = [
  { user: "Sarah Chen", action: "deployed v2.4.1 to production", time: "2m ago", avatar: "SC" },
  { user: "Alex Rivera", action: "merged PR #847 — API rate limiting", time: "14m ago", avatar: "AR" },
  { user: "Jordan Lee", action: "updated billing integration", time: "38m ago", avatar: "JL" },
  { user: "Morgan Wu", action: "resolved incident INC-2847", time: "1h ago", avatar: "MW" },
  { user: "Casey Park", action: "created new API endpoint /v3/analytics", time: "2h ago", avatar: "CP" },
];

export function ActivityFeed() {
  return (
    <AnimatedCard delay={0.5} neonColor="blue" className="col-span-full lg:col-span-1">
      <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4 scrollbar-thin max-h-[320px] overflow-y-auto pr-1">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold text-secondary-foreground shrink-0">
              {item.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-foreground leading-snug">
                <span className="font-medium">{item.user}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedCard>
  );
}
