import { cn } from "@/lib/utils";
import { FileText, Users, BarChart3, AlertTriangle, Settings, Clock } from "lucide-react";

const activities = [
  {
    id: "1",
    action: "Relatório Q2 2025 publicado",
    user: "Maria Andrade",
    time: "há 12 min",
    type: "report",
  },
  {
    id: "2",
    action: "Novo cliente adicionado: Grupo Nexus",
    user: "Carlos Lima",
    time: "há 48 min",
    type: "client",
  },
  {
    id: "3",
    action: "Alerta de crise detectado — Mídia Social",
    user: "Sistema",
    time: "há 1h",
    type: "crisis",
  },
  {
    id: "4",
    action: "Pauta mensal atualizada",
    user: "Juliana Motta",
    time: "há 2h",
    type: "content",
  },
  {
    id: "5",
    action: "Checagem concluída — 14 itens verificados",
    user: "Rafael Souza",
    time: "há 3h",
    type: "system",
  },
];

const typeConfig = {
  report: { icon: BarChart3, color: "text-blue-400", bg: "bg-blue-500/10" },
  client: { icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  crisis: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
  content: { icon: FileText, color: "text-gold-400", bg: "bg-gold-500/10" },
  system: { icon: Settings, color: "text-white/40", bg: "bg-white/06" },
};

export default function ActivityFeed() {
  return (
    <div className="space-y-0">
      {activities.map((activity, i) => {
        const config = typeConfig[activity.type as keyof typeof typeConfig];
        const Icon = config.icon;

        return (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 py-3",
              i !== activities.length - 1 && "border-b border-white/05"
            )}
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", config.bg)}>
              <Icon size={14} className={config.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm font-medium leading-snug">{activity.action}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-white/35 text-xs">{activity.user}</span>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/25 text-xs flex items-center gap-1">
                  <Clock size={10} />
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
