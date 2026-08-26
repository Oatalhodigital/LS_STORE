import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — LS_STORE",
  description: "Política de privacidade da LS_STORE em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-black italic text-white mb-8">
        Política de <span className="text-azul">Privacidade</span>
      </h1>

      <div className="space-y-6 text-cinza-claro leading-relaxed">
        <p className="text-sm text-cinza">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Introdução</h2>
          <p>
            A LS_STORE respeita sua privacidade e está comprometida em proteger
            seus dados pessoais em conformidade com a Lei Geral de Proteção de
            Dados (LGPD - Lei nº 13.709/2018). Esta política explica como
            coletamos, usamos e protegemos suas informações.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Dados Coletados</h2>
          <p className="mb-3">Podemos coletar as seguintes informações:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
            <li>Endereço IP e tipo de dispositivo</li>
            <li>Informações de cookies e tecnologias similares</li>
            <li>Dados de campanha (parâmetros UTM) para rastreamento de anúncios</li>
            <li>E-mail (apenas se você se inscrever na newsletter)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Uso dos Dados</h2>
          <p className="mb-3">Utilizamos seus dados para:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Melhorar a experiência de navegação no site</li>
            <li>Analisar o desempenho de campanhas publicitárias (Meta Ads)</li>
            <li>Entender quais produtos geram mais interesse</li>
            <li>Enviar comunicações de marketing (apenas com seu consentimento)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Cookies e Rastreamento</h2>
          <p>
            Utilizamos cookies para melhorar sua experiência e rastrear o
            desempenho de nossas campanhas. Isso inclui o Meta Pixel (Facebook
            Pixel) e o Google Analytics 4. Você pode aceitar ou recusar o uso de
            cookies não essenciais através do banner exibido em sua primeira
            visita.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Compartilhamento de Dados</h2>
          <p>
            Não vendemos seus dados pessoais. Podemos compartilhar dados
            agregados e anônimos com plataformas de publicidade (Meta, Google)
            para fins de medição de campanhas. As plataformas de origem dos
            produtos (Mercado Livre, Shopee, TikTok Shop) têm suas próprias
            políticas de privacidade que se aplicam quando você é redirecionado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Seus Direitos</h2>
          <p className="mb-3">Conforme a LGPD, você tem o direito de:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Solicitar acesso aos seus dados</li>
            <li>Solicitar correção de dados incompletos ou inexatos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Solicitar a portabilidade dos dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Segurança</h2>
          <p>
            Implementamos medidas técnicas e organizacionais para proteger seus
            dados contra acesso não autorizado, alteração ou destruição.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Contato</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre esta política,
            entre em contato através do e-mail:{" "}
            <span className="text-azul">contato@lsstore.com.br</span>
          </p>
        </section>
      </div>
    </div>
  );
}
