import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function gerarImagemDemo(prompt: string) {
  const svg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#020814"/>
  <rect x="80" y="80" width="864" height="864" rx="48" fill="#071628" stroke="#C9A84C" stroke-opacity="0.35" stroke-width="2"/>
  <circle cx="800" cy="220" r="120" fill="#C9A84C" fill-opacity="0.18"/>
  <circle cx="235" cy="790" r="180" fill="#0E2A4D" fill-opacity="0.9"/>
  <path d="M180 612C290 520 385 500 512 548C640 596 725 570 844 455" stroke="#C9A84C" stroke-width="10" stroke-linecap="round" stroke-opacity="0.75"/>
  <rect x="180" y="210" width="420" height="24" rx="12" fill="#FFFFFF" fill-opacity="0.28"/>
  <rect x="180" y="258" width="560" height="14" rx="7" fill="#FFFFFF" fill-opacity="0.14"/>
  <rect x="180" y="292" width="470" height="14" rx="7" fill="#FFFFFF" fill-opacity="0.1"/>
  <text x="180" y="870" fill="#C9A84C" font-family="Arial, sans-serif" font-size="24" letter-spacing="6">PREVIEW VISUAL</text>
  <desc>${prompt.replace(/[<>&"]/g, "")}</desc>
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const conteudoId =
      typeof body?.conteudoId === "string" ? body.conteudoId : undefined;

    if (!prompt) {
      return NextResponse.json(
        { error: "Informe um prompt visual para gerar a imagem." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      const imageUrl = gerarImagemDemo(prompt);

      if (conteudoId) {
        await prisma.conteudo.update({
          where: {
            id: conteudoId,
          },
          data: {
            imagemUrl: imageUrl,
          },
        });
      }

      return NextResponse.json({
        imageUrl,
        demo: true,
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = response.data?.[0];
    const imageUrl = image?.b64_json
      ? `data:image/png;base64,${image.b64_json}`
      : image?.url ?? null;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "A imagem nao foi retornada pela OpenAI." },
        { status: 502 }
      );
    }

    if (conteudoId) {
      await prisma.conteudo.update({
        where: {
          id: conteudoId,
        },
        data: {
          imagemUrl: imageUrl,
        },
      });
    }

    return NextResponse.json({ imageUrl });
  } catch (error: unknown) {
    console.error("ERRO IMAGEM:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro interno ao gerar imagem",
      },
      { status: 500 }
    );
  }
}
