import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TrafficDonut } from "@/components/dashboard/TrafficDonut";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PerformanceBar } from "@/components/dashboard/PerformanceBar";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";
import { DollarSign, Users, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-muted-foreground">Real-time business intelligence at a glance</p>
          </div>
          <LiveIndicator />
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Revenue" value="$84,254" change="↑ 12.5% from last month" changeType="positive" icon={DollarSign} delay={0.05} neonColor="cyan" />
          <KpiCard title="Active Users" value="12,847" change="↑ 8.2% from last week" changeType="positive" icon={Users} delay={0.1} neonColor="blue" />
          <KpiCard title="Conversion Rate" value="3.24%" change="↓ 0.4% from last month" changeType="negative" icon={TrendingUp} delay={0.15} neonColor="purple" />
          <KpiCard title="API Requests" value="1.2M" change="↑ 24.1% from last month" changeType="positive" icon={Zap} delay={0.2} neonColor="green" />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart />
          <TrafficDonut />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PerformanceBar />
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
