"use client";

import { useState } from "react";
import Image from "next/image";
import { trackAfiliadoClick } from "@/components/Analytics";
import { track } from "@vercel/analytics";

interface ProdutoDetalhe {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  preco: string;
  imagens: string[] | string;
  link_afiliado: string;
  plataforma: string;
  categoria?: { nome: string } | null;
}

const plataformaCores: Record<string, { bg: string; text: string; icon: string }> = {
  "Mercado Livre": { bg: "bg-yellow-500", text: "text-black", icon: "🛒" },
  "Shopee": { bg: "bg-orange-500", text: "text-white", icon: "🛍️" },
  "TikTok Shop": { bg: "bg-pink-500", text: "text-white", icon: "🎵" },
};

export default function ProdutoDetalheClient({
  produto,
}: {
  produto: ProdutoDetalhe;
}) {
  const imagensRaw = produto.imagens;
  const imagens: string[] = Array.isArray(imagensRaw)
    ? imagensRaw
    : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();
  const [imagemAtiva, setImagemAtiva] = useState(0);

  const cor = plataformaCores[produto.plataforma] || {
    bg: "bg-azul",
    text: "text-white",
    icon: "🛒",
  };

  const handleClickAfiliado = async () => {
    trackAfiliadoClick(produto.nome, produto.plataforma);
    track("clique_afiliado", { produto: produto.nome, plataforma: produto.plataforma });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || "";
      const utmCampaign = urlParams.get("utm_campaign") || "";

      await fetch("/api/cliques", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          produtoId: produto.id,
          origem: utmSource,
          campanha: utmCampaign,
        }),
      });
    } catch (e) {
      // Silencioso — não bloquear o clique do usuário
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-gray-400 text-sm mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-[#2F7BFF] transition-colors">Início</a>
        <span>/</span>
        <a href="/produtos" className="hover:text-[#2F7BFF] transition-colors">Produtos</a>
        <span>/</span>
        <span className="text-gray-600">{produto.categoria?.nome || ""}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Galeria */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200 mb-4">
            <Image
              src={imagens[imagemAtiva] || "/placeholder-produto.svg"}
              alt={produto.nome}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {imagens.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {imagens.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImagemAtiva(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    imagemAtiva === idx
                      ? "border-[#2F7BFF]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${produto.nome} - imagem ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-[#2F7BFF] text-sm font-semibold uppercase tracking-wider mb-2">
            {produto.categoria?.nome || ""}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {produto.nome}
          </h1>

          <p className="text-2xl font-bold text-gray-900 mb-6">{produto.preco}</p>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {produto.descricao}
          </p>

          {/* Botão de afiliado */}
          <div className="mb-6">
            <a
              href={produto.link_afiliado}
              target="_blank"
              rel="nofollow sponsored"
              onClick={handleClickAfiliado}
              className={`w-full ${cor.bg} ${cor.text} font-bold text-lg py-4 rounded-full text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
            >
              <span className="text-xl">{cor.icon}</span>
              Ver oferta no {produto.plataforma}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Aviso de redirecionamento */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <svg
              className="text-[#2F7BFF] shrink-0 mt-0.5"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-gray-600 text-sm">
              Você será redirecionado para{" "}
              <strong className="text-gray-900">{produto.plataforma}</strong> para
              finalizar a compra com segurança. A LS_STORE é uma plataforma de
              curadoria — a transação acontece na plataforma de origem.
            </p>
          </div>

          {/* Selos */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Compra Segura
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h4l3 3v5h-7V8z" />
              </svg>
              Entrega Rastreada
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
