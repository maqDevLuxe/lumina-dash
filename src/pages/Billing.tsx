import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { CheckCircle, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For individuals and small projects",
    features: ["10K API requests/mo", "5 dashboards", "Email support", "Basic analytics"],
    current: false,
    neon: "blue" as const,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/mo",
    description: "For growing teams and businesses",
    features: ["100K API requests/mo", "Unlimited dashboards", "Priority support", "Predictive AI models", "Data export"],
    current: true,
    neon: "cyan" as const,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/mo",
    description: "For large organizations",
    features: ["Unlimited API requests", "Custom integrations", "Dedicated support", "SLA guarantee", "SSO/SAML", "Audit logs"],
    current: false,
    neon: "purple" as const,
  },
];

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1100px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Billing & Plans</h1>
          <p className="text-sm text-muted-foreground">Manage your subscription and billing information</p>
        </motion.div>

        {/* Usage */}
        <AnimatedCard delay={0.1}>
          <h3 className="text-sm font-semibold text-foreground mb-3">Current Usage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "API Requests", used: "67,842", total: "100,000", pct: 68 },
              { label: "Storage", used: "4.2 GB", total: "10 GB", pct: 42 },
              { label: "Team Members", used: "8", total: "15", pct: 53 },
            ].map((u) => (
              <div key={u.label} className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">{u.label}</span><span className="text-foreground font-medium">{u.used} / {u.total}</span></div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${u.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <AnimatedCard key={plan.name} delay={0.2 + i * 0.08} neonColor={plan.neon} className={plan.current ? "neon-border" : ""}>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                    {plan.current && <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-neon-green shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${plan.current ? "bg-secondary text-secondary-foreground cursor-default" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  {plan.current ? "Current Plan" : "Upgrade"}
                </button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
