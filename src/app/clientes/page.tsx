import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Users, Plus, Filter, Search, TrendingUp, TrendingDown } from "lucide-react";
import { ensureDemoData } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";

const statusMap = {
  active: { variant: "success" as const, label: "Ativo" },
  "at-risk": { variant: "danger" as const, label: "Em risco" },
  paused: { variant: "warning" as const, label: "Pausado" },
};

export default async function ClientesPage() {
  await ensureDemoData();
  const clients = await prisma.cliente.findMany({
    orderBy: {
      score: "desc",
    },
  });

  const ativos = clients.filter((client) => client.status === "active").length;
  const emRisco = clients.filter((client) => client.status === "at-risk").length;
  const receita = clients.reduce((total, client) => total + client.receitaMensal, 0);

  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader title="Clientes" subtitle="Gestao estrategica de carteira e relacionamentos">
          <Button variant="ghost" size="sm">
            <Filter size={13} />
            Filtrar
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Novo cliente
          </Button>
        </PageHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total de clientes", value: String(clients.length), sub: "carteira atual", icon: Users },
            { label: "Clientes ativos", value: String(ativos), sub: "em operacao", icon: TrendingUp },
            { label: "Em risco", value: String(emRisco), sub: "requer atencao", icon: TrendingDown },
            { label: "Receita mensal", value: `R$ ${Math.round(receita / 1000)}k`, sub: "base cadastrada", icon: TrendingUp },
          ].map((item) => (
            <Card key={item.label} padding="md">
              <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-white text-xl font-display font-semibold">{item.value}</p>
              <p className="text-white/35 text-xs mt-0.5">{item.sub}</p>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Buscar cliente por nome, setor ou responsavel..."
              className="w-full pl-9 pr-4 py-2.5 bg-navy-800/80 border border-white/08 rounded-lg text-sm text-white/70 placeholder-white/25 outline-none focus:border-gold-500/40 transition-colors"
            />
          </div>
        </div>

        <Card padding="none">
          <div className="px-5 py-4 border-b border-white/06 flex items-center justify-between">
            <h3 className="text-white/85 text-sm font-semibold font-display">Carteira completa</h3>
            <span className="text-white/30 text-xs">{clients.length} clientes listados</span>
          </div>

          <div className="grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-white/04">
            {["Cliente", "Setor", "Responsavel", "Receita", "Score", "Status"].map((h, i) => (
              <div key={i} className={`text-white/25 text-[10px] font-semibold uppercase tracking-widest ${i === 0 ? "col-span-3" : i === 5 ? "col-span-1" : "col-span-2"}`}>
                {h}
              </div>
            ))}
          </div>

          {clients.map((client) => {
            const status = statusMap[client.status as keyof typeof statusMap] ?? statusMap.active;
            return (
              <div
                key={client.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-white/04 transition-colors duration-150 border-b border-white/04 last:border-0"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-600 to-navy-700 border border-white/08 flex items-center justify-center flex-shrink-0">
                    <span className="text-white/50 text-[10px] font-bold">{client.nome.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-white/85 text-sm font-medium">{client.nome}</p>
                    <p className="text-white/30 text-xs">desde {client.desde}</p>
                  </div>
                </div>
                <div className="col-span-2 text-white/50 text-sm">{client.setor}</div>
                <div className="col-span-2 text-white/50 text-sm">{client.contato}</div>
                <div className="col-span-2 text-white/70 text-sm font-mono">
                  R$ {client.receitaMensal.toLocaleString("pt-BR")}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/08 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${client.score >= 85 ? "bg-emerald-400" : client.score >= 70 ? "bg-gold-500" : "bg-red-400"}`}
                      style={{ width: `${client.score}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-6 font-mono">{client.score}</span>
                </div>
                <div className="col-span-1">
                  <Badge variant={status.variant} dot>
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </AppLayout>
  );
}
