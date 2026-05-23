import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { CheckSquare, Plus, Search, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

const checks = [
  { id: "1", claim: "Nexus Energia reduziu emissões de CO₂ em 40% em 2024", source: "Assessoria Nexus", verdict: "verified", checker: "Rafael Souza", date: "22 Mai 2025", category: "Ambiental" },
  { id: "2", claim: "Banco Meridian lidera ranking de inovação bancária no Brasil", source: "Press release", verdict: "partial", checker: "Ana Ferreira", date: "21 Mai 2025", category: "Financeiro" },
  { id: "3", claim: "TechVision atingiu 1 milhão de usuários ativos", source: "Entrevista CEO", verdict: "pending", checker: "Carlos Lima", date: "20 Mai 2025", category: "Tecnologia" },
  { id: "4", claim: "Produto ConstruMap aprovado pela ABNT sem ressalvas", source: "Nota oficial", verdict: "verified", checker: "Juliana Motta", date: "19 Mai 2025", category: "Construção" },
  { id: "5", claim: "Grupo Alvorada não possui processos trabalhistas em curso", source: "Comunicado", verdict: "refuted", checker: "Maria Andrade", date: "18 Mai 2025", category: "Trabalhista" },
];

const verdictConfig = {
  verified: { badge: "success" as const, label: "Verificado", icon: CheckCircle2, color: "text-emerald-400" },
  partial: { badge: "warning" as const, label: "Parcial", icon: AlertCircle, color: "text-amber-400" },
  pending: { badge: "default" as const, label: "Pendente", icon: Clock, color: "text-white/40" },
  refuted: { badge: "danger" as const, label: "Refutado", icon: XCircle, color: "text-red-400" },
};

export default function ChecagemPage() {
  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader title="Checagem" subtitle="Verificação de fatos e fact-checking estratégico">
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Nova checagem
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Verificadas", value: "284", color: "text-emerald-400", icon: CheckCircle2 },
            { label: "Parcialmente verdadeiro", value: "47", color: "text-amber-400", icon: AlertCircle },
            { label: "Pendentes", value: "12", color: "text-white/50", icon: Clock },
            { label: "Refutadas", value: "23", color: "text-red-400", icon: XCircle },
          ].map((s) => (
            <Card key={s.label} padding="md">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} className={s.color} />
                <p className="text-white/35 text-[10px] uppercase tracking-widest">{s.label}</p>
              </div>
              <p className={`font-display text-2xl font-semibold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Accuracy bar */}
        <Card gold className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/60 text-sm font-medium">Índice de precisão geral</p>
            <p className="text-gold-400 font-display text-lg font-semibold">78.9%</p>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div className="bg-emerald-400" style={{ width: "78%" }} title="Verificado" />
            <div className="bg-amber-400" style={{ width: "13%" }} title="Parcial" />
            <div className="bg-white/15" style={{ width: "3.5%" }} title="Pendente" />
            <div className="bg-red-400" style={{ width: "6.5%" }} title="Refutado" />
          </div>
          <div className="flex gap-4 mt-2">
            {[
              { color: "bg-emerald-400", label: "Verificado 78%" },
              { color: "bg-amber-400", label: "Parcial 13%" },
              { color: "bg-white/20", label: "Pendente 3.5%" },
              { color: "bg-red-400", label: "Refutado 6.5%" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-white/35 text-[10px]">{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Buscar afirmação, fonte ou cliente..."
            className="w-full pl-9 pr-4 py-2.5 bg-navy-800/80 border border-white/08 rounded-lg text-sm text-white/70 placeholder-white/25 outline-none focus:border-gold-500/40 transition-colors"
          />
        </div>

        {/* Checks list */}
        <Card padding="none">
          <div className="px-5 py-4 border-b border-white/06">
            <h3 className="text-white/85 text-sm font-semibold font-display">Checagens recentes</h3>
          </div>
          <div className="divide-y divide-white/04">
            {checks.map((check) => {
              const verdict = verdictConfig[check.verdict as keyof typeof verdictConfig];
              const VerdictIcon = verdict.icon;
              return (
                <div key={check.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/04 transition-colors cursor-pointer group">
                  <div className={`mt-0.5 ${verdict.color}`}>
                    <VerdictIcon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/85 text-sm font-medium mb-1 leading-snug">{check.claim}</p>
                    <div className="flex items-center gap-3 text-xs text-white/30">
                      <span>Fonte: {check.source}</span>
                      <span>·</span>
                      <span>{check.checker}</span>
                      <span>·</span>
                      <span>{check.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] text-white/30 hidden md:block">{check.category}</span>
                    <Badge variant={verdict.badge} dot>{verdict.label}</Badge>
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
