"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

interface Produto {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  preco: string;
  categoria_id: number | null;
  imagens: string[] | string;
  link_afiliado: string;
  plataforma: string;
  status: string;
  destaque: boolean;
  categoria?: { nome: string } | null;
}

interface Categoria {
  id: number;
  nome: string;
  slug: string;
}

const PLATAFORMAS = ["Mercado Livre", "Shopee", "TikTok Shop"];

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria_id: "",
    preco: "",
    imagens: "",
    link_afiliado: "",
    plataforma: "Mercado Livre",
    status: "ativo",
    destaque: false,
  });

  const loadData = useCallback(async () => {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase
        .from("produtos")
        .select("*, categoria:categorias(*)")
        .order("created_at", { ascending: false }),
      supabase.from("categorias").select("*").order("nome"),
    ]);
    setProdutos((prods as Produto[]) || []);
    setCategorias((cats as Categoria[]) || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      categoria_id: "",
      preco: "",
      imagens: "",
      link_afiliado: "",
      plataforma: "Mercado Livre",
      status: "ativo",
      destaque: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const imagensArray = formData.imagens
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const payload = {
      nome: formData.nome,
      slug,
      descricao: formData.descricao,
      preco: formData.preco,
      categoria_id: formData.categoria_id ? parseInt(formData.categoria_id) : null,
      imagens: imagensArray,
      link_afiliado: formData.link_afiliado,
      plataforma: formData.plataforma,
      status: formData.status,
      destaque: formData.destaque,
    };

    if (editingId) {
      const { error } = await supabase
        .from("produtos")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        alert("Erro ao atualizar: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("produtos").insert(payload);
      if (error) {
        alert("Erro ao criar: " + error.message);
        return;
      }
    }

    if (formData.destaque) {
      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ produto: { ...payload, slug } }),
        });
      } catch {
        // Silencioso — não bloquear o fluxo do admin
      }
    }

    resetForm();
    loadData();
  };

  const handleEdit = (p: Produto) => {
    const imagensRaw = p.imagens;
    const imagensArray: string[] = Array.isArray(imagensRaw)
      ? imagensRaw
      : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();

    setFormData({
      nome: p.nome,
      descricao: p.descricao,
      categoria_id: p.categoria_id?.toString() || "",
      preco: p.preco,
      imagens: imagensArray.join("\n"),
      link_afiliado: p.link_afiliado,
      plataforma: p.plataforma,
      status: p.status,
      destaque: p.destaque,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const { error } = await supabase.from("produtos").delete().eq("id", id);
    if (error) {
      alert("Erro ao excluir: " + error.message);
      return;
    }
    loadData();
  };

  const filtered = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fundo-alt">
      {/* Top bar */}
      <header className="border-b border-borda bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-black italic">
              <span className="text-gray-900">LS</span>
              <span className="text-azul">_STORE</span>
            </span>
            <span className="text-cinza text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-gray-600 text-sm hover:text-azul transition-colors"
            >
              Ver site
            </a>
            <button
              onClick={handleLogout}
              className="text-red-600 text-sm hover:text-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black italic text-gray-900">
            Gerenciar <span className="text-azul">produtos</span>
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-azul hover:bg-azul-escuro text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            + Novo produto
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white border border-borda rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "Editar produto" : "Novo produto"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-gray-900 text-sm font-bold block mb-1">Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-900 text-sm font-bold block mb-1">Descrição *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                />
              </div>

              <div>
                <label className="text-gray-900 text-sm font-bold block mb-1">Categoria *</label>
                <select
                  required
                  value={formData.categoria_id}
                  onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                >
                  <option value="">Selecione...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-900 text-sm font-bold block mb-1">Preço *</label>
                <input
                  type="text"
                  required
                  placeholder="R$ 99,90"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                />
              </div>

              <div>
                <label className="text-gray-900 text-sm font-bold block mb-1">Plataforma *</label>
                <select
                  required
                  value={formData.plataforma}
                  onChange={(e) => setFormData({ ...formData, plataforma: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                >
                  {PLATAFORMAS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-900 text-sm font-bold block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-900 text-sm font-bold block mb-1">
                  Link de afiliado *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://mercadolivre.com.br/..."
                  value={formData.link_afiliado}
                  onChange={(e) => setFormData({ ...formData, link_afiliado: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-900 text-sm font-bold block mb-1">
                  Imagens (uma URL por linha)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
                  value={formData.imagens}
                  onChange={(e) => setFormData({ ...formData, imagens: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.destaque}
                    onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                    className="w-4 h-4 accent-azul"
                  />
                  <span className="text-gray-900 text-sm font-bold">Destaque (aparece na home)</span>
                </label>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-azul hover:bg-azul-escuro text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
                >
                  {editingId ? "Salvar alterações" : "Criar produto"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 font-bold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Busca */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full max-w-md bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-azul"
          />
        </div>

        {/* Tabela */}
        <div className="bg-white border border-borda rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-borda">
                <th className="text-left text-cinza text-xs uppercase tracking-wider px-4 py-3">Produto</th>
                <th className="text-left text-cinza text-xs uppercase tracking-wider px-4 py-3 hidden md:table-cell">Categoria</th>
                <th className="text-left text-cinza text-xs uppercase tracking-wider px-4 py-3 hidden md:table-cell">Preço</th>
                <th className="text-left text-cinza text-xs uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Plataforma</th>
                <th className="text-left text-cinza text-xs uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-cinza text-xs uppercase tracking-wider px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-12">
                    Nenhum produto encontrado
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-borda hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-gray-900 text-sm font-bold">{p.nome}</p>
                      {p.destaque && (
                        <span className="text-azul text-xs">★ Destaque</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm hidden md:table-cell">
                      {p.categoria?.nome || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-900 text-sm hidden md:table-cell">
                      {p.preco}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm hidden lg:table-cell">
                      {p.plataforma}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          p.status === "ativo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-azul text-sm font-bold hover:text-azul-claro transition-colors mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 text-sm font-bold hover:text-red-700 transition-colors"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
