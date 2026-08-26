"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  produto: {
    id: number;
    nome: string;
    slug: string;
    preco: string;
    imagens: string[] | string;
    plataforma: string;
    categoria?: { nome: string } | null;
  };
}

export default function ProductCard({ produto }: ProductCardProps) {
  const imagensRaw = produto.imagens;
  const imagens: string[] = Array.isArray(imagensRaw)
    ? imagensRaw
    : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();
  const imagemPrincipal = imagens[0] || "/placeholder.png";

  const plataformaCor: Record<string, string> = {
    "Mercado Livre": "bg-yellow-500/20 text-yellow-400",
    "Shopee": "bg-orange-500/20 text-orange-400",
    "TikTok Shop": "bg-pink-500/20 text-pink-400",
  };

  return (
    <Link href={`/produtos/${produto.slug}`} className="group">
      <div className="bg-carvao-card rounded-xl overflow-hidden border border-white/5 hover:border-azul/40 transition-all duration-300 hover:shadow-lg hover:shadow-azul/10">
        {/* Imagem */}
        <div className="relative aspect-square overflow-hidden bg-carvao-claro">
          <Image
            src={imagemPrincipal}
            alt={produto.nome}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Badge plataforma */}
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold ${plataformaCor[produto.plataforma] || "bg-white/10 text-white"}`}
          >
            {produto.plataforma}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-cinza-claro text-xs uppercase tracking-wider mb-1">
            {produto.categoria?.nome || ""}
          </p>
          <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-azul transition-colors">
            {produto.nome}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-white font-black text-lg">{produto.preco}</span>
            <span className="text-azul text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver oferta
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
