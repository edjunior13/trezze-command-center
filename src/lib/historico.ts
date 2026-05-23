import { apiUrl } from "@/lib/config";
import type { ConteudoHistorico } from "@/types/conteudo";

export async function buscarHistorico(): Promise<ConteudoHistorico[]> {
  const res = await fetch(apiUrl("/api/conteudo/historico"), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Nao foi possivel carregar o historico.");
  }

  return res.json();
}
