import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDemoData();

  const templates = await prisma.templateConteudo.findMany({
    where: {
      ativo: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(templates);
}

export async function POST(req: Request) {
  const body = await req.json();

  const template = await prisma.templateConteudo.create({
    data: {
      nome: String(body.nome ?? ""),
      nicho: String(body.nicho ?? "Institucional"),
      formato: String(body.formato ?? "Post"),
      objetivo: String(body.objetivo ?? ""),
      promptBase: String(body.promptBase ?? ""),
      campos: JSON.stringify(body.campos ?? []),
    },
  });

  return NextResponse.json(template, { status: 201 });
}
