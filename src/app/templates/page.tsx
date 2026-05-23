import AppLayout from "@/components/layout/AppLayout";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ensureDemoData } from "@/lib/demo-data";
import { prisma } from "@/lib/prisma";
import { Library, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function TemplatesPage() {
  await ensureDemoData();
  const templates = await prisma.templateConteudo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <AppLayout>
      <div className="stagger">
        <PageHeader
          title="Templates"
          subtitle="Modelos prontos por nicho politico, jornalistico e institucional"
        >
          <Button variant="primary" size="sm">
            <Plus size={13} />
            Novo template
          </Button>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id} padding="lg" gold={template.nicho === "Politico"}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gold-500/15 flex items-center justify-center">
                  <Library size={16} className="text-gold-400" />
                </div>
                <Badge variant={template.ativo ? "success" : "default"} dot>
                  {template.ativo ? "Ativo" : "Pausado"}
                </Badge>
              </div>

              <p className="text-white font-semibold font-display">
                {template.nome}
              </p>
              <p className="text-white/35 text-xs mt-1">
                {template.nicho} - {template.formato}
              </p>
              <p className="text-white/65 text-sm leading-relaxed mt-4">
                {template.objetivo}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {parseList(template.campos).map((campo) => (
                  <span
                    key={campo}
                    className="px-2 py-1 rounded-full bg-white/06 border border-white/10 text-white/45 text-xs"
                  >
                    {campo}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
