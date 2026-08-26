"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-3xl font-black italic tracking-tight">
            <span className="text-white">LS</span>
            <span className="text-azul">_STORE</span>
          </span>
          <p className="text-cinza-claro text-sm mt-2">Painel Administrativo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-carvao-card border border-white/5 rounded-2xl p-8 space-y-4"
        >
          <div>
            <label className="text-white text-sm font-bold block mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-carvao border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-azul"
              placeholder="admin@lsstore.com.br"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm font-bold block mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-carvao border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-azul"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-azul hover:bg-azul-escuro disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-cinza text-xs text-center">
            Crie seu usuário no Supabase Dashboard &gt; Authentication &gt; Users
          </p>
        </form>
      </div>
    </div>
  );
}
