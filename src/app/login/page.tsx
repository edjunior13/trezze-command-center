"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@trezze.ai");
  const [password, setPassword] = useState("trezze123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error ?? "Nao foi possivel entrar.");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy-900 p-6 shadow-card">
        <div className="w-11 h-11 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5">
          <Lock size={19} className="text-gold-400" />
        </div>
        <h1 className="text-white font-display text-2xl font-semibold">
          Trezze Command Center
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Acesso demo para ambiente de implantacao.
        </p>

        <div className="space-y-4 mt-6">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold-500/40"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gold-500/40"
            placeholder="Senha"
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
