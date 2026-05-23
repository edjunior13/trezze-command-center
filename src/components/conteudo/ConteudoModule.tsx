"use client";

import { useState, useCallback } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { FileText, Eye, CheckCircle2, Clock, Edit3, Plus } from "lucide-react";
import ConteudoForm from "./ConteudoForm";
import ConteudoResult from "./ConteudoResult";
import ConteudoSkeleton from "./ConteudoSkeleton";
import ConteudoHistorico from "./ConteudoHistorico";
import { ConteudoFormData, ConteudoGerado } from "@/types/conteudo";
import { apiUrl } from "@/lib/config";

const EMPTY_FORM: ConteudoFormData = {
  cliente: "",
  plataforma: "",
  objetivo: "",
  tomDeVoz: "",
  tipoConteudo: "",
  tema: "",
  cta: "",
};

const contents = [
  { id: "1", title: "Nota à imprensa — Nexus Energia Q2", type: "Nota", client: "Nexus Energia", author: "Maria A.", status: "published", date: "Hoje, 14h30", views: 342 },
  { id: "2", title: "Coluna semanal — Setor financeiro em transformação", type: "Artigo", client: "Banco Meridian", author: "Carlos L.", status: "review", date: "Amanhã", views: 0 },
  { id: "3", title: "Release produto — TechVision 4.0", type: "Release", client: "TechVision BR", author: "Juliana M.", status: "draft", date: "23 Mai", views: 0 },
  { id: "4", title: "Entrevista exclusiva — CEO Grupo Alvorada", type: "Entrevista", client: "Grupo Alvorada", author: "Rafael S.", status: "published", date: "20 Mai", views: 1240 },
  { id: "5", title: "Balanço anual de responsabilidade social", type: "Relatório", client: "Saúde Integral", author: "Ana F.", status: "review", date: "25 Mai", views: 0 },
];

const statusMap = {
  published: { variant: "success" as const, label: "Publicado", icon: CheckCircle2 },
  review: { variant: "warning" as const, label: "Revisão", icon: Edit3 },
  draft: { variant: "default" as const, label: "Rascunho", icon: Clock },
};

const typeColors: Record<string, string> = {
  "Nota": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Artigo": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Release": "bg-gold-500/10 text-gold-400 border-gold-500/20",
  "Entrevista": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Relatório": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

type Tab = "gerador" | "historico";

export default function ConteudoModule() {
  const [activeTab, setActiveTab] = useState<Tab>("gerador");
  const [form, setForm] = useState<ConteudoFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConteudoGerado | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((field: keyof ConteudoFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(apiUrl("/api/conteudo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: form.cliente,
          plataforma: form.plataforma,
          objetivo: form.objetivo,
          tomDeVoz: form.tomDeVoz,
          tipoConteudo: form.tipoConteudo,
          tema: form.tema,
          cta: form.cta,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? `Erro ${res.status}`);
      }

      setResult(data as ConteudoGerado);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [form]);

  const handleRegenerate = useCallback(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
    setForm(EMPTY_FORM);
  }, []);

  return (
    <div className="stagger">
      <PageHeader title="Conteúdo" subtitle="Produção e publicação editorial com inteligência estratégica">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/05 transition-all duration-200"
        >
          Limpar
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {[
          { label: "Total", value: "312", color: "text-white" },
          { label: "Publicados", value: "287", color: "text-emerald-400" },
          { label: "Em revisão", value: "14", color: "text-amber-400" },
          { label: "Rascunhos", value: "11", color: "text-white/50" },
          { label: "Este mês", value: "38", color: "text-blue-400" },
          { label: "Visualizações", value: "84k", color: "text-gold-400" },
        ].map((s) => (
          <Card key={s.label} padding="sm" className="text-center">
            <p className={`text-lg font-display font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 p-1 bg-navy-900/60 border border-white/06 rounded-xl w-fit">
        {(["gerador", "historico"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize ${
              activeTab === tab
                ? "bg-gold-500/15 text-gold-400 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.2)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {tab === "gerador" ? "✦ Gerador com IA" : "Histórico"}
          </button>
        ))}
      </div>

      {activeTab === "gerador" && (
        
        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
          {/* Form panel */}
          <div className="order-2 xl:order-1">
            <Card gold padding="lg">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gold-500/15 flex items-center justify-center">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white/90 text-sm font-semibold font-display">Gerador de Conteúdo</h3>
                  <p className="text-white/30 text-[10px]">Powered by GPT-4.1 Mini · Trezze IA</p>
                </div>
              </div>
              <ConteudoForm
                data={form}
                onChange={handleChange}
                onSubmit={handleGenerate}
                loading={loading}
              />
            </Card>
          </div>

          {/* Result panel */}
          <div className="order-1 xl:order-2">
            {loading && <ConteudoSkeleton />}

            {error && !loading && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/06 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div>
                    <p className="text-red-400 text-sm font-semibold mb-1">Erro ao gerar conteúdo</p>
                    <p className="text-red-400/70 text-xs leading-relaxed">{error}</p>
                    <button
                      onClick={handleGenerate}
                      className="mt-3 text-xs font-medium text-red-400 border border-red-500/25 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!loading && !error && result && (
  <ConteudoResult
    data={result}
    onRegenerate={handleRegenerate}
    loading={loading}
  />
)}

{!loading && !error && !result && (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <div className="w-16 h-16 rounded-2xl bg-gold-500/08 border border-gold-500/15 flex items-center justify-center mb-4">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>

    <p className="text-white/40 text-sm font-medium mb-1.5">
      Seu conteúdo aparecerá aqui
    </p>

    <p className="text-white/20 text-xs max-w-xs leading-relaxed">
      Preencha o formulário ao lado e clique em{" "}
      <span className="text-gold-500/60">
        Gerar conteúdo
      </span>{" "}
      para criar uma peça estratégica com IA
    </p>
  </div>
)}
          </div>
        </div>
      )}

      {activeTab === "historico" && (
        <ConteudoHistorico />
      )}
    </div>
  );
}
