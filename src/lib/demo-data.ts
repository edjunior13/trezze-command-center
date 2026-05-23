import { prisma } from "@/lib/prisma";

export async function ensureDemoData() {
  const clientes = await prisma.cliente.count();

  if (clientes === 0) {
    await prisma.cliente.createMany({
      data: [
        {
          nome: "Nexus Energia",
          setor: "Energia",
          status: "active",
          contato: "Ana Ferreira",
          receitaMensal: 48000,
          score: 98,
          desde: "Jan 2022",
        },
        {
          nome: "Banco Meridian",
          setor: "Financeiro",
          status: "active",
          contato: "Pedro Alves",
          receitaMensal: 92000,
          score: 91,
          desde: "Mar 2021",
        },
        {
          nome: "TechVision BR",
          setor: "Tecnologia",
          status: "at-risk",
          contato: "Camila Rocha",
          receitaMensal: 36000,
          score: 62,
          desde: "Set 2023",
        },
      ],
    });
  }

  const clientesAtuais = await prisma.cliente.findMany();

  for (const cliente of clientesAtuais) {
    await prisma.memoriaMarca.upsert({
      where: {
        clienteId: cliente.id,
      },
      update: {},
      create: {
        clienteId: cliente.id,
        posicionamento: `${cliente.nome} deve comunicar com autoridade, clareza e consistencia institucional.`,
        tomDeVoz: "Executivo, seguro, humano e objetivo",
        palavrasChave: JSON.stringify([
          "reputacao",
          "confianca",
          "transparencia",
          "impacto",
        ]),
        temasPrioritarios: JSON.stringify([
          "institucional",
          "resultados",
          "lideranca",
          "inovacao",
        ]),
        assuntosSensiveis: JSON.stringify([
          "crise reputacional",
          "promessas absolutas",
          "dados sem fonte",
        ]),
        restricoes: "Evitar exageros promocionais e promessas nao comprovadas.",
        briefingBase:
          "Toda comunicacao deve reforcar credibilidade, governanca e clareza para stakeholders.",
      },
    });
  }

  const templates = await prisma.templateConteudo.count();

  if (templates === 0) {
    await prisma.templateConteudo.createMany({
      data: [
        {
          nome: "Pronunciamento politico institucional",
          nicho: "Politico",
          formato: "Nota oficial",
          objetivo: "Responder com clareza e preservar reputacao",
          promptBase:
            "Crie uma nota oficial objetiva, institucional e serena, com foco em responsabilidade publica.",
          campos: JSON.stringify(["contexto", "posicionamento", "acao"]),
        },
        {
          nome: "Pauta jornalistica executiva",
          nicho: "Jornalistico",
          formato: "Release",
          objetivo: "Gerar interesse editorial com dados e relevancia publica",
          promptBase:
            "Crie um release jornalistico com gancho, contexto, falas sugeridas e dados verificaveis.",
          campos: JSON.stringify(["gancho", "dados", "porta-voz"]),
        },
        {
          nome: "Carrossel de reputacao",
          nicho: "Institucional",
          formato: "Carrossel",
          objetivo: "Explicar uma mensagem complexa em narrativa visual simples",
          promptBase:
            "Crie um roteiro de carrossel com abertura forte, desenvolvimento em blocos e CTA final.",
          campos: JSON.stringify(["tema", "publico", "cta"]),
        },
      ],
    });
  }

  const eventos = await prisma.eventoEditorial.count();

  if (eventos === 0) {
    const primeiroCliente = clientesAtuais[0];
    await prisma.eventoEditorial.createMany({
      data: [
        {
          clienteId: primeiroCliente?.id,
          titulo: "Post institucional sobre resultados do mes",
          canal: "LinkedIn",
          tipo: "Post",
          status: "planned",
          data: new Date(Date.now() + 24 * 60 * 60 * 1000),
          briefing: "Reforcar entregas, reputacao e proximos passos.",
        },
        {
          clienteId: primeiroCliente?.id,
          titulo: "Release para imprensa regional",
          canal: "Imprensa",
          tipo: "Release",
          status: "draft",
          data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          briefing: "Transformar iniciativa em pauta de interesse publico.",
        },
      ],
    });
  }

  const metricas = await prisma.metricaCliente.count();

  if (metricas === 0) {
    await prisma.metricaCliente.createMany({
      data: clientesAtuais.map((cliente) => ({
        clienteId: cliente.id,
        periodo: "2026-05",
        alcance: cliente.score * 1200,
        engajamento: cliente.score * 83,
        sentimento: Math.min(98, cliente.score),
        risco: Math.max(2, 100 - cliente.score),
      })),
    });
  }
}
