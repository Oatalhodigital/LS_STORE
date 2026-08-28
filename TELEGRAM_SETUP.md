# Bot do Telegram — Setup e Configuração

## Visão geral

O bot do Telegram publica automaticamente no canal sempre que um produto é marcado como **"destaque"** no painel admin. A mensagem inclui imagem, nome, preço, plataforma e um botão inline levando ao produto no site.

---

## Passo a passo

### 1. Criar o bot no BotFather

1. Abra o Telegram e procure por **@BotFather**
2. Envie `/newbot`
3. Escolha um nome (ex: `LS_STORE Ofertas`)
4. Escolha um username (ex: `ls_store_ofertas_bot`)
5. **Guarde o token** que o BotFather retorna — será o `TELEGRAM_BOT_TOKEN`

### 2. Criar o canal

1. No Telegram, toque no ícone de lápis → **Novo Canal**
2. Nome: `LS_STORE Ofertas` (ou similar)
3. Descrição: "Ofertas exclusivas de produtos fitness selecionados"
4. Tipo: **Público** (para qualquer pessoa poder entrar via link) ou **Privado** (só com link de convite)
5. Anote o ID do canal:
   - Para canal público: use `@nomedocanal` (ex: `@ls_store_ofertas`)
   - Para canal privado: use o ID numérico (adicione o bot `@getidsbot` ao canal para descobrir o ID, depois remova-o)

### 3. Adicionar o bot como administrador do canal

1. Abra o canal → Configurações → Administradores
2. Adicione o bot que você criou
3. Dê permissão de **Postar Mensagens**

### 4. Configurar variáveis de ambiente

Na Vercel (ou no `.env` local), adicione:

```
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
TELEGRAM_CHANNEL_ID="@ls_store_ofertas"
```

Para configurar na Vercel:
```bash
echo "SEU_TOKEN" | npx vercel env add TELEGRAM_BOT_TOKEN production
echo "@seu_canal" | npx vercel env add TELEGRAM_CHANNEL_ID production
```

### 5. Testar

1. Acesse o painel admin (`/admin`)
2. Crie ou edite um produto marcando **"Destaque"**
3. Salve o produto
4. Verifique se a mensagem apareceu no canal do Telegram

### 6. Compartilhar o link de convite

- Canal público: compartilhe `https://t.me/ls_store_ofertas`
- Canal privado: vá em Configurações → Tipo de Canal → Copiar link de convite
- Coloque o link na bio do Instagram e em stories

---

## Agendamento de posts (opcional)

Para agendar 3 posts automáticos por dia em horários fixos, você pode usar um cron job externo (ex: GitHub Actions, Vercel Cron, ou um serviço como cron-job.org) que faz uma requisição POST para `/api/telegram` com os dados de produtos marcados como destaque.

### Exemplo com Vercel Cron

Adicione ao `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/telegram/scheduled", "schedule": "0 9,13,18 * * *" }
  ]
}
```

Isso fará 3 chamadas por dia (9h, 13h, 18h) para um endpoint `/api/telegram/scheduled` que busca produtos em destaque e posta no canal.

---

## Variáveis de ambiente necessárias

| Variável | Descrição | Onde obter |
|----------|-----------|------------|
| `TELEGRAM_BOT_TOKEN` | Token do bot | BotFather no Telegram |
| `TELEGRAM_CHANNEL_ID` | ID do canal (`@username` ou ID numérico) | Configurações do canal |
| `NEXT_PUBLIC_SITE_URL` | URL do site (para link do produto) | Já configurada |
