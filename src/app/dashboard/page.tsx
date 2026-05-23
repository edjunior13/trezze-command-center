import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ClientsTable from "@/components/dashboard/ClientsTable";
import Sparkline from "@/components/dashboard/Sparkline";
import { ensureDemoData } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  Download,
  RefreshCw,
  Eye,
  Zap,
} from "lucide-react";

const sparkData1 = [42, 55, 48, 67, 72, 65, 80, 88, 75, 92, 87, 98];
const sparkData2 = [80, 75, 82, 78, 90, 85, 92, 88, 95, 91, 97, 94];
const sparkData3 = [12, 8, 15, 10, 6, 14, 9, 7, 11, 5, 8, 3];
const sparkData4 = [65, 70, 68, 75, 72, 80, 78, 85, 82, 88, 90, 95];

export default async function DashboardPage() {
  await ensureDemoData();
  const [clientesAtivos, conteudos, crises, metricas] = await Promise.all([
    prisma.cliente.count({ where: { status: "active" } }),
    prisma.conteudo.count(),
    prisma.cliente.count({ where: { status: "at-risk" } }),
    prisma.metricaCliente.findMany(),
  ]);
  const npsMedio = metricas.length
    ? Math.round(
        metricas.reduce((total, item) => total + item.sentimento, 0) /
          metricas.length
      )
    : 0;

  return (
    <AppLayout>
      <div className="stagger">
        {/* Header */}
        <PageHeader
          title="Command Center"
          subtitle="Visão executiva consolidada · atualizado há 3 minutos"
        >
          <Button variant="ghost" size="sm">
            <RefreshCw size={13} />
            Atualizar
          </Button>
          <Button variant="gold" size="sm">
            <Download size={13} />
            Exportar
          </Button>
        </PageHeader>

        {/* Premium banner */}
        <div className="mb-8 p-5 rounded-xl border border-gold-500/20 bg-gradient-to-r from-gold-500/08 via-navy-800/60 to-navy-800/80 flex items-center justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/04 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-gold-400" />
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
                Alerta executivo
              </p>
            </div>
            <p className="text-white/80 text-sm font-medium">
              3 clientes requerem atenção imediata · 1 situação de crise ativa
            </p>
          </div>
          <Button variant="gold" size="sm">
            <Eye size={13} />
            Ver detalhes
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <StatCard
              label="Clientes ativos"
              value={String(clientesAtivos)}
              change={8.3}
              description="vs. mês anterior"
              icon={Users}
              gold
            />
            <div className="absolute bottom-4 right-4">
              <Sparkline data={sparkData1} color="#C9A84C" width={80} height={32} />
            </div>
          </div>

          <div className="relative">
            <StatCard
              label="Conteúdos publicados"
              value={String(conteudos)}
              change={14.7}
              description="este trimestre"
              icon={FileText}
            />
            <div className="absolute bottom-4 right-4">
              <Sparkline data={sparkData2} color="#34d399" width={80} height={32} />
            </div>
          </div>

          <div className="relative">
            <StatCard
              label="Crises gerenciadas"
              value={String(crises)}
              change={-22.2}
              description="menor índice em 12 meses"
              icon={AlertTriangle}
            />
            <div className="absolute bottom-4 right-4">
              <Sparkline data={sparkData3} color="#f87171" width={80} height={32} />
            </div>
          </div>

          <div className="relative">
            <StatCard
              label="NPS médio"
              value={String(npsMedio)}
              change={5.1}
              description="satisfação dos clientes"
              icon={TrendingUp}
            />
            <div className="absolute bottom-4 right-4">
              <Sparkline data={sparkData4} color="#60a5fa" width={80} height={32} />
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Clients - 2 cols */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="px-5 pt-5 pb-3 border-b border-white/06 flex items-center justify-between">
                <div>
                  <h3 className="text-white/90 text-sm font-semibold font-display">
                    Carteira de Clientes
                  </h3>
                  <p className="text-white/35 text-xs mt-0.5">Score de saúde do relacionamento</p>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </div>
              <div className="p-4">
                <ClientsTable />
              </div>
            </Card>
          </div>

          {/* Alerts - 1 col */}
          <div>
            <Card padding="none">
              <div className="px-5 pt-5 pb-3 border-b border-white/06 flex items-center justify-between">
                <div>
                  <h3 className="text-white/90 text-sm font-semibold font-display">
                    Alertas
                  </h3>
                  <p className="text-white/35 text-xs mt-0.5">Monitoramento ativo</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              </div>
              <div className="p-4">
                <AlertsPanel />
              </div>
            </Card>
          </div>
        </div>

        {/* Activity + Mini stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity */}
          <div className="lg:col-span-2">
            <Card padding="none">
              <div className="px-5 pt-5 pb-3 border-b border-white/06">
                <h3 className="text-white/90 text-sm font-semibold font-display">
                  Atividade Recente
                </h3>
                <p className="text-white/35 text-xs mt-0.5">Ações da equipe nas últimas 24h</p>
              </div>
              <div className="p-4">
                <ActivityFeed />
              </div>
            </Card>
          </div>

          {/* Quick stats */}
          <div className="flex flex-col gap-4">
            <Card gold>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-3">
                Performance Geral
              </p>
              <div className="space-y-3">
                {[
                  { label: "Cobertura positiva", value: 84, color: "bg-emerald-400" },
                  { label: "Tempo médio de resposta", value: 67, color: "bg-gold-500" },
                  { label: "Engajamento digital", value: 91, color: "bg-blue-400" },
                  { label: "ROI em comunicação", value: 78, color: "bg-purple-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/60 text-xs">{item.label}</span>
                      <span className="text-white/50 text-xs font-mono">{item.value}%</span>
                    </div>
                    <div className="h-1 bg-white/06 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-3">
                Próximas Entregas
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Relatório Nexus Q2", date: "Amanhã", urgent: true },
                  { label: "Revisão pauta Meridian", date: "23 Mai", urgent: false },
                  { label: "Apresentação anual", date: "28 Mai", urgent: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.urgent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      )}
                      <span className="text-white/65 text-xs">{item.label}</span>
                    </div>
                    <span className={`text-xs font-mono ${item.urgent ? "text-red-400" : "text-white/30"}`}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
