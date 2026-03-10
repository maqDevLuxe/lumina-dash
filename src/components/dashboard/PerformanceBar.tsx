import { AnimatedCard } from "./AnimatedCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", pageViews: 2400, sessions: 1800 },
  { day: "Tue", pageViews: 3100, sessions: 2200 },
  { day: "Wed", pageViews: 2800, sessions: 2000 },
  { day: "Thu", pageViews: 3600, sessions: 2600 },
  { day: "Fri", pageViews: 3200, sessions: 2400 },
  { day: "Sat", pageViews: 1800, sessions: 1200 },
  { day: "Sun", pageViews: 1500, sessions: 1000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function PerformanceBar() {
  return (
    <AnimatedCard delay={0.6} neonColor="green" className="col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Weekly Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Page views & sessions this week</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon-purple" /> Views</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon-cyan" /> Sessions</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
          <XAxis dataKey="day" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="pageViews" fill="hsl(263,70%,58%)" radius={[4, 4, 0, 0]} name="Views" />
          <Bar dataKey="sessions" fill="hsl(172,66%,50%)" radius={[4, 4, 0, 0]} name="Sessions" />
        </BarChart>
      </ResponsiveContainer>
    </AnimatedCard>
  );
}
