"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

interface Produto {
  id: number;
  nome: string;
  slug: string;
  preco: string;
  imagens: string[] | string;
  plataforma: string;
  categoria?: { nome: string; slug: string } | null;
}

interface Categoria {
  id: number;
  nome: string;
  slug: string;
}

export default function CatalogoClient({
  produtos,
  categorias,
}: {
  produtos: Produto[];
  categorias: Categoria[];
}) {
  const searchParams = useSearchParams();
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>(
    searchParams.get("categoria") || ""
  );
  const [busca, setBusca] = useState(searchParams.get("q") || "");
  const [precoMax, setPrecoMax] = useState<string>("");
  const [ordenar, setOrdenar] = useState<string>("recentes");

  useEffect(() => {
    setCategoriaFiltro(searchParams.get("categoria") || "");
    setBusca(searchParams.get("q") || "");
  }, [searchParams]);

  const produtosFiltrados = useMemo(() => {
    let resultado = [...produtos];

    if (categoriaFiltro) {
      resultado = resultado.filter(
        (p) => p.categoria?.slug === categoriaFiltro
      );
    }

    if (busca) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter((p) =>
        p.nome.toLowerCase().includes(termo)
      );
    }

    if (precoMax) {
      const max = parseFloat(precoMax.replace(/[^\d,]/g, "").replace(",", "."));
      resultado = resultado.filter((p) => {
        const preco = parseFloat(p.preco.replace(/[^\d,]/g, "").replace(",", "."));
        return !isNaN(preco) && !isNaN(max) && preco <= max;
      });
    }

    if (ordenar === "az") {
      resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenar === "za") {
      resultado.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    return resultado;
  }, [produtos, categoriaFiltro, busca, precoMax, ordenar]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-black italic text-white mb-2">
        Catálogo <span className="text-azul">completo</span>
      </h1>
      <p className="text-cinza-claro mb-8">
        {produtosFiltrados.length}{" "}
        {produtosFiltrados.length === 1
          ? "produto encontrado"
          : "produtos encontrados"}
      </p>

      {/* Filtros */}
      <div className="bg-carvao-card rounded-xl border border-white/5 p-4 mb-8 flex flex-col md:flex-row gap-4">
        {/* Busca */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-carvao border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-cinza focus:outline-none focus:border-azul"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cinza"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* Categoria */}
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="bg-carvao border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-azul"
        >
          <option value="">Todas categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.nome}
            </option>
          ))}
        </select>

        {/* Preço máximo */}
        <input
          type="text"
          placeholder="Preço máx. (R$)"
          value={precoMax}
          onChange={(e) => setPrecoMax(e.target.value)}
          className="bg-carvao border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-cinza focus:outline-none focus:border-azul w-full md:w-40"
        />

        {/* Ordenar */}
        <select
          value={ordenar}
          onChange={(e) => setOrdenar(e.target.value)}
          className="bg-carvao border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-azul"
        >
          <option value="recentes">Mais recentes</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      {/* Grid de produtos */}
      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-cinza-claro text-lg mb-2">
            Nenhum produto encontrado
          </p>
          <button
            onClick={() => {
              setBusca("");
              setCategoriaFiltro("");
              setPrecoMax("");
            }}
            className="text-azul font-bold text-sm hover:text-azul-claro transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
