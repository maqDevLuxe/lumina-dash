import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { Shield, Smartphone, Monitor, Globe, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const sessions = [
  { device: "MacBook Pro", browser: "Chrome 122", location: "San Francisco, US", time: "Active now", current: true, icon: Monitor },
  { device: "iPhone 15 Pro", browser: "Safari 17", location: "San Francisco, US", time: "2 hours ago", current: false, icon: Smartphone },
  { device: "Windows Desktop", browser: "Firefox 124", location: "New York, US", time: "1 day ago", current: false, icon: Monitor },
];

const securitySettings = [
  { title: "Two-Factor Authentication", description: "Add an extra layer of security", enabled: true },
  { title: "Login Notifications", description: "Get notified of new sign-ins", enabled: true },
  { title: "Suspicious Activity Alerts", description: "Detect unauthorized access attempts", enabled: true },
  { title: "Session Timeout", description: "Auto-logout after 30 minutes of inactivity", enabled: false },
];

export default function SecurityPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Security</h1>
          <p className="text-sm text-muted-foreground">Manage your security preferences and active sessions</p>
        </motion.div>

        <AnimatedCard delay={0.1} neonColor="green">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-neon-green" />
            <h3 className="text-sm font-semibold text-foreground">Security Score: Excellent</h3>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-neon-green h-2 rounded-full" style={{ width: "92%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">92/100 — Enable session timeout to reach 100</p>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Security Settings</h3>
          <div className="space-y-4">
            {securitySettings.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${s.enabled ? "bg-primary" : "bg-secondary"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${s.enabled ? "translate-x-5 bg-primary-foreground" : "translate-x-0.5 bg-muted-foreground"}`} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.3} neonColor="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.device} · {s.browser}</p>
                    <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                  </div>
                </div>
                {s.current ? (
                  <span className="text-[10px] font-medium text-neon-green bg-neon-green/10 px-2 py-0.5 rounded-full">Current</span>
                ) : (
                  <button className="text-xs text-muted-foreground hover:text-neon-red transition-colors">Revoke</button>
                )}
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
