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
            <span className="text-gray-900">LS</span>
            <span className="text-azul">_STORE</span>
          </span>
          <p className="text-gray-600 text-sm mt-2">Painel Administrativo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-borda rounded-2xl p-8 space-y-4 shadow-sm"
        >
          <div>
            <label className="text-gray-900 text-sm font-bold block mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-azul"
              placeholder="admin@lsstore.com.br"
              required
            />
          </div>

          <div>
            <label className="text-gray-900 text-sm font-bold block mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-azul"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
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

          <p className="text-gray-500 text-xs text-center">
            Crie seu usuário no Supabase Dashboard &gt; Authentication &gt; Users
          </p>
        </form>
      </div>
    </div>
  );
}
