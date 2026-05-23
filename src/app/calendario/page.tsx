import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ensureDemoData } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { CalendarDays, Plus } from "lucide-react";

const statusMap = {
  planned: { variant: "info" as const, label: "Planejado" },
  draft: { variant: "warning" as const, label: "Rascunho" },
  done: { variant: "success" as const, label: "Concluido" },
};

export default async function CalendarioPage() {
  await ensureDemoData();
  const eventos = await prisma.eventoEditorial.findMany({
    include: {
      cliente: true,
    },
    orderBy: {
      data: "asc",
    },
  });

  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader
          title="Calendario editorial"
          subtitle="Planejamento inteligente de pautas, canais e entregas"
        >
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Nova pauta
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <Card padding="none">
            <div className="px-5 py-4 border-b border-white/06">
              <h3 className="text-white/85 text-sm font-semibold font-display">
                Proximas entregas
              </h3>
            </div>

            <div className="divide-y divide-white/06">
              {eventos.map((evento) => {
                const status =
                  statusMap[evento.status as keyof typeof statusMap] ??
                  statusMap.planned;

                return (
                  <div key={evento.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/12 border border-gold-500/20 flex items-center justify-center">
                      <CalendarDays size={16} className="text-gold-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/85 text-sm font-medium">
                        {evento.titulo}
                      </p>
                      <p className="text-white/35 text-xs mt-1">
                        {evento.cliente?.nome ?? "Sem cliente"} - {evento.canal} -{" "}
                        {evento.tipo}
                      </p>
                    </div>
                    <p className="text-white/45 text-xs font-mono">
                      {evento.data.toLocaleDateString("pt-BR")}
                    </p>
                    <Badge variant={status.variant} dot>
                      {status.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card gold padding="lg">
            <p className="text-gold-400 text-xs uppercase tracking-widest mb-3">
              IA editorial
            </p>
            <p className="text-white/85 text-lg font-display font-semibold">
              Sugestoes da semana
            </p>
            <div className="space-y-3 mt-5">
              {[
                "Transformar relatorio mensal em carrossel executivo.",
                "Criar resposta preventiva para tema sensivel em monitoramento.",
                "Reaproveitar release como pauta para LinkedIn de porta-voz.",
              ].map((item) => (
                <p
                  key={item}
                  className="text-white/60 text-sm leading-relaxed border-l border-gold-500/40 pl-3"
                >
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
