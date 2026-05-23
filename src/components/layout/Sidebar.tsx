"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  BarChart3,
  CheckSquare,
  Settings,
  HelpCircle,
  ChevronRight,
  CalendarDays,
  Library,
  Brain,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users, badge: 3 },
  { label: "Conteúdo", href: "/conteudo", icon: FileText },
  { label: "Calendario", href: "/calendario", icon: CalendarDays },
  { label: "Templates", href: "/templates", icon: Library },
  { label: "Memoria", href: "/memoria", icon: Brain },
  { label: "Publicacoes", href: "/publicacoes", icon: Send },
  { label: "Crise", href: "/crise", icon: AlertTriangle, badge: 1 },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Checagem", href: "/checagem", icon: CheckSquare },
];

const secondaryItems = [
  { label: "Configurações", href: "/configuracoes", icon: Settings },
  { label: "Suporte", href: "/suporte", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40",
        "w-[260px] flex flex-col",
        "bg-navy-900 border-r border-white/06",
        "shadow-[4px_0_24px_rgba(2,8,20,0.5)]"
      )}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/06">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-[0_2px_12px_rgba(201,168,76,0.4)]">
            <span className="text-navy-950 font-display font-bold text-sm">T</span>
          </div>
          <div>
            <p className="text-white font-display font-semibold text-sm leading-none">
              Trezze
            </p>
            <p className="text-gold-500 text-[10px] font-medium tracking-[0.15em] uppercase mt-0.5">
              Command Center
            </p>
          </div>
        </div>
      </div>

      {/* Workspace indicator */}
      <div className="px-4 py-3 border-b border-white/06">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/04 hover:bg-white/07 transition-colors duration-200 group">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">AC</span>
            </div>
            <span className="text-white/70 text-xs font-medium">Acme Corp</span>
          </div>
          <ChevronRight size={12} className="text-white/30 group-hover:text-white/50 transition-colors" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-1">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 mb-2">
            Menu principal
          </p>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg",
                      "text-sm font-medium font-body transition-all duration-200",
                      "group relative",
                      isActive
                        ? "bg-gold-500/12 text-gold-400 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.2)]"
                        : "text-white/50 hover:text-white/80 hover:bg-white/05"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-gold-500" />
                    )}
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={16}
                        className={cn(
                          "transition-colors",
                          isActive ? "text-gold-400" : "text-white/35 group-hover:text-white/60"
                        )}
                      />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          "min-w-[18px] h-[18px] flex items-center justify-center",
                          "text-[10px] font-bold rounded-full px-1",
                          item.label === "Crise"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gold-500/20 text-gold-400"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divider */}
        <div className="gold-divider mx-3 my-4" />

        <div>
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 mb-2">
            Sistema
          </p>
          <ul className="space-y-0.5">
            {secondaryItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      "text-sm font-medium font-body transition-all duration-200",
                      isActive
                        ? "bg-white/08 text-white/90"
                        : "text-white/40 hover:text-white/70 hover:bg-white/05"
                    )}
                  >
                    <item.icon size={16} className="text-white/30" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/06">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/05 transition-colors cursor-pointer group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500/80 to-gold-700/80 flex items-center justify-center">
              <span className="text-navy-950 text-xs font-bold">MA</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-navy-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-medium truncate">Maria Andrade</p>
            <p className="text-white/35 text-[10px] truncate">Diretora Executiva</p>
          </div>
          <Settings size={13} className="text-white/20 group-hover:text-white/40 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
