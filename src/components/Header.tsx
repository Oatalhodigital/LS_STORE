"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-azul">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/ls_store_logo_casual.svg"
              alt="LS_STORE"
              width={160}
              height={36}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold text-sm"
            >
              Início
            </Link>
            <Link
              href="/produtos"
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold text-sm"
            >
              Produtos
            </Link>
            <Link
              href="/produtos?categoria=roupas"
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold text-sm"
            >
              Roupas
            </Link>
            <Link
              href="/produtos?categoria=acessorios"
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold text-sm"
            >
              Acessórios
            </Link>
            <Link
              href="/sobre"
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold text-sm"
            >
              Sobre
            </Link>
          </nav>

          {/* Botão mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-900 p-2 hover:text-azul transition-colors"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold py-2"
            >
              Início
            </Link>
            <Link
              href="/produtos"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold py-2"
            >
              Produtos
            </Link>
            <Link
              href="/produtos?categoria=roupas"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold py-2"
            >
              Roupas
            </Link>
            <Link
              href="/produtos?categoria=acessorios"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold py-2"
            >
              Acessórios
            </Link>
            <Link
              href="/sobre"
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#2F7BFF] transition-colors font-semibold py-2"
            >
              Sobre
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
