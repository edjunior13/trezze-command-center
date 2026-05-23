export interface ConteudoFormData {
  cliente: string;
  plataforma: string;
  objetivo: string;
  tomDeVoz: string;
  tipoConteudo: string;
  tema: string;
  cta: string;
}

export interface ConteudoGerado {
  id?: string;
  createdAt?: string;
  headline: string;
  legenda: string;
  cta: string;
  hashtags: string[];
  observacao_estrategica: string;
  sugestao_visual: string;
  versao_curta: string;
  conceito_visual?: string;
  prompt_imagem?: string;
  paleta?: string[];
  formato_imagem?: string;
  imagem_url?: string | null;
}
export interface ConteudoHistorico extends ConteudoGerado {
  id: string;
  createdAt: string;
  status?: "draft" | "review" | "published";

  form: {
    cliente: string;
    plataforma: string;
    objetivo: string;
    tomDeVoz: string;
    tipoConteudo: string;
    tema: string;
    cta: string;
  };
}
