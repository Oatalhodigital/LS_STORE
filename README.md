# LS_STORE — Vitrine de Afiliados Fitness

Loja virtual de produtos fitness baseada em afiliados. O visitante navega pelo catálogo e é redirecionado para Mercado Livre, Shopee ou TikTok Shop para finalizar a compra.

## Stack

- **Next.js 14** (App Router) + **Tailwind CSS**
- **Supabase** (PostgreSQL + Auth)
- **Vercel** (deploy)

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
# As variáveis já estão no .env com as credenciais do Supabase

# 3. Criar tabelas no Supabase
# Acesse o SQL Editor no dashboard do Supabase e execute:
#   supabase/migration.sql

# 4. Criar usuário admin
# No Supabase Dashboard > Authentication > Users > Add user
# Use o e-mail e senha que serão usados no /admin/login

# 5. Popular o banco com dados de exemplo
npm run db:seed

# 6. Rodar o projeto
npm run dev
```

Acesse `http://localhost:3000`

## Painel Admin

1. Acesse `/admin/login`
2. Faça login com o e-mail/senha criados no Supabase
3. Adicione produtos preenchendo: nome, descrição, categoria, preço, link de afiliado, plataforma e imagens (URLs)

### Como adicionar um produto novo

1. No painel admin, clique em **"+ Novo produto"**
2. Preencha o **nome** do produto
3. Escreva uma **descrição** (não copie literalmente do anúncio original)
4. Selecione a **categoria**
5. Digite o **preço** (ex: "R$ 99,90")
6. Selecione a **plataforma** (Mercado Livre, Shopee ou TikTok Shop)
7. Cole o **link de afiliado** gerado na plataforma
8. Adicione as **URLs das imagens** (uma por linha)
9. Marque **destaque** se quiser que apareça na home
10. Clique em **Criar produto**

O produto aparece automaticamente no site.

## Configurar Meta Pixel e GA4

No arquivo `.env`, substitua:

```
NEXT_PUBLIC_META_PIXEL_ID="seu_pixel_id"
NEXT_PUBLIC_GA4_ID="seu_ga4_id"
```

## Estrutura

```
src/
  app/
    page.tsx              # Home
    produtos/
      page.tsx            # Catálogo
      [slug]/page.tsx     # Página de produto
    sobre/page.tsx        # Sobre
    privacidade/page.tsx  # Política de privacidade
    admin/
      page.tsx            # Dashboard (protegido)
      login/page.tsx      # Login
    api/cliques/route.ts  # Registro de cliques
    sitemap.ts            # Sitemap dinâmico
    robots.ts             # Robots.txt
  components/
    Header.tsx
    Footer.tsx
    ProductCard.tsx
    Analytics.tsx         # Meta Pixel + GA4
    CookieBanner.tsx      # Banner LGPD
  lib/
    supabase-browser.ts   # Client Supabase (browser)
    supabase-server.ts    # Client Supabase (server)
    supabase-middleware.ts # Refresh de sessão
  middleware.ts           # Auth middleware
supabase/
  migration.sql           # Schema + RLS
  seed.ts                 # Dados de exemplo
```

## Deploy na Vercel

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_META_PIXEL_ID`
   - `NEXT_PUBLIC_GA4_ID`
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy

## Segurança (RLS)

O arquivo `supabase/migration.sql` configura Row Level Security:

- **Produtos**: leitura pública apenas de produtos ativos; escrita apenas para autenticados
- **Categorias**: leitura pública; escrita apenas para autenticados
- **Cliques**: inserção pública (qualquer visitante); leitura apenas para autenticados
