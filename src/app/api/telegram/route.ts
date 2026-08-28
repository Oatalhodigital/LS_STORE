import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { produto } = body;

    if (!produto || !produto.nome) {
      return NextResponse.json(
        { error: "Dados do produto são obrigatórios" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const channelId = process.env.TELEGRAM_CHANNEL_ID;

    if (!botToken || !channelId) {
      return NextResponse.json(
        { error: "Telegram bot não configurado (TELEGRAM_BOT_TOKEN ou TELEGRAM_CHANNEL_ID ausentes)" },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const productUrl = `${siteUrl}/produtos/${produto.slug}`;

    const imagensRaw = produto.imagens;
    const imagens: string[] = Array.isArray(imagensRaw)
      ? imagensRaw
      : (() => { try { return JSON.parse(imagensRaw); } catch { return []; } })();

    const mensagem = `🔥 *NOVO PRODUTO EM DESTAQUE!*\n\n*${produto.nome}*\n\n💰 ${produto.preco}\n📦 ${produto.plataforma}\n\n${produto.descricao?.substring(0, 200) || ""}...\n\n👉 [Ver produto no site](${productUrl})`;

    // Se tem imagem, envia foto com legenda
    if (imagens.length > 0) {
      const formData = new FormData();
      formData.append("chat_id", channelId);
      formData.append("photo", imagens[0]);
      formData.append("caption", mensagem);
      formData.append("parse_mode", "Markdown");

      const resp = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        { method: "POST", body: formData }
      );

      const data = await resp.json();
      if (!data.ok) {
        console.error("Erro Telegram:", data);
        return NextResponse.json({ error: data.description }, { status: 500 });
      }
    } else {
      // Sem imagem, envia só texto
      const resp = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: channelId,
            text: mensagem,
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "🛒 Ver produto", url: productUrl }],
              ],
            },
          }),
        }
      );

      const data = await resp.json();
      if (!data.ok) {
        console.error("Erro Telegram:", data);
        return NextResponse.json({ error: data.description }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar para Telegram:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
