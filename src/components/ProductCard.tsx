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
  const temImagem = imagens.length > 0 && imagens[0];
  const imagemPrincipal = temImagem ? imagens[0] : "/placeholder-produto.svg";

  return (
    <Link href={`/produtos/${produto.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#2F7BFF] hover:shadow-md transition-all duration-200">
        {/* Imagem */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={imagemPrincipal}
            alt={temImagem ? produto.nome : "Foto em breve"}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={temImagem ? "object-cover group-hover:scale-105 transition-transform duration-300" : "object-contain p-8 opacity-60"}
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <h3 className="text-gray-900 font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#2F7BFF] transition-colors min-h-[2.5rem]">
            {produto.nome}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 font-bold text-lg">{produto.preco}</span>
            <span className="text-[#2F7BFF] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
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
