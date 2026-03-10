import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, AlertCircle, CheckCircle, Clock, Zap, Server, Users } from "lucide-react";

const events = [
  { time: "09:42 AM", title: "Production deployment v3.2.1", description: "Successfully deployed 14 microservices", icon: Zap, color: "text-neon-green", type: "deploy" },
  { time: "09:38 AM", title: "Pull request #892 merged", description: "Feature: Real-time collaboration engine", icon: GitPullRequest, color: "text-neon-blue", type: "merge" },
  { time: "09:15 AM", title: "Incident INC-3021 resolved", description: "Database connection pool exhaustion — root cause: missing index", icon: CheckCircle, color: "text-neon-green", type: "resolve" },
  { time: "08:47 AM", title: "Alert: CPU usage spike detected", description: "Node cluster-04 reached 94% CPU for 3 minutes", icon: AlertCircle, color: "text-neon-orange", type: "alert" },
  { time: "08:30 AM", title: "New team member onboarded", description: "Maya Patel joined the Platform Engineering team", icon: Users, color: "text-neon-purple", type: "team" },
  { time: "08:12 AM", title: "Scheduled maintenance completed", description: "PostgreSQL version upgrade from 15.2 to 16.1", icon: Server, color: "text-neon-cyan", type: "maintenance" },
  { time: "07:55 AM", title: "Commit 4f8a2b1", description: "Refactored authentication middleware for OAuth2.1", icon: GitCommit, color: "text-muted-foreground", type: "commit" },
  { time: "07:30 AM", title: "Daily backup completed", description: "Full database snapshot — 2.4TB compressed", icon: CheckCircle, color: "text-neon-green", type: "backup" },
];

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Activity Timeline</h1>
          <p className="text-sm text-muted-foreground">Chronological feed of system events and actions</p>
        </motion.div>

        <AnimatedCard delay={0.1}>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="relative flex gap-4 pl-1"
                >
                  <div className={`relative z-10 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0`}>
                    <event.icon className={`h-4 w-4 ${event.color}`} />
                  </div>
                  <div className="pb-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{event.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
