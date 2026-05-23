import { NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const requiredFields = [
  "cliente",
  "plataforma",
  "objetivo",
  "tomDeVoz",
  "tipoConteudo",
  "tema",
  "cta",
] as const;

function stringField(value: unknown) {
  return typeof value === "string" ? value : "";
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

function gerarConteudoDemo({
  cliente,
  plataforma,
  objetivo,
  tomDeVoz,
  tipoConteudo,
  tema,
  cta,
}: Record<(typeof requiredFields)[number], string>) {
  const hashtags = [
    `#${cliente.replace(/\W+/g, "")}`,
    "#ComunicacaoEstrategica",
    "#TrezzeIA",
  ].filter((tag) => tag.length > 1);

  return {
    headline: `${cliente}: ${tema}`,
    legenda: `Em um contexto em que ${objetivo.toLowerCase()} exige clareza, consistencia e timing, ${cliente} apresenta uma comunicacao ${tomDeVoz.toLowerCase()} sobre ${tema}. A proposta e traduzir estrategia em mensagem publica, fortalecendo reputacao e criando proximidade com a audiencia em ${plataforma}.`,
    cta,
    hashtags,
    observacao_estrategica:
      "Conteudo gerado em modo demonstracao porque a OPENAI_API_KEY nao esta configurada. Para usar IA real, adicione a chave no .env e reinicie o servidor.",
    sugestao_visual:
      "Imagem institucional premium, com composicao limpa, luz natural, elementos corporativos discretos e foco em confianca, presenca e clareza.",
    versao_curta: `${cliente} reforca seu posicionamento sobre ${tema} com uma mensagem clara, estrategica e orientada a reputacao.`,
    conceito_visual:
      "Narrativa visual executiva, com atmosfera sofisticada, composicao editorial e elementos que transmitam credibilidade.",
    prompt_imagem: `Crie uma imagem institucional premium para ${cliente}, sobre ${tema}, em tom ${tomDeVoz.toLowerCase()}, adequada para ${plataforma}. Composicao elegante, editorial, sem texto na imagem, luz natural, profundidade, cores sofisticadas, sensacao de confianca e estrategia.`,
    paleta: ["#020814", "#C9A84C", "#FFFFFF", "#0E2A4D"],
    formato_imagem: plataforma.toLowerCase().includes("linkedin")
      ? "16:9 LinkedIn"
      : "1:1 Feed",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const missingFields = requiredFields.filter(
      (field) => typeof body?.[field] !== "string" || !body[field].trim()
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Preencha todos os campos antes de gerar conteudo." },
        { status: 400 }
      );
    }

    const {
      cliente,
      plataforma,
      objetivo,
      tomDeVoz,
      tipoConteudo,
      tema,
      cta,
    } = body as Record<(typeof requiredFields)[number], string>;
    const clienteRegistro = await prisma.cliente.findFirst({
      where: {
        nome: cliente,
      },
      include: {
        memoriaMarca: true,
      },
    });
    const memoria = clienteRegistro?.memoriaMarca;

    let generated;

    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const prompt = `
Voce e um estrategista de comunicacao institucional da Trezze.

Crie um conteudo premium para:

Cliente: ${cliente}
Plataforma: ${plataforma}
Objetivo: ${objetivo}
Tom de voz: ${tomDeVoz}
Tipo de conteudo: ${tipoConteudo}
Tema: ${tema}
CTA: ${cta}

Memoria de marca:
Posicionamento: ${memoria?.posicionamento ?? "Nao informado"}
Tom permanente: ${memoria?.tomDeVoz ?? "Nao informado"}
Temas prioritarios: ${memoria?.temasPrioritarios ?? "[]"}
Assuntos sensiveis: ${memoria?.assuntosSensiveis ?? "[]"}
Restricoes: ${memoria?.restricoes ?? "Nenhuma"}

Retorne APENAS JSON valido neste formato:

{
  "headline": "",
  "legenda": "",
  "cta": "",
  "hashtags": [],
  "observacao_estrategica": "",
  "sugestao_visual": "",
  "versao_curta": "",
  "conceito_visual": "",
  "prompt_imagem": "",
  "paleta": [],
  "formato_imagem": ""
}

Para "prompt_imagem", escreva em portugues um prompt detalhado para gerar uma imagem institucional premium, sem texto dentro da imagem, adequado ao canal escolhido.
Para "paleta", retorne de 3 a 5 cores em hexadecimal.
Para "formato_imagem", retorne uma sugestao objetiva, como "1:1 Instagram", "4:5 Feed", "16:9 LinkedIn" ou "9:16 Stories".
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content:
              "Voce e um especialista em comunicacao institucional estrategica, branding executivo e direcao de arte para conteudo digital.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const content = response.choices[0].message.content || "{}";
      const parsed = JSON.parse(content);

      generated = {
        headline: stringField(parsed.headline),
        legenda: stringField(parsed.legenda),
        cta: stringField(parsed.cta) || cta,
        hashtags: stringArray(parsed.hashtags),
        observacao_estrategica: stringField(parsed.observacao_estrategica),
        sugestao_visual: stringField(parsed.sugestao_visual),
        versao_curta: stringField(parsed.versao_curta),
        conceito_visual: stringField(parsed.conceito_visual),
        prompt_imagem:
          stringField(parsed.prompt_imagem) || stringField(parsed.sugestao_visual),
        paleta: stringArray(parsed.paleta),
        formato_imagem: stringField(parsed.formato_imagem),
      };
    } else {
      generated = gerarConteudoDemo({
        cliente,
        plataforma,
        objetivo,
        tomDeVoz,
        tipoConteudo,
        tema,
        cta,
      });
    }

    const saved = await prisma.conteudo.create({
      data: {
        clienteId: clienteRegistro?.id,
        cliente,
        plataforma,
        objetivo,
        tomDeVoz,
        tipoConteudo,
        tema,
        ctaBriefing: cta,
        headline: generated.headline,
        legenda: generated.legenda,
        cta: generated.cta,
        hashtags: JSON.stringify(generated.hashtags),
        observacaoEstrategica: generated.observacao_estrategica,
        sugestaoVisual: generated.sugestao_visual,
        versaoCurta: generated.versao_curta,
        conceitoVisual: generated.conceito_visual,
        promptImagem: generated.prompt_imagem,
        paleta: JSON.stringify(generated.paleta),
        formatoImagem: generated.formato_imagem,
      },
    });

    return NextResponse.json({
      ...generated,
      id: saved.id,
      createdAt: saved.createdAt.toISOString(),
      status: saved.status,
      form: {
        cliente,
        plataforma,
        objetivo,
        tomDeVoz,
        tipoConteudo,
        tema,
        cta,
      },
    });
  } catch (error: unknown) {
    console.error("ERRO OPENAI:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro interno ao gerar conteudo",
      },
      {
        status: 500,
      }
    );
  }
}
