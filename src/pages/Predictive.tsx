import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ZAxis } from "recharts";
import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const forecastData = Array.from({ length: 24 }, (_, i) => ({
  month: `M${i + 1}`,
  actual: i < 12 ? 4000 + Math.sin(i / 2) * 1500 + i * 300 : undefined,
  predicted: i >= 10 ? 4000 + Math.sin(i / 2) * 1500 + i * 300 + (i - 10) * 200 : undefined,
  upperBound: i >= 10 ? 4000 + Math.sin(i / 2) * 1500 + i * 300 + (i - 10) * 200 + 800 : undefined,
  lowerBound: i >= 10 ? 4000 + Math.sin(i / 2) * 1500 + i * 300 + (i - 10) * 200 - 600 : undefined,
}));

const anomalyData = Array.from({ length: 50 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 400 + 50,
  anomaly: Math.random() > 0.85,
}));

const models = [
  { name: "Revenue Forecast", accuracy: "94.2%", status: "active", lastRun: "2m ago" },
  { name: "Churn Prediction", accuracy: "89.7%", status: "active", lastRun: "15m ago" },
  { name: "Demand Forecasting", accuracy: "91.3%", status: "training", lastRun: "1h ago" },
  { name: "Anomaly Detection", accuracy: "96.1%", status: "active", lastRun: "Real-time" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.filter((e: any) => e.value != null).map((e: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: e.color }}>{e.name}: {typeof e.value === 'number' ? e.value.toLocaleString() : e.value}</p>
      ))}
    </div>
  );
};

export default function PredictivePage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Predictive AI Models</h1>
          <p className="text-sm text-muted-foreground">Machine learning insights and forecasting</p>
        </motion.div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((m, i) => (
            <AnimatedCard key={m.name} delay={0.05 + i * 0.05} neonColor={i === 0 ? "cyan" : i === 1 ? "blue" : i === 2 ? "purple" : "green"}>
              <div className="flex items-start justify-between mb-3">
                <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${m.status === "active" ? "bg-neon-green/10 text-neon-green" : "bg-neon-yellow/10 text-neon-yellow"}`}>
                  {m.status}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-2xl font-semibold text-foreground mt-1">{m.accuracy}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Last run: {m.lastRun}</p>
            </AnimatedCard>
          ))}
        </div>

        {/* Forecast Chart */}
        <AnimatedCard delay={0.3} neonColor="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-1">Revenue Forecast — 24 Month Projection</h3>
          <p className="text-xs text-muted-foreground mb-4">Actual data (solid) vs ML prediction (dashed) with confidence interval</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(172,66%,50%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(172,66%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
              <XAxis dataKey="month" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#confGrad)" name="Upper Bound" />
              <Area type="monotone" dataKey="lowerBound" stroke="none" fill="transparent" name="Lower Bound" />
              <Line type="monotone" dataKey="actual" stroke="hsl(172,66%,50%)" strokeWidth={2} dot={false} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(263,70%,58%)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
        </AnimatedCard>

        {/* Anomaly Detection */}
        <AnimatedCard delay={0.5} neonColor="pink">
          <h3 className="text-sm font-semibold text-foreground mb-1">Anomaly Detection</h3>
          <p className="text-xs text-muted-foreground mb-4">Real-time outlier identification across metrics</p>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
              <XAxis dataKey="x" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} name="Metric A" />
              <YAxis dataKey="y" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} name="Metric B" />
              <ZAxis dataKey="z" range={[30, 200]} />
              <Tooltip content={<ChartTooltip />} />
              <Scatter data={anomalyData.filter(d => !d.anomaly)} fill="hsl(217,91%,60%)" opacity={0.6} name="Normal" />
              <Scatter data={anomalyData.filter(d => d.anomaly)} fill="hsl(0,84%,60%)" opacity={0.9} name="Anomaly" />
            </ScatterChart>
          </ResponsiveContainer>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
