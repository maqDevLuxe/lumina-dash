import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Info, ShieldAlert } from "lucide-react";

const notifications = [
  { id: 1, type: "success", title: "Deployment Complete", desc: "v2.4.1 deployed to production", time: "2m ago", icon: CheckCircle2 },
  { id: 2, type: "warning", title: "High CPU Usage", desc: "Server US-East-1 at 92% capacity", time: "15m ago", icon: AlertTriangle },
  { id: 3, type: "info", title: "New Team Member", desc: "Sarah joined the Analytics team", time: "1h ago", icon: Info },
  { id: 4, type: "error", title: "API Rate Limit", desc: "Endpoint /v2/data exceeded threshold", time: "2h ago", icon: ShieldAlert },
  { id: 5, type: "success", title: "Backup Completed", desc: "Daily backup finished successfully", time: "3h ago", icon: CheckCircle2 },
];

const typeStyles: Record<string, string> = {
  success: "text-neon-green bg-neon-green/10",
  warning: "text-neon-yellow bg-neon-yellow/10",
  info: "text-neon-blue bg-neon-blue/10",
  error: "text-neon-red bg-neon-red/10",
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0">
                  <div className={`p-1.5 rounded-lg mt-0.5 ${typeStyles[n.type]}`}>
                    <n.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-1">{n.time}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-border">
              <button className="w-full text-xs text-center text-primary hover:text-primary/80 font-medium transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
