import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const format = url.searchParams.get("format") ?? "doc";

  if (!id) {
    return NextResponse.json({ error: "Informe o id do conteudo." }, { status: 400 });
  }

  const item = await prisma.conteudo.findUnique({
    where: {
      id,
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Conteudo nao encontrado." }, { status: 404 });
  }

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(item.headline)}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; line-height: 1.6; padding: 40px; }
    h1 { color: #0f172a; }
    h2 { color: #92400e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 28px; }
    .meta { color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <p class="meta">${escapeHtml(item.cliente)} - ${escapeHtml(item.plataforma)} - ${new Date(item.createdAt).toLocaleDateString("pt-BR")}</p>
  <h1>${escapeHtml(item.headline)}</h1>
  <h2>Legenda</h2>
  <p>${escapeHtml(item.legenda)}</p>
  <h2>CTA</h2>
  <p>${escapeHtml(item.cta)}</p>
  <h2>Observacao estrategica</h2>
  <p>${escapeHtml(item.observacaoEstrategica)}</p>
  <h2>Direcao visual</h2>
  <p>${escapeHtml(item.sugestaoVisual)}</p>
  <h2>Prompt de imagem</h2>
  <p>${escapeHtml(item.promptImagem)}</p>
</body>
</html>`;

  const headers = new Headers();
  headers.set(
    "Content-Type",
    format === "pdf" ? "text/html; charset=utf-8" : "application/msword; charset=utf-8"
  );
  headers.set(
    "Content-Disposition",
    `attachment; filename="conteudo-${item.id}.${format === "pdf" ? "html" : "doc"}"`
  );

  return new NextResponse(html, { headers });
}
