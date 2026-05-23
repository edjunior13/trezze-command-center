import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { AlertTriangle, Zap, Clock, CheckCircle2, ArrowRight, Shield } from "lucide-react";

const crises = [
  {
    id: "1",
    title: "Menção negativa viral — Twitter/X",
    client: "TechVision BR",
    level: "critical",
    status: "active",
    started: "há 47 min",
    assigned: "Maria Andrade",
    actions: 3,
  },
  {
    id: "2",
    title: "Cobertura desfavorável — portal de notícias",
    client: "Banco Meridian",
    level: "warning",
    status: "monitoring",
    started: "há 3h",
    assigned: "Carlos Lima",
    actions: 7,
  },
  {
    id: "3",
    title: "Declaração polêmica de executivo",
    client: "Nexus Energia",
    level: "warning",
    status: "contained",
    started: "há 2 dias",
    assigned: "Juliana Motta",
    actions: 12,
  },
  {
    id: "4",
    title: "Fake news sobre produto",
    client: "Saúde Integral",
    level: "info",
    status: "resolved",
    started: "há 5 dias",
    assigned: "Rafael Souza",
    actions: 9,
  },
];

const levelConfig = {
  critical: { badge: "danger" as const, label: "Crítico", color: "border-red-500/30 bg-red-500/04" },
  warning: { badge: "warning" as const, label: "Atenção", color: "border-amber-500/20 bg-amber-500/03" },
  info: { badge: "info" as const, label: "Monitorar", color: "border-blue-500/20 bg-blue-500/03" },
};

const statusConfig = {
  active: { icon: Zap, label: "Ativo", color: "text-red-400" },
  monitoring: { icon: Clock, label: "Monitorando", color: "text-amber-400" },
  contained: { icon: Shield, label: "Contido", color: "text-blue-400" },
  resolved: { icon: CheckCircle2, label: "Resolvido", color: "text-emerald-400" },
};

export default function CrisePage() {
  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader title="Gestão de Crise" subtitle="Monitoramento e resposta estratégica em tempo real">
          <Button variant="danger" size="sm">
            <AlertTriangle size={13} />
            Acionar protocolo
          </Button>
        </PageHeader>

        {/* Crisis meter */}
        <Card gold className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Nível de crise atual</p>
              <p className="text-white font-display text-xl font-semibold">Atenção moderada</p>
            </div>
            <div className="text-right">
              <p className="text-gold-400 text-3xl font-display font-bold">42</p>
              <p className="text-white/35 text-xs">/ 100 pts</p>
            </div>
          </div>
          <div className="h-2 bg-white/06 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-gold-500 to-red-500"
              style={{ width: "42%" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-emerald-400 text-[10px]">Normal</span>
            <span className="text-amber-400 text-[10px]">Atenção</span>
            <span className="text-red-400 text-[10px]">Crítico</span>
          </div>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Ativas", value: "1", color: "text-red-400" },
            { label: "Monitorando", value: "1", color: "text-amber-400" },
            { label: "Contidas", value: "1", color: "text-blue-400" },
            { label: "Resolvidas (30d)", value: "7", color: "text-emerald-400" },
          ].map((s) => (
            <Card key={s.label} padding="md" className="text-center">
              <p className={`text-2xl font-display font-semibold ${s.color}`}>{s.value}</p>
              <p className="text-white/35 text-xs mt-1">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Crisis list */}
        <Card padding="none">
          <div className="px-5 py-4 border-b border-white/06">
            <h3 className="text-white/85 text-sm font-semibold font-display">Ocorrências</h3>
          </div>
          <div className="divide-y divide-white/04">
            {crises.map((crisis) => {
              const level = levelConfig[crisis.level as keyof typeof levelConfig];
              const status = statusConfig[crisis.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <div
                  key={crisis.id}
                  className={`flex items-start gap-4 px-5 py-4 border-l-2 hover:bg-white/03 transition-colors cursor-pointer group ${crisis.level === "critical" ? "border-l-red-500/60" : crisis.level === "warning" ? "border-l-amber-500/40" : "border-l-blue-500/30"}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant={level.badge}>{level.label}</Badge>
                      <span className="text-white/30 text-xs">{crisis.client}</span>
                    </div>
                    <p className="text-white/85 text-sm font-medium mb-2">{crisis.title}</p>
                    <div className="flex items-center gap-4 text-xs text-white/35">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {crisis.started}
                      </span>
                      <span>Resp: {crisis.assigned}</span>
                      <span>{crisis.actions} ações tomadas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 text-xs ${status.color}`}>
                      <StatusIcon size={12} />
                      {status.label}
                    </div>
                    <ArrowRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
