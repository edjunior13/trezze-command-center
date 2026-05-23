"use client";

import { useEffect, useState } from "react";
import { Clock3, ImageIcon, Loader2 } from "lucide-react";

import { buscarHistorico } from "@/lib/historico";
import type { ConteudoHistorico as ConteudoHistoricoItem } from "@/types/conteudo";

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  review: "Revisao",
  published: "Publicado",
};

export default function ConteudoHistorico() {
  const [items, setItems] = useState<ConteudoHistoricoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function carregar() {
      try {
        setLoading(true);
        setError(null);
        const data = await buscarHistorico();

        if (mounted) {
          setItems(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Nao foi possivel carregar o historico."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    carregar();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-navy-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 size={16} className="animate-spin" />
          <p className="text-sm">Carregando historico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/06 border border-red-500/20 rounded-2xl p-6">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-navy-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-white/70">
          <Clock3 size={16} />
          <p className="text-sm">Nenhum conteudo gerado ainda.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-navy-900 border border-white/10 rounded-2xl p-5 hover:border-gold-500/30 transition-all"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-white font-medium">{item.form.cliente}</p>

              <p className="text-white/40 text-xs mt-1">
                {item.form.plataforma} - {item.form.tipoConteudo}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-gold-400 text-xs">
                {new Date(item.createdAt).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">
                {statusLabels[item.status ?? "draft"] ?? item.status}
              </p>
            </div>
          </div>

          <h3 className="text-white text-sm font-semibold leading-relaxed">
            {item.headline}
          </h3>

          <p className="text-white/60 text-sm mt-3 line-clamp-3">
            {item.legenda}
          </p>

          {(item.conceito_visual || item.prompt_imagem) && (
            <div className="mt-4 rounded-xl border border-white/08 bg-white/03 p-4">
              <div className="flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest mb-2">
                <ImageIcon size={13} />
                Visual IA
              </div>
              <p className="text-white/55 text-xs leading-relaxed line-clamp-2">
                {item.conceito_visual || item.prompt_imagem}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {item.hashtags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
