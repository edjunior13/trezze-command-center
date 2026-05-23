import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const clients = [
  { id: "1", name: "Nexus Energia", sector: "Energia", status: "active", score: 98, since: "2022" },
  { id: "2", name: "Banco Meridian", sector: "Financeiro", status: "active", score: 91, since: "2021" },
  { id: "3", name: "TechVision BR", sector: "Tecnologia", status: "at-risk", score: 62, since: "2023" },
  { id: "4", name: "Grupo Alvorada", sector: "Varejo", status: "active", score: 87, since: "2020" },
  { id: "5", name: "ConstruMap", sector: "Construção", status: "paused", score: 74, since: "2023" },
];

const statusMap = {
  active: { variant: "success" as const, label: "Ativo" },
  "at-risk": { variant: "danger" as const, label: "Em risco" },
  paused: { variant: "warning" as const, label: "Pausado" },
};

export default function ClientsTable() {
  return (
    <div>
      <div className="space-y-1">
        {clients.map((client, i) => (
          <div
            key={client.id}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-lg",
              "hover:bg-white/04 transition-colors duration-150 cursor-pointer group",
              i % 2 === 0 ? "" : "bg-white/02"
            )}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-600 to-navy-700 border border-white/08 flex items-center justify-center flex-shrink-0">
              <span className="text-white/60 text-[10px] font-bold">
                {client.name.slice(0, 2).toUpperCase()}
              </span>
            </div>

            {/* Name + sector */}
            <div className="flex-1 min-w-0">
              <p className="text-white/85 text-sm font-medium truncate">{client.name}</p>
              <p className="text-white/35 text-[11px]">{client.sector} · desde {client.since}</p>
            </div>

            {/* Score bar */}
            <div className="hidden sm:flex items-center gap-2 w-24">
              <div className="flex-1 h-1 bg-white/08 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    client.score >= 85
                      ? "bg-emerald-400"
                      : client.score >= 70
                      ? "bg-gold-500"
                      : "bg-red-400"
                  )}
                  style={{ width: `${client.score}%` }}
                />
              </div>
              <span className="text-white/40 text-[10px] w-6 text-right">{client.score}</span>
            </div>

            {/* Status */}
            <Badge variant={statusMap[client.status as keyof typeof statusMap].variant} dot>
              {statusMap[client.status as keyof typeof statusMap].label}
            </Badge>

            <ArrowRight size={13} className="text-white/15 group-hover:text-white/40 transition-colors" />
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-white/06 text-center">
        <Link
          href="/clientes"
          className="text-gold-500 text-xs font-medium hover:text-gold-300 transition-colors"
        >
          Ver todos os clientes →
        </Link>
      </div>
    </div>
  );
}
