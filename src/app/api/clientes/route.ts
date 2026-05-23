import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDemoData();

  const clientes = await prisma.cliente.findMany({
    include: {
      memoriaMarca: true,
      metricas: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      score: "desc",
    },
  });

  return NextResponse.json(clientes);
}

export async function POST(req: Request) {
  const body = await req.json();

  const cliente = await prisma.cliente.create({
    data: {
      nome: String(body.nome ?? ""),
      setor: String(body.setor ?? "Institucional"),
      status: String(body.status ?? "active"),
      contato: String(body.contato ?? ""),
      receitaMensal: Number(body.receitaMensal ?? 0),
      score: Number(body.score ?? 80),
      desde: String(body.desde ?? ""),
    },
  });

  await prisma.memoriaMarca.create({
    data: {
      clienteId: cliente.id,
      posicionamento: String(body.posicionamento ?? ""),
      tomDeVoz: String(body.tomDeVoz ?? ""),
      palavrasChave: JSON.stringify(body.palavrasChave ?? []),
      temasPrioritarios: JSON.stringify(body.temasPrioritarios ?? []),
      assuntosSensiveis: JSON.stringify(body.assuntosSensiveis ?? []),
      restricoes: String(body.restricoes ?? ""),
      briefingBase: String(body.briefingBase ?? ""),
    },
  });

  return NextResponse.json(cliente, { status: 201 });
}
