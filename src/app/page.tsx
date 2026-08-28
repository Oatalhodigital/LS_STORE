import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: produtos }, { data: categorias }] = await Promise.all([
    supabase
      .from("produtos")
      .select("*, categoria:categorias(*)")
      .eq("status", "ativo")
      .order("created_at", { ascending: false })
      .limit(12),
    supabase.from("categorias").select("*").order("nome"),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Busca */}
      <div className="mb-6">
        <form action="/produtos" method="get" className="relative max-w-2xl mx-auto">
          <input
            type="text"
            name="q"
            placeholder="Buscar produtos fitness..."
            className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 pr-12 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#2F7BFF] focus:ring-1 focus:ring-[#2F7BFF]"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2F7BFF]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      {/* Categorias em chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Link
          href="/produtos"
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#2F7BFF] hover:text-white text-gray-700 text-sm font-medium transition-colors"
        >
          Todos
        </Link>
        {(categorias || []).map((cat: any) => (
          <Link
            key={cat.id}
            href={`/produtos?categoria=${cat.slug}`}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#2F7BFF] hover:text-white text-gray-700 text-sm font-medium transition-colors"
          >
            {cat.nome}
          </Link>
        ))}
      </div>

      {/* Grid de produtos */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Produtos</h2>
      {produtos && produtos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {produtos.map((produto: any) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Nenhum produto cadastrado ainda.
        </p>
      )}

      {/* Ver todos */}
      {produtos && produtos.length > 0 && (
        <div className="text-center mt-8">
          <Link
            href="/produtos"
            className="inline-block px-6 py-3 rounded-full bg-[#2F7BFF] text-white font-semibold text-sm hover:bg-[#1A5FDB] transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </div>
  );
}
