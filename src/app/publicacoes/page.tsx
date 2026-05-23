import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/demo-data";
import { Send, Instagram, Facebook, Plus } from "lucide-react";

const canais = [
  { nome: "Instagram", icon: Instagram, status: "demo" },
  { nome: "Facebook", icon: Facebook, status: "demo" },
  { nome: "LinkedIn", icon: Send, status: "fila" },
];

export default async function PublicacoesPage() {
  await ensureDemoData();
  const publicacoes = await prisma.publicacao.findMany({
    include: {
      cliente: true,
      conteudo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader
          title="Publicacoes"
          subtitle="Fila para Instagram, Facebook e canais institucionais"
        >
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Nova publicacao
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {canais.map((canal) => (
            <Card key={canal.nome} padding="md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/06 flex items-center justify-center">
                    <canal.icon size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white/85 text-sm font-medium">
                      {canal.nome}
                    </p>
                    <p className="text-white/30 text-xs">
                      {canal.status === "demo" ? "Modo demo" : "Fila ativa"}
                    </p>
                  </div>
                </div>
                <Badge variant={canal.status === "demo" ? "warning" : "success"} dot>
                  {canal.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <Card padding="none">
          <div className="px-5 py-4 border-b border-white/06">
            <h3 className="text-white/85 text-sm font-semibold font-display">
              Historico e agendamentos
            </h3>
          </div>

          {publicacoes.length === 0 ? (
            <div className="p-6 text-white/45 text-sm">
              Nenhuma publicacao registrada ainda. Ao publicar ou agendar, ela
              aparecera aqui.
            </div>
          ) : (
            <div className="divide-y divide-white/06">
              {publicacoes.map((publicacao) => (
                <div key={publicacao.id} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-gold-500/12 flex items-center justify-center">
                    <Send size={15} className="text-gold-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm truncate">
                      {publicacao.mensagem || publicacao.conteudo?.headline}
                    </p>
                    <p className="text-white/35 text-xs mt-1">
                      {publicacao.cliente?.nome ?? "Sem cliente"} -{" "}
                      {publicacao.canal}
                    </p>
                  </div>
                  <Badge variant={publicacao.status === "published" ? "success" : "warning"} dot>
                    {publicacao.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
