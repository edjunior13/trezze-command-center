import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { BarChart3, Download, Eye, Plus, Calendar, FileText } from "lucide-react";

const reports = [
  { id: "1", title: "Relatório Mensal — Nexus Energia", period: "Maio 2025", type: "Mensal", client: "Nexus Energia", status: "published", date: "22 Mai 2025", size: "2.4 MB" },
  { id: "2", title: "Análise de Mídia — Banco Meridian Q2", period: "Abr–Jun 2025", type: "Trimestral", client: "Banco Meridian", status: "published", date: "15 Mai 2025", size: "5.1 MB" },
  { id: "3", title: "Relatório de Crise — TechVision", period: "Mai 2025", type: "Especial", client: "TechVision BR", status: "review", date: "Pendente", size: "—" },
  { id: "4", title: "Dashboard Executivo — Grupo Alvorada", period: "2024 Anual", type: "Anual", client: "Grupo Alvorada", status: "published", date: "10 Jan 2025", size: "12.3 MB" },
  { id: "5", title: "Relatório de Engajamento Digital", period: "Q1 2025", type: "Trimestral", client: "ConstruMap", status: "draft", date: "—", size: "—" },
];

const typeColors: Record<string, string> = {
  "Mensal": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Trimestral": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Anual": "bg-gold-500/10 text-gold-400 border-gold-500/20",
  "Especial": "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusMap = {
  published: { variant: "success" as const, label: "Publicado" },
  review: { variant: "warning" as const, label: "Revisão" },
  draft: { variant: "default" as const, label: "Rascunho" },
};

export default function RelatoriosPage() {
  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader title="Relatórios" subtitle="Análise e inteligência estratégica">
          <Button variant="ghost" size="sm">
            <Calendar size={13} />
            Programar
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Novo relatório
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total de relatórios", value: "128", icon: FileText },
            { label: "Publicados em 2025", value: "47", icon: BarChart3 },
            { label: "Em revisão", value: "6", icon: Eye },
            { label: "Downloads este mês", value: "1.2k", icon: Download },
          ].map((s) => (
            <Card key={s.label} padding="md">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} className="text-gold-400/70" />
                <p className="text-white/35 text-[10px] uppercase tracking-widest">{s.label}</p>
              </div>
              <p className="text-white font-display text-xl font-semibold">{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Reports table */}
        <Card padding="none">
          <div className="px-5 py-4 border-b border-white/06 flex items-center justify-between">
            <h3 className="text-white/85 text-sm font-semibold font-display">Todos os relatórios</h3>
            <Button variant="ghost" size="sm">
              <Download size={13} />
              Exportar lista
            </Button>
          </div>

          <div className="divide-y divide-white/04">
            {reports.map((report) => {
              const status = statusMap[report.status as keyof typeof statusMap];
              return (
                <div
                  key={report.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/04 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy-800 border border-white/08 flex items-center justify-center flex-shrink-0">
                    <BarChart3 size={14} className="text-gold-400/60" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${typeColors[report.type] ?? ""}`}>
                        {report.type}
                      </span>
                    </div>
                    <p className="text-white/85 text-sm font-medium truncate">{report.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">{report.client} · {report.period}</p>
                  </div>

                  <div className="hidden md:block text-white/35 text-xs text-right">
                    <p>{report.date}</p>
                    <p className="text-white/20">{report.size}</p>
                  </div>

                  <Badge variant={status.variant} dot>{status.label}</Badge>

                  {report.status === "published" && (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/08">
                      <Download size={13} className="text-white/50" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
