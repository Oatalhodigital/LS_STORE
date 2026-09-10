import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import ProdutoDetalheClient from "./ProdutoDetalheClient";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data: produto } = await supabase
    .from("produtos")
    .select("*, categoria:categorias(*)")
    .eq("slug", params.slug)
    .single();

  if (!produto) {
    return {
      title: "Produto não encontrado — LS_STORE",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const imagensRaw = produto.imagens;
  const imagens: string[] = Array.isArray(imagensRaw)
    ? imagensRaw
    : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();

  return {
    title: `${produto.nome} — LS_STORE`,
    description: produto.descricao.substring(0, 160),
    openGraph: {
      title: produto.nome,
      description: produto.descricao.substring(0, 160),
      images: imagens.length > 0 ? [{ url: imagens[0] }] : [{ url: "/ls_store_logo_casual.svg" }],
      url: `${siteUrl}/produtos/${produto.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: produto.nome,
      description: produto.descricao.substring(0, 160),
      images: imagens.length > 0 ? [imagens[0]] : ["/ls_store_logo_casual.svg"],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const supabase = createClient();
  const { data: produto } = await supabase
    .from("produtos")
    .select("*, categoria:categorias(*)")
    .eq("slug", params.slug)
    .single();

  if (!produto || produto.status !== "ativo") {
    notFound();
  }

  const { data: relacionados } = await supabase
    .from("produtos")
    .select("*, categoria:categorias(*)")
    .eq("status", "ativo")
    .eq("categoria_id", produto.categoria_id)
    .neq("id", produto.id)
    .limit(4);

  const imagensRaw = produto.imagens;
  const imagens: string[] = Array.isArray(imagensRaw)
    ? imagensRaw
    : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    description: produto.descricao,
    image: imagens,
    offers: {
      "@type": "Offer",
      price: produto.preco.replace(/[^\d,]/g, "").replace(",", "."),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: produto.link_afiliado,
    },
    brand: {
      "@type": "Brand",
      name: "LS_STORE",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProdutoDetalheClient produto={produto} />

      {/* Produtos relacionados */}
      {relacionados && relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-black italic text-gray-900 mb-6">
            Produtos <span className="text-azul">relacionados</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relacionados.map((p: any) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
