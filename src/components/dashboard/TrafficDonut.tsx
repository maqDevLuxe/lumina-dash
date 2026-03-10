import { AnimatedCard } from "./AnimatedCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Direct", value: 35, color: "hsl(172,66%,50%)" },
  { name: "Organic", value: 28, color: "hsl(217,91%,60%)" },
  { name: "Referral", value: 18, color: "hsl(263,70%,58%)" },
  { name: "Social", value: 12, color: "hsl(330,81%,60%)" },
  { name: "Paid", value: 7, color: "hsl(25,95%,53%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg">
      <p className="text-xs font-medium text-foreground">{payload[0].name}: {payload[0].value}%</p>
    </div>
  );
};

export function TrafficDonut() {
  return (
    <AnimatedCard delay={0.4} neonColor="purple">
      <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Sources</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" strokeWidth={0}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </span>
            <span className="font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
