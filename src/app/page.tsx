import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: destaques }, { data: categorias }] = await Promise.all([
    supabase
      .from("produtos")
      .select("*, categoria:categorias(*)")
      .eq("status", "ativo")
      .eq("destaque", true)
      .limit(8),
    supabase.from("categorias").select("*").order("nome"),
  ]);

  const categoriaIcons: Record<string, string> = {
    "roupas": "👕",
    "meias": "🧦",
    "calcinha-cueca-esportiva": "🩲",
    "garrafas": "🍶",
    "termicos": "🔥",
    "acessorios": "🏋️",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carvao via-carvao to-carvao-claro" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#2F7BFF,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-azul font-bold text-sm uppercase tracking-widest mb-4 animate-fade-in">
              Movimento e tecnologia em ação
            </p>
            <h1 className="text-5xl md:text-7xl font-black italic leading-tight mb-6 animate-fade-in">
              <span className="text-white">Treine com</span>{" "}
              <span className="texto-gradiente">atitude</span>
            </h1>
            <p className="text-cinza-claro text-lg md:text-xl mb-8 max-w-xl animate-fade-in">
              A maior curadoria de produtos fitness do Brasil. Roupas, acessórios
              e equipamentos selecionados para quem leva o treino a sério.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link
                href="/produtos"
                className="bg-carvao text-white font-black text-lg px-10 py-4 rounded-full border border-white/15 hover:border-azul transition-all hover:scale-105 text-center"
              >
                Ver catálogo
              </Link>
              <Link
                href="/produtos?categoria=roupas"
                className="border-2 border-white/20 hover:border-azul text-white font-bold text-lg px-10 py-4 rounded-full transition-all text-center"
              >
                Roupas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco destaque: metade foto, metade cor sólida (estilo Radiant) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden">
          <div className="relative aspect-square md:aspect-auto md:min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1534438327336-7750250ae6c3?w=1200"
              alt="Treino fitness lifestyle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="bg-azul p-12 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-black italic text-carvao leading-tight mb-4">
              Performance que você sente
            </h2>
            <p className="text-carvao/80 text-lg mb-6 font-semibold">
              Produtos selecionados para atletas que não abrem mão de qualidade.
              Do treino à recuperação, tudo em um só lugar.
            </p>
            <Link
              href="/produtos"
              className="inline-block bg-carvao text-white font-black text-base px-8 py-3 rounded-full transition-all hover:scale-105 w-fit"
            >
              Compre agora
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias em destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black italic text-white mb-8">
          Categorias em <span className="text-azul">destaque</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(categorias || []).map((cat: any) => (
            <Link
              key={cat.id}
              href={`/produtos?categoria=${cat.slug}`}
              className="group bg-carvao-card border border-white/5 hover:border-azul/40 rounded-xl p-6 text-center transition-all hover:shadow-lg hover:shadow-azul/10"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {categoriaIcons[cat.slug] || "📦"}
              </div>
              <p className="text-white font-bold text-sm group-hover:text-azul transition-colors">
                {cat.nome}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black italic text-white">
            Produtos em <span className="text-azul">destaque</span>
          </h2>
          <Link
            href="/produtos"
            className="text-azul font-bold text-sm hover:text-azul-claro transition-colors flex items-center gap-1"
          >
            Ver todos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {destaques && destaques.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {destaques.map((produto: any) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="text-cinza-claro text-center py-12">
            Nenhum produto em destaque ainda. Acesse o painel admin para
            cadastrar produtos.
          </p>
        )}
      </section>

      {/* Prova social / selos */}
      <section className="bg-carvao-claro py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black italic text-white text-center mb-12">
            Por que comprar na <span className="text-azul">LS_STORE</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-azul/10 rounded-2xl mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Compra Segura</h3>
              <p className="text-cinza-claro text-sm">
                Todos os pedidos são processados pelas plataformas mais
                confiáveis do mercado.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-azul/10 rounded-2xl mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Entrega Rastreada</h3>
              <p className="text-cinza-claro text-sm">
                Acompanhe seu pedido em tempo real, do depósito até a sua porta.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-azul/10 rounded-2xl mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                  <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Curadoria Especializada</h3>
              <p className="text-cinza-claro text-sm">
                Selecionamos apenas produtos de qualidade comprovada para
                atletas e entusiistas do fitness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradiente-azul p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black italic text-white mb-4">
              Pronto para evoluir?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Explore nosso catálogo completo e encontre o equipamento perfeito
              para o seu próximo treino.
            </p>
            <Link
              href="/produtos"
              className="inline-block bg-carvao text-white font-black text-lg px-10 py-4 rounded-full transition-all hover:scale-105"
            >
              Explorar produtos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
