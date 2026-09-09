import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre — LS_STORE",
  description: "Conheça a LS_STORE, a curadoria de produtos fitness das melhores plataformas.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-black italic text-gray-900 mb-8">
        Sobre a <span className="text-azul">LS_STORE</span>
      </h1>

      <div className="prose max-w-none">
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          A <strong className="text-gray-900">LS_STORE</strong> é uma plataforma de
          curadoria de produtos fitness, criada para conectar atletas e
          entusiastas do esporte aos melhores produtos do mercado.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Nós selecionamos produtos das maiores plataformas de e-commerce do
          Brasil — como Mercado Livre, Shopee e TikTok Shop — e organizamos
          tudo em um catálogo fácil de navegar, para que você encontre exatamente
          o que precisa para seu treino sem perder tempo.
        </p>

        <h2 className="text-2xl font-black italic text-gray-900 mt-10 mb-4">
          Como <span className="text-azul">funciona</span>?
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Você navega pelo nosso catálogo como em qualquer loja online. Ao
          encontrar um produto que te interessa, clica em "Ver oferta" e é
          redirecionado diretamente para a página do produto na plataforma de
          origem, onde a compra é finalizada com toda a segurança e políticas de
          entrega e devolução daquela plataforma.
        </p>

        <h2 className="text-2xl font-black italic text-gray-900 mt-10 mb-4">
          Nossa <span className="text-azul">missão</span>
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Trazer a melhor experiência de descoberta de produtos fitness,
          curando apenas itens de qualidade comprovada e com bom
          custo-benefício. Queremos ser o ponto de partida para a sua próxima
          evolução no treino.
        </p>

        <div className="bg-fundo-alt border border-borda rounded-xl p-6 mt-10">
          <p className="text-gray-600 text-sm">
            <strong className="text-gray-900">Aviso:</strong> A LS_STORE não
            realiza vendas diretamente. Somos uma plataforma de afiliados que
            curadoria e direciona usuários para as plataformas de origem. Todas
            as transações são processadas pelas plataformas parceiras.
          </p>
        </div>
      </div>
    </div>
  );
}
