"use client";

import { useState } from "react";
import Image from "next/image";
import { trackAfiliadoClick } from "@/components/Analytics";

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
      <nav className="text-cinza text-sm mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-azul transition-colors">Início</a>
        <span>/</span>
        <a href="/produtos" className="hover:text-azul transition-colors">Produtos</a>
        <span>/</span>
        <span className="text-cinza-claro">{produto.categoria?.nome || ""}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Galeria */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-carvao-card border border-white/5 mb-4">
            <Image
              src={imagens[imagemAtiva] || "/placeholder.png"}
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
                      ? "border-azul"
                      : "border-white/5 hover:border-white/20"
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
          <span className="text-azul text-sm font-bold uppercase tracking-wider mb-2">
            {produto.categoria?.nome || ""}
          </span>
          <h1 className="text-3xl md:text-4xl font-black italic text-white mb-4">
            {produto.nome}
          </h1>

          <p className="text-2xl font-black text-white mb-6">{produto.preco}</p>

          <p className="text-cinza-claro text-base leading-relaxed mb-8">
            {produto.descricao}
          </p>

          {/* Botão de afiliado */}
          <div className="mb-6">
            <a
              href={produto.link_afiliado}
              target="_blank"
              rel="nofollow sponsored"
              onClick={handleClickAfiliado}
              className={`w-full ${cor.bg} ${cor.text} font-black text-lg py-4 rounded-full text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
            >
              <span className="text-xl">{cor.icon}</span>
              Ver oferta no {produto.plataforma}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Aviso de redirecionamento */}
          <div className="bg-carvao-card border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <svg
              className="text-azul shrink-0 mt-0.5"
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
            <p className="text-cinza-claro text-sm">
              Você será redirecionado para{" "}
              <strong className="text-white">{produto.plataforma}</strong> para
              finalizar a compra com segurança. A LS_STORE é uma plataforma de
              curadoria — a transação acontece na plataforma de origem.
            </p>
          </div>

          {/* Selos */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-cinza-claro text-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F7BFF" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Compra Segura
            </div>
            <div className="flex items-center gap-2 text-cinza-claro text-xs">
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
