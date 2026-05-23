"use client";

import { Loader2 } from "lucide-react";
import { ConteudoFormData } from "@/types/conteudo";

interface Props {
  data: ConteudoFormData;
  onChange: (field: keyof ConteudoFormData, value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

const plataformas = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X / Twitter",
  "TikTok",
  "Portal de Notícias",
  "Release",
  "YouTube",
];

const objetivos = [
  "Fortalecimento de reputação",
  "Engajamento",
  "Posicionamento institucional",
  "Gestão de crise",
  "Conversão",
  "Autoridade",
];

const tons = [
  "Institucional",
  "Executivo",
  "Popular",
  "Inspirador",
  "Técnico",
  "Político",
];

const tipos = [
  "Post",
  "Nota oficial",
  "Release",
  "Artigo",
  "Carrossel",
  "Roteiro",
  "Comunicado",
];

export default function ConteudoForm({
  data,
  onChange,
  onSubmit,
  loading,
}: Props) {
  return (
    <div className="space-y-4">
      <Input
        label="Cliente"
        value={data.cliente}
        onChange={(v) => onChange("cliente", v)}
        placeholder="Ex: Nexus Energia"
      />

      <Select
        label="Plataforma"
        value={data.plataforma}
        onChange={(v) => onChange("plataforma", v)}
        options={plataformas}
      />

      <Select
        label="Objetivo"
        value={data.objetivo}
        onChange={(v) => onChange("objetivo", v)}
        options={objetivos}
      />

      <Select
        label="Tom de voz"
        value={data.tomDeVoz}
        onChange={(v) => onChange("tomDeVoz", v)}
        options={tons}
      />

      <Select
        label="Tipo de conteúdo"
        value={data.tipoConteudo}
        onChange={(v) => onChange("tipoConteudo", v)}
        options={tipos}
      />

      <Textarea
        label="Tema"
        value={data.tema}
        onChange={(v) => onChange("tema", v)}
        placeholder="Descreva o tema estratégico..."
      />

      <Textarea
        label="CTA"
        value={data.cta}
        onChange={(v) => onChange("cta", v)}
        placeholder="Ex: Saiba mais no link da bio"
      />

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full mt-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gerando conteúdo...
          </>
        ) : (
          <>
            ✦ Gerar conteúdo
          </>
        )}
      </button>
    </div>
  );
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Input({ label, value, onChange, placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold-500/40 transition-all"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold-500/40 transition-all resize-none"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold-500/40 transition-all"
      >
        <option value="">Selecionar</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}