"use client";

import {
  Check,
  Copy,
  ImageIcon,
  Loader2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiUrl } from "@/lib/config";
import { ConteudoGerado } from "@/types/conteudo";

interface Props {
  data: ConteudoGerado;
  onRegenerate: () => void;
  loading?: boolean;
}

export default function ConteudoResult({
  data,
  onRegenerate,
  loading,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    data.imagem_url ?? null
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const autoImageStarted = useRef(false);

  async function handleCopy() {
    const content = `
${data.headline}

${data.legenda}

CTA:
${data.cta}

Hashtags:
${data.hashtags.join(" ")}

Observacao estrategica:
${data.observacao_estrategica}

Sugestao visual:
${data.sugestao_visual}

Conceito visual:
${data.conceito_visual ?? ""}

Prompt de imagem:
${data.prompt_imagem ?? ""}

Versao curta:
${data.versao_curta}
`;

    await navigator.clipboard.writeText(content);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleCopyPrompt() {
    await navigator.clipboard.writeText(data.prompt_imagem ?? "");

    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }

  const handleGenerateImage = useCallback(async () => {
    if (!data.prompt_imagem) return;

    setImageLoading(true);
    setImageError(null);

    try {
      const res = await fetch(apiUrl("/api/conteudo/imagem"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conteudoId: data.id,
          prompt: data.prompt_imagem,
        }),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error ?? `Erro ${res.status}`);
      }

      setImageUrl(payload.imageUrl);
    } catch (err) {
      setImageError(
        err instanceof Error ? err.message : "Erro inesperado ao gerar imagem."
      );
    } finally {
      setImageLoading(false);
    }
  }, [data.id, data.prompt_imagem]);

  useEffect(() => {
    if (autoImageStarted.current || imageUrl || !data.prompt_imagem) return;

    autoImageStarted.current = true;
    handleGenerateImage();
  }, [data.prompt_imagem, handleGenerateImage, imageUrl]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-white text-lg font-semibold">Conteudo gerado</h2>
          <p className="text-white/40 text-xs mt-1">
            Resultado estrategico produzido pela Trezze IA
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-all text-sm"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copiado
              </>
            ) : (
              <>
                <Copy size={14} />
                Copiar
              </>
            )}
          </button>

          <button
            onClick={onRegenerate}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-500 text-navy-950 hover:bg-gold-400 transition-all text-sm font-medium disabled:opacity-60"
          >
            <RefreshCcw size={14} />
            Regenerar
          </button>
          {data.id && (
            <a
              href={apiUrl(`/api/conteudo/export?id=${data.id}&format=doc`)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-all text-sm"
            >
              Word
            </a>
          )}
        </div>
      </div>

      <Section title="Headline">{data.headline}</Section>

      <Section title="Legenda">{data.legenda}</Section>

      <Section title="CTA">{data.cta}</Section>

      <Section title="Hashtags">
        <div className="flex flex-wrap gap-2">
          {data.hashtags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      <VisualPanel
        data={data}
        imageUrl={imageUrl}
        loading={imageLoading}
        error={imageError}
        promptCopied={promptCopied}
        onCopyPrompt={handleCopyPrompt}
        onGenerateImage={handleGenerateImage}
      />

      <Section title="Observacao estrategica">
        {data.observacao_estrategica}
      </Section>

      <Section title="Versao curta">{data.versao_curta}</Section>
    </div>
  );
}

interface VisualPanelProps {
  data: ConteudoGerado;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
  promptCopied: boolean;
  onCopyPrompt: () => void;
  onGenerateImage: () => void;
}

function VisualPanel({
  data,
  imageUrl,
  loading,
  error,
  promptCopied,
  onCopyPrompt,
  onGenerateImage,
}: VisualPanelProps) {
  const palette = data.paleta ?? [];

  return (
    <div className="bg-navy-900 border border-gold-500/20 rounded-2xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            Direcao visual IA
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1.5">
                Conceito
              </p>
              <p className="text-white/75 text-sm leading-relaxed">
                {data.conceito_visual || data.sugestao_visual}
              </p>
            </div>

            <div>
              <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1.5">
                Prompt de imagem
              </p>
              <p className="text-white/65 text-xs leading-relaxed whitespace-pre-wrap">
                {data.prompt_imagem || data.sugestao_visual}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {data.formato_imagem && (
                <span className="px-2.5 py-1 rounded-full bg-white/06 border border-white/10 text-white/55 text-xs">
                  {data.formato_imagem}
                </span>
              )}

              {palette.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/06 border border-white/10 text-white/55 text-xs"
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                  {color}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={onGenerateImage}
                disabled={loading || !data.prompt_imagem}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-500 text-navy-950 hover:bg-gold-400 transition-all text-sm font-medium disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ImageIcon size={14} />
                )}
                Gerar imagem
              </button>

              <button
                onClick={onCopyPrompt}
                disabled={!data.prompt_imagem}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-all text-sm disabled:opacity-60"
              >
                {promptCopied ? <Check size={14} /> : <Copy size={14} />}
                {promptCopied ? "Prompt copiado" : "Copiar prompt"}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs leading-relaxed">{error}</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-64">
          <div
            className="aspect-square rounded-2xl border border-white/10 bg-navy-800 overflow-hidden"
            style={
              imageUrl
                ? {
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {!imageUrl && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <ImageIcon size={26} className="text-gold-400/70 mb-3" />
                <p className="text-white/35 text-xs leading-relaxed">
                  A imagem gerada aparecera aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-navy-900 border border-white/10 rounded-2xl p-5">
      <p className="text-gold-400 text-xs uppercase tracking-widest mb-3">
        {title}
      </p>

      <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
