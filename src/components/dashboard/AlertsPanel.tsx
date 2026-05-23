import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Zap, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";

const alerts = [
  {
    id: "1",
    title: "Menção negativa detectada no Twitter/X",
    source: "Monitor Social",
    severity: "critical",
    time: "1 min atrás",
  },
  {
    id: "2",
    title: "Cobertura desfavorável — Folha de S.Paulo",
    source: "Clipping",
    severity: "warning",
    time: "23 min atrás",
  },
  {
    id: "3",
    title: "Relatório mensal pendente de aprovação",
    source: "Workflow",
    severity: "info",
    time: "2h atrás",
  },
];

const severityConfig = {
  critical: {
    icon: Zap,
    badge: "danger" as const,
    label: "Crítico",
    border: "border-l-red-500/60",
    bg: "bg-red-500/05",
  },
  warning: {
    icon: AlertTriangle,
    badge: "warning" as const,
    label: "Atenção",
    border: "border-l-amber-500/60",
    bg: "bg-amber-500/05",
  },
  info: {
    icon: Info,
    badge: "info" as const,
    label: "Info",
    border: "border-l-blue-500/60",
    bg: "bg-blue-500/05",
  },
};

export default function AlertsPanel() {
  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const config = severityConfig[alert.severity as keyof typeof severityConfig];
        const Icon = config.icon;

        return (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border-l-2",
              "transition-colors duration-200 cursor-pointer hover:bg-white/04",
              config.border,
              config.bg
            )}
          >
            <Icon size={14} className="mt-0.5 flex-shrink-0 text-white/50" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={config.badge} dot>
                  {config.label}
                </Badge>
                <span className="text-white/25 text-[10px]">{alert.time}</span>
              </div>
              <p className="text-white/75 text-xs leading-snug">{alert.title}</p>
              <p className="text-white/30 text-[10px] mt-0.5">{alert.source}</p>
            </div>
            <ExternalLink size={11} className="text-white/20 mt-0.5 flex-shrink-0" />
          </div>
        );
      })}
    </div>
  );
}
