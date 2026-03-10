import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Info, XCircle, Settings } from "lucide-react";

const notifications = [
  { title: "Deployment successful", message: "v3.2.1 has been deployed to production across all regions.", type: "success", time: "2 min ago", read: false },
  { title: "High memory usage detected", message: "Server node-07 memory usage exceeded 90% threshold.", type: "warning", time: "18 min ago", read: false },
  { title: "New team invitation", message: "You've been invited to join the Data Science workspace.", type: "info", time: "1 hour ago", read: false },
  { title: "Failed API request spike", message: "429 error rate increased by 340% in the last 15 minutes.", type: "error", time: "2 hours ago", read: true },
  { title: "SSL certificate renewed", message: "Certificate for *.pulse-analytics.io renewed successfully.", type: "success", time: "4 hours ago", read: true },
  { title: "Scheduled maintenance", message: "Database maintenance window: March 12, 02:00-04:00 UTC.", type: "info", time: "6 hours ago", read: true },
  { title: "Billing threshold reached", message: "API usage has reached 80% of your monthly plan limit.", type: "warning", time: "1 day ago", read: true },
];

const iconMap = { success: CheckCircle, warning: AlertTriangle, error: XCircle, info: Info };
const colorMap = { success: "text-neon-green", warning: "text-neon-orange", error: "text-neon-red", info: "text-neon-blue" };
const bgMap = { success: "bg-neon-green/10", warning: "bg-neon-orange/10", error: "bg-neon-red/10", info: "bg-neon-blue/10" };

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground">Alerts and system notifications</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </motion.div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type as keyof typeof iconMap];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                <AnimatedCard delay={0} className={`${!n.read ? "neon-border" : ""}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${bgMap[n.type as keyof typeof bgMap]}`}>
                      <Icon className={`h-4 w-4 ${colorMap[n.type as keyof typeof colorMap]}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
