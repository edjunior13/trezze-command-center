import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const items = await prisma.conteudo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return NextResponse.json(
      items.map((item) => ({
        id: item.id,
        createdAt: item.createdAt.toISOString(),
        status: item.status,
        headline: item.headline,
        legenda: item.legenda,
        cta: item.cta,
        hashtags: parseList(item.hashtags),
        observacao_estrategica: item.observacaoEstrategica,
        sugestao_visual: item.sugestaoVisual,
        versao_curta: item.versaoCurta,
        conceito_visual: item.conceitoVisual,
        prompt_imagem: item.promptImagem,
        paleta: parseList(item.paleta),
        formato_imagem: item.formatoImagem,
        imagem_url: item.imagemUrl,
        form: {
          cliente: item.cliente,
          plataforma: item.plataforma,
          objetivo: item.objetivo,
          tomDeVoz: item.tomDeVoz,
          tipoConteudo: item.tipoConteudo,
          tema: item.tema,
          cta: item.ctaBriefing,
        },
      }))
    );
  } catch (error) {
    console.error("ERRO HISTORICO:", error);

    return NextResponse.json(
      { error: "Nao foi possivel carregar o historico." },
      { status: 500 }
    );
  }
}
