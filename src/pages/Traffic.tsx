import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { motion } from "framer-motion";
import { Globe, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

const sourceData = [
  { source: "Google", visits: 42500, conversion: 3.8, trend: "up" },
  { source: "Direct", visits: 28300, conversion: 4.2, trend: "up" },
  { source: "Facebook", visits: 18700, conversion: 2.1, trend: "down" },
  { source: "Twitter/X", visits: 12400, conversion: 1.9, trend: "up" },
  { source: "LinkedIn", visits: 9800, conversion: 5.1, trend: "up" },
  { source: "Reddit", visits: 6200, conversion: 2.8, trend: "down" },
];

const channelData = [
  { name: "Organic Search", value: 42, color: "hsl(172,66%,50%)" },
  { name: "Paid Search", value: 18, color: "hsl(217,91%,60%)" },
  { name: "Social Media", value: 22, color: "hsl(263,70%,58%)" },
  { name: "Email", value: 11, color: "hsl(330,81%,60%)" },
  { name: "Referral", value: 7, color: "hsl(25,95%,53%)" },
];

const trendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  organic: 1200 + Math.sin(i / 3) * 400 + i * 20,
  paid: 600 + Math.cos(i / 4) * 200 + i * 10,
  social: 400 + Math.sin(i / 2) * 150 + i * 8,
}));

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: e.color }}>{e.name}: {e.value.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function TrafficPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Traffic Sources</h1>
          <p className="text-sm text-muted-foreground">Analyze where your visitors are coming from</p>
        </motion.div>

        {/* Source Table */}
        <AnimatedCard delay={0.1}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Sources</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2.5 font-medium">Source</th>
                  <th className="text-right py-2.5 font-medium">Visits</th>
                  <th className="text-right py-2.5 font-medium">Conversion</th>
                  <th className="text-right py-2.5 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {sourceData.map((s, i) => (
                  <motion.tr key={s.source} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }} className="border-b border-border/50 last:border-0">
                    <td className="py-3 flex items-center gap-2 text-foreground font-medium"><Globe className="h-3.5 w-3.5 text-muted-foreground" />{s.source}</td>
                    <td className="py-3 text-right text-foreground">{s.visits.toLocaleString()}</td>
                    <td className="py-3 text-right text-foreground">{s.conversion}%</td>
                    <td className="py-3 text-right">{s.trend === "up" ? <TrendingUp className="h-4 w-4 text-neon-green inline" /> : <TrendingDown className="h-4 w-4 text-neon-red inline" />}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Channel Breakdown */}
          <AnimatedCard delay={0.3} neonColor="purple">
            <h3 className="text-sm font-semibold text-foreground mb-4">Channel Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {channelData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {channelData.map((c) => (
                <div key={c.name} className="flex justify-between text-xs">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} /><span className="text-muted-foreground">{c.name}</span></span>
                  <span className="font-medium text-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Trend Line */}
          <AnimatedCard delay={0.4} neonColor="cyan">
            <h3 className="text-sm font-semibold text-foreground mb-4">30-Day Traffic Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
                <XAxis dataKey="day" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="organic" stroke="hsl(172,66%,50%)" strokeWidth={2} dot={false} name="Organic" />
                <Line type="monotone" dataKey="paid" stroke="hsl(217,91%,60%)" strokeWidth={2} dot={false} name="Paid" />
                <Line type="monotone" dataKey="social" stroke="hsl(263,70%,58%)" strokeWidth={2} dot={false} name="Social" />
              </LineChart>
            </ResponsiveContainer>
          </AnimatedCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
