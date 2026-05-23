"use client";

import { Bell, Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Visão executiva em tempo real" },
  "/clientes": { title: "Clientes", subtitle: "Gestão de carteira e relacionamentos" },
  "/conteudo": { title: "Conteúdo", subtitle: "Produção e publicação editorial" },
  "/crise": { title: "Gestão de Crise", subtitle: "Monitoramento e resposta rápida" },
  "/relatorios": { title: "Relatórios", subtitle: "Análise e inteligência estratégica" },
  "/checagem": { title: "Checagem", subtitle: "Verificação e fact-checking" },
};

export default function Navbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Trezze", subtitle: "Command Center" };

  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30",
        "h-16 flex items-center",
        "border-b border-white/06",
        "bg-navy-900/80 backdrop-blur-xl",
        "pl-[260px] pr-6 w-full",
        "shadow-[0_1px_0_rgba(255,255,255,0.04)]"
      )}
    >
      {/* Page info */}
      <div className="flex-1 pl-6">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-white font-display text-base font-semibold leading-none">
              {page.title}
            </h2>
            <p className="text-white/35 text-[11px] font-body mt-0.5 capitalize">{dateStr}</p>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/05 border border-white/08 text-white/40 hover:bg-white/08 hover:text-white/70 transition-all duration-200 group">
          <Search size={13} />
          <span className="text-xs hidden sm:block">Buscar</span>
          <div className="hidden sm:flex items-center gap-0.5 ml-2">
            <kbd className="text-[9px] bg-white/06 px-1 py-0.5 rounded border border-white/10 font-mono">
              <Command size={8} className="inline" />
            </kbd>
            <kbd className="text-[9px] bg-white/06 px-1 py-0.5 rounded border border-white/10 font-mono">K</kbd>
          </div>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/05 border border-white/08 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all duration-200">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        </button>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 pl-2 ml-1 border-l border-white/08">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/08 border border-emerald-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-emerald-400 text-[10px] font-medium">Sistema operacional</span>
          </div>
        </div>
      </div>
    </header>
  );
}
