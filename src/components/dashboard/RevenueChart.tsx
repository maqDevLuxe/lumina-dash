import { AnimatedCard } from "./AnimatedCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4200, forecast: 4000 },
  { month: "Feb", revenue: 4800, forecast: 4300 },
  { month: "Mar", revenue: 5100, forecast: 4800 },
  { month: "Apr", revenue: 4600, forecast: 5200 },
  { month: "May", revenue: 5800, forecast: 5500 },
  { month: "Jun", revenue: 6200, forecast: 5800 },
  { month: "Jul", revenue: 7100, forecast: 6200 },
  { month: "Aug", revenue: 6800, forecast: 6800 },
  { month: "Sep", revenue: 7500, forecast: 7200 },
  { month: "Oct", revenue: 8200, forecast: 7600 },
  { month: "Nov", revenue: 7900, forecast: 8100 },
  { month: "Dec", revenue: 9100, forecast: 8500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function RevenueChart() {
  return (
    <AnimatedCard delay={0.3} className="col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue vs forecast</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon-cyan" /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon-blue" /> Forecast</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(172,66%,50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(172,66%,50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217,91%,60%)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(217,91%,60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,16%)" />
          <XAxis dataKey="month" stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(215,15%,50%)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="hsl(172,66%,50%)" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
          <Area type="monotone" dataKey="forecast" stroke="hsl(217,91%,60%)" fill="url(#foreGrad)" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
        </AreaChart>
      </ResponsiveContainer>
    </AnimatedCard>
  );
}
