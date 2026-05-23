import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { ensureDemoData } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { Brain, ShieldAlert } from "lucide-react";

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default async function MemoriaPage() {
  await ensureDemoData();
  const clientes = await prisma.cliente.findMany({
    include: {
      memoriaMarca: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader
          title="Memoria de marca"
          subtitle="Contexto permanente para gerar conteudo alinhado por cliente"
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {clientes.map((cliente) => {
            const memoria = cliente.memoriaMarca;
            return (
              <Card key={cliente.id} padding="lg">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/15 flex items-center justify-center">
                    <Brain size={17} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold font-display">
                      {cliente.nome}
                    </p>
                    <p className="text-white/35 text-xs">
                      {cliente.setor} - score {cliente.score}
                    </p>
                  </div>
                </div>

                <p className="text-white/70 text-sm leading-relaxed">
                  {memoria?.posicionamento}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div>
                    <p className="text-gold-400 text-[10px] uppercase tracking-widest mb-2">
                      Tom
                    </p>
                    <p className="text-white/60 text-sm">{memoria?.tomDeVoz}</p>
                  </div>
                  <div>
                    <p className="text-gold-400 text-[10px] uppercase tracking-widest mb-2">
                      Restricoes
                    </p>
                    <p className="text-white/60 text-sm">{memoria?.restricoes}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {parseList(memoria?.palavrasChave ?? "").map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-red-500/06 border border-red-500/15 p-4">
                  <div className="flex items-center gap-2 text-red-400 text-xs uppercase tracking-widest mb-2">
                    <ShieldAlert size={13} />
                    Assuntos sensiveis
                  </div>
                  <p className="text-red-300/70 text-xs leading-relaxed">
                    {parseList(memoria?.assuntosSensiveis ?? "").join(", ")}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
