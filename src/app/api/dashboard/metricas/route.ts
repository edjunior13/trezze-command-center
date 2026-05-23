import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDemoData();

  const [clientes, conteudos, eventos, publicacoes, metricas] =
    await Promise.all([
      prisma.cliente.findMany(),
      prisma.conteudo.findMany(),
      prisma.eventoEditorial.findMany(),
      prisma.publicacao.findMany(),
      prisma.metricaCliente.findMany(),
    ]);

  const alcance = metricas.reduce((total, item) => total + item.alcance, 0);
  const engajamento = metricas.reduce(
    (total, item) => total + item.engajamento,
    0
  );
  const riscoMedio = metricas.length
    ? Math.round(
        metricas.reduce((total, item) => total + item.risco, 0) /
          metricas.length
      )
    : 0;

  return NextResponse.json({
    clientesAtivos: clientes.filter((cliente) => cliente.status === "active")
      .length,
    conteudos: conteudos.length,
    eventosPlanejados: eventos.filter((evento) => evento.status !== "done")
      .length,
    publicacoes: publicacoes.length,
    alcance,
    engajamento,
    riscoMedio,
    clientes,
  });
}
