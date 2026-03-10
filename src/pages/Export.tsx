import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, FileJson, FileText, Calendar, Filter } from "lucide-react";

const exports = [
  { name: "Revenue Report Q4 2025", format: "CSV", size: "2.4 MB", date: "Mar 5, 2026", status: "ready" },
  { name: "User Analytics — Full Year", format: "JSON", size: "18.7 MB", date: "Mar 3, 2026", status: "ready" },
  { name: "Traffic Sources Breakdown", format: "CSV", size: "890 KB", date: "Mar 1, 2026", status: "ready" },
  { name: "Predictive Model Results", format: "JSON", size: "5.2 MB", date: "Feb 28, 2026", status: "processing" },
  { name: "API Usage Logs", format: "CSV", size: "34.1 MB", date: "Feb 25, 2026", status: "ready" },
  { name: "Compliance Audit Report", format: "PDF", size: "1.1 MB", date: "Feb 20, 2026", status: "ready" },
];

const formatIcon = { CSV: FileSpreadsheet, JSON: FileJson, PDF: FileText };

export default function ExportPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Data Export</h1>
            <p className="text-sm text-muted-foreground">Download and manage exported reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />New Export
          </button>
        </motion.div>

        <AnimatedCard delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs">
                  <th className="text-left py-2.5 font-medium">Report Name</th>
                  <th className="text-left py-2.5 font-medium">Format</th>
                  <th className="text-right py-2.5 font-medium">Size</th>
                  <th className="text-right py-2.5 font-medium">Date</th>
                  <th className="text-right py-2.5 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {exports.map((e, i) => {
                  const FIcon = formatIcon[e.format as keyof typeof formatIcon] || FileText;
                  return (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }} className="border-b border-border/50 last:border-0">
                      <td className="py-3 text-foreground font-medium">{e.name}</td>
                      <td className="py-3"><span className="flex items-center gap-1.5 text-muted-foreground"><FIcon className="h-3.5 w-3.5" />{e.format}</span></td>
                      <td className="py-3 text-right text-muted-foreground">{e.size}</td>
                      <td className="py-3 text-right text-muted-foreground">{e.date}</td>
                      <td className="py-3 text-right">
                        {e.status === "ready" ? (
                          <button className="text-primary hover:text-primary/80 transition-colors"><Download className="h-4 w-4 inline" /></button>
                        ) : (
                          <span className="text-[10px] text-neon-yellow font-medium">Processing...</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
