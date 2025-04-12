
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  FileText, 
  Home, 
  Settings, 
  ShieldAlert, 
  MessageSquare,
  PlusCircle
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, href, isActive }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-primary/10",
        isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: <Home size={18} />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <ShieldAlert size={18} />,
      label: "Risk Assessment",
      href: "/assessment",
    },
    {
      icon: <FileText size={18} />,
      label: "Reports",
      href: "/reports",
    },
    {
      icon: <BarChart3 size={18} />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "AI Assistant",
      href: "/assistant",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="border-r bg-background md:w-64 md:flex-shrink-0">
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Aura Risk Genie</span>
          </div>
        </div>
        <div className="p-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={
                  item.href === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.href)
                }
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
