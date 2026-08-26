-- LS_STORE - Schema + RLS Policies
-- Execute este script no SQL Editor do Supabase

-- ============================================
-- TABELAS
-- ============================================

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  descricao TEXT NOT NULL,
  preco TEXT NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  imagens JSONB NOT NULL DEFAULT '[]',
  link_afiliado TEXT NOT NULL,
  plataforma TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativo',
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cliques (rastreamento de cliques em links de afiliado)
CREATE TABLE IF NOT EXISTS cliques (
  id SERIAL PRIMARY KEY,
  produto_id INTEGER REFERENCES produtos(id) ON DELETE CASCADE,
  origem TEXT,
  campanha TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Ativar RLS em todas as tabelas
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cliques ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS - CATEGORIAS
-- ============================================

-- Leitura pública
DROP POLICY IF EXISTS "categorias_select_public" ON categorias;
CREATE POLICY "categorias_select_public" ON categorias
  FOR SELECT USING (true);

-- Escrita apenas para autenticados
DROP POLICY IF EXISTS "categorias_insert_auth" ON categorias;
CREATE POLICY "categorias_insert_auth" ON categorias
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "categorias_update_auth" ON categorias;
CREATE POLICY "categorias_update_auth" ON categorias
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "categorias_delete_auth" ON categorias;
CREATE POLICY "categorias_delete_auth" ON categorias
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- POLÍTICAS - PRODUTOS
-- ============================================

-- Leitura pública apenas de produtos ativos
DROP POLICY IF EXISTS "produtos_select_public" ON produtos;
CREATE POLICY "produtos_select_public" ON produtos
  FOR SELECT USING (status = 'ativo');

-- Leitura completa para autenticados (admin vê todos)
DROP POLICY IF EXISTS "produtos_select_auth" ON produtos;
CREATE POLICY "produtos_select_auth" ON produtos
  FOR SELECT TO authenticated USING (true);

-- Escrita apenas para autenticados
DROP POLICY IF EXISTS "produtos_insert_auth" ON produtos;
CREATE POLICY "produtos_insert_auth" ON produtos
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "produtos_update_auth" ON produtos;
CREATE POLICY "produtos_update_auth" ON produtos
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "produtos_delete_auth" ON produtos;
CREATE POLICY "produtos_delete_auth" ON produtos
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- POLÍTICAS - CLIQUES
-- ============================================

-- Inserção pública (qualquer visitante pode registrar clique)
DROP POLICY IF EXISTS "cliques_insert_public" ON cliques;
CREATE POLICY "cliques_insert_public" ON cliques
  FOR INSERT WITH CHECK (true);

-- Leitura apenas para autenticados
DROP POLICY IF EXISTS "cliques_select_auth" ON cliques;
CREATE POLICY "cliques_select_auth" ON cliques
  FOR SELECT TO authenticated USING (true);

-- ============================================
-- ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_produtos_slug ON produtos(slug);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria_id ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_produtos_status ON produtos(status);
CREATE INDEX IF NOT EXISTS idx_produtos_destaque ON produtos(destaque);
CREATE INDEX IF NOT EXISTS idx_cliques_produto_id ON cliques(produto_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS produtos_updated_at ON produtos;
CREATE TRIGGER produtos_updated_at
  BEFORE UPDATE ON produtos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
