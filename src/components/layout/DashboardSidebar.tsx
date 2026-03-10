import {
  LayoutDashboard, Activity, Globe, BrainCircuit, Clock, Bell, Download,
  User, Shield, Key, CreditCard, LogIn, UserPlus, Mail, KeyRound, Hash,
  AlertTriangle, ServerCrash, Construction, ChevronLeft
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const navGroups = [
  {
    label: "Dashboards",
    items: [
      { title: "Overview", url: "/", icon: LayoutDashboard },
      { title: "Traffic Sources", url: "/traffic", icon: Globe },
      { title: "Predictive AI", url: "/predictive", icon: BrainCircuit },
    ],
  },
  {
    label: "Apps",
    items: [
      { title: "Activity Timeline", url: "/activity", icon: Clock },
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Data Export", url: "/export", icon: Download },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Security", url: "/security", icon: Shield },
      { title: "API Keys", url: "/api-keys", icon: Key },
      { title: "Billing", url: "/billing", icon: CreditCard },
    ],
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-5">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground tracking-tight">Pulse</p>
              <p className="text-[10px] text-muted-foreground">Analytics Engine</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              {!collapsed && group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentPath === item.url}
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        end
                        className="text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="rounded-lg bg-secondary/50 p-3">
            <p className="text-[10px] font-medium text-muted-foreground">SYSTEM STATUS</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
              <span className="text-xs text-foreground">All systems operational</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
