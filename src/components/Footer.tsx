import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-carvao-claro border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + descrição */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-black italic tracking-tight">
              <span className="text-white">LS</span>
              <span className="text-azul">_STORE</span>
            </span>
            <p className="text-cinza-claro text-sm mt-4 max-w-md">
              Curadoria de produtos fitness das melhores plataformas. Encontre o
              que precisa para seu treino com a confiança de quem entende do
              assunto.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-cinza-claro hover:text-azul transition-colors text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="text-cinza-claro hover:text-azul transition-colors text-sm"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-cinza-claro hover:text-azul transition-colors text-sm"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-cinza-claro hover:text-azul transition-colors text-sm"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-cinza-claro text-sm mb-3">
              Receba novidades e ofertas
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="bg-carvao border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-cinza focus:outline-none focus:border-azul"
              />
              <button
                type="submit"
                className="bg-azul hover:bg-azul-escuro transition-colors text-white font-bold text-sm py-2 rounded-lg"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Selos de confiança */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-cinza-claro text-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Compra Segura
          </div>
          <div className="flex items-center gap-2 text-cinza-claro text-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            Entrega Rastreada
          </div>
          <div className="flex items-center gap-2 text-cinza-claro text-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
            Pagamento Protegido
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-cinza text-xs">
          <p>
            &copy; {new Date().getFullYear()} LS_STORE. Todos os direitos
            reservados. LS_STORE é uma plataforma de curadoria de produtos
            afiliados.
          </p>
        </div>
      </div>
    </footer>
  );
}
