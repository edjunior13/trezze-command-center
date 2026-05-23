import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await ensureDemoData();

  const eventos = await prisma.eventoEditorial.findMany({
    include: {
      cliente: true,
    },
    orderBy: {
      data: "asc",
    },
  });

  return NextResponse.json(eventos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const evento = await prisma.eventoEditorial.create({
    data: {
      clienteId: body.clienteId || null,
      titulo: String(body.titulo ?? ""),
      canal: String(body.canal ?? "LinkedIn"),
      tipo: String(body.tipo ?? "Post"),
      status: String(body.status ?? "planned"),
      data: new Date(body.data ?? Date.now()),
      briefing: String(body.briefing ?? ""),
    },
  });

  return NextResponse.json(evento, { status: 201 });
}
