import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const publicacoes = await prisma.publicacao.findMany({
    include: {
      cliente: true,
      conteudo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(publicacoes);
}

export async function POST(req: Request) {
  const body = await req.json();
  const shouldPublish = body.status === "published";

  const publicacao = await prisma.publicacao.create({
    data: {
      clienteId: body.clienteId || null,
      conteudoId: body.conteudoId || null,
      canal: String(body.canal ?? "Instagram"),
      status: String(body.status ?? "scheduled"),
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      publishedAt: shouldPublish ? new Date() : null,
      externalPostId: shouldPublish
        ? `demo_${Date.now()}`
        : null,
      mensagem: String(body.mensagem ?? ""),
      mediaUrl: body.mediaUrl || null,
    },
  });

  return NextResponse.json(
    {
      ...publicacao,
      modo: process.env.META_ACCESS_TOKEN ? "meta-api" : "demo",
      aviso: process.env.META_ACCESS_TOKEN
        ? null
        : "Publicacao registrada em modo demo. Configure META_ACCESS_TOKEN para publicar via Meta.",
    },
    { status: 201 }
  );
}
