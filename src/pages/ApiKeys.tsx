import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnimatedCard } from "@/components/dashboard/AnimatedCard";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Copy, Eye, EyeOff, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const initialKeys = [
  { name: "Production API Key", key: "pk_live_4f8a2b1c9d3e7f6a", created: "Jan 15, 2026", lastUsed: "2 min ago", status: "active" },
  { name: "Staging API Key", key: "pk_test_8b2c4d6e1f3a5c7d", created: "Feb 1, 2026", lastUsed: "3 hours ago", status: "active" },
  { name: "Development Key", key: "pk_dev_2d4f6a8c0e1b3d5f", created: "Mar 1, 2026", lastUsed: "1 day ago", status: "active" },
  { name: "Legacy Integration", key: "pk_old_9a7b5c3d1e0f2g4h", created: "Nov 10, 2025", lastUsed: "30 days ago", status: "deprecated" },
];

const generateRandomKey = () => {
  const chars = "abcdef0123456789";
  return "pk_live_" + Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function ApiKeysPage() {
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [keyPermission, setKeyPermission] = useState("read");
  const [keys, setKeys] = useState(initialKeys);

  const handleCreate = () => {
    if (!keyName.trim()) return;
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    setKeys(prev => [
      { name: keyName, key: generateRandomKey(), created: dateStr, lastUsed: "Just now", status: "active" },
      ...prev,
    ]);
    setKeyName("");
    setKeyPermission("read");
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">API Keys</h1>
            <p className="text-sm text-muted-foreground">Manage your API keys and access tokens</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />Generate Key
          </button>
        </motion.div>

        <div className="space-y-3">
          {keys.map((k, i) => (
            <motion.div key={k.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
              <AnimatedCard delay={0} neonColor={k.status === "deprecated" ? "pink" : "cyan"}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary shrink-0"><Key className="h-4 w-4 text-muted-foreground" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{k.name}</p>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${k.status === "active" ? "bg-neon-green/10 text-neon-green" : "bg-neon-orange/10 text-neon-orange"}`}>{k.status}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs font-mono text-muted-foreground">
                          {visible[i] ? k.key : k.key.slice(0, 8) + "•".repeat(12)}
                        </code>
                        <button onClick={() => setVisible(v => ({ ...v, [i]: !v[i] }))} className="text-muted-foreground hover:text-foreground transition-colors">
                          {visible[i] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors"><Copy className="h-3 w-3" /></button>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Created {k.created} · Last used {k.lastUsed}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-neon-red transition-colors self-end sm:self-center">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate Key Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-xl bg-card border border-border p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-foreground">Generate New API Key</h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Key Name</label>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="e.g. Production API Key"
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Permissions</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "read", label: "Read Only" },
                      { value: "write", label: "Read/Write" },
                      { value: "admin", label: "Full Access" },
                    ].map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setKeyPermission(p.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          keyPermission === p.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Expiration</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-ring transition-shadow">
                    <option>Never</option>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>1 year</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!keyName.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
