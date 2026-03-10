import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Building, Calendar, Edit3 } from "lucide-react";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your personal information</p>
        </motion.div>

        <AnimatedCard delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-semibold text-secondary-foreground shrink-0">
              JD
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">John Doe</h2>
                  <p className="text-sm text-muted-foreground">Senior Data Analyst</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: Mail, label: "Email", value: "john.doe@pulse.io" },
                  { icon: Building, label: "Company", value: "Pulse Analytics Inc." },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                  { icon: Calendar, label: "Joined", value: "January 2024" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 text-muted-foreground">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <div><p className="text-[10px] uppercase tracking-wider font-medium">{item.label}</p><p className="text-foreground">{item.value}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2} neonColor="blue">
          <h3 className="text-sm font-semibold text-foreground mb-3">Bio</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experienced data analyst with 8+ years specializing in business intelligence, predictive modeling, and real-time analytics. 
            Passionate about transforming complex datasets into actionable insights that drive strategic decision-making.
          </p>
        </AnimatedCard>

        <AnimatedCard delay={0.3} neonColor="purple">
          <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "SQL", "Machine Learning", "Data Visualization", "Statistical Analysis", "Apache Spark", "TensorFlow", "Tableau"].map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">{s}</span>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
