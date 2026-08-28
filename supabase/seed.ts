import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Inserir categorias
  const categorias = [
    { nome: "Roupas", slug: "roupas", icon: "shirt" },
    { nome: "Meias", slug: "meias", icon: "sock" },
    { nome: "Calcinha/Cueca Esportiva", slug: "calcinha-cueca-esportiva", icon: "underwear" },
    { nome: "Garrafas", slug: "garrafas", icon: "bottle" },
    { nome: "Térmicos", slug: "termicos", icon: "thermic" },
    { nome: "Acessórios", slug: "acessorios", icon: "accessory" },
  ];

  const { data: catsData, error: catsError } = await supabase
    .from("categorias")
    .upsert(categorias, { onConflict: "slug" })
    .select();

  if (catsError) {
    console.error("Erro ao inserir categorias:", catsError);
    process.exit(1);
  }

  console.log("Categorias inseridas:", catsData?.length);

  const catMap: Record<string, number> = {};
  catsData?.forEach((c: any) => {
    catMap[c.slug] = c.id;
  });

  // 10 produtos de exemplo com imagens Unsplash reais
  const produtos = [
    {
      nome: "Conjunto Fitness Masculino Dry-Fit Pro",
      slug: "conjunto-fitness-masculino-dry-fit-pro",
      descricao: "Conjunto fitness de alta performance com tecido dry-fit que elimina o suor rapidamente. Ideal para treinos intensos e uso diário na academia. Modelagem ergonômica que não restringe movimentos.",
      preco: "R$ 129,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"],
      link_afiliado: "https://mercadolivre.com.br/exemplo-produto-1",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Top Esportivo Feminino Alta Compressão",
      slug: "top-esportivo-feminino-alta-compressao",
      descricao: "Top esportivo com compressão média, alças cruzadas nas costas para melhor sustentação. Tecido respirável e confortável para todos os tipos de treino. Disponível em 5 cores.",
      preco: "R$ 79,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1571902943202-507ec2612359?w=800&q=80"],
      link_afiliado: "https://shopee.com.br/exemplo-produto-2",
      plataforma: "Shopee",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Legging Fitness Feminina Cintura Alta",
      slug: "legging-fitness-feminina-cintura-alta",
      descricao: "Legging de compressão com cintura alta que modela e sustenta. Tecido suplex de alta qualidade, não transparenta durante o treino. Costura flat que evita atrito.",
      preco: "R$ 89,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1506629905804-3d5d5e5e5e5e?w=800&q=80"],
      link_afiliado: "https://mercadolivre.com.br/exemplo-produto-3",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Meia Cano Alto Compressão Esportiva (Par)",
      slug: "meia-cano-alto-compressao-esportiva",
      descricao: "Meia esportiva cano alto com compressão graduada, sola acolchoada para absorção de impacto. Perfeita para corrida e crossfit. Tecido com fios de algodão e elastano para conforto.",
      preco: "R$ 34,90",
      categoria_id: catMap["meias"],
      imagens: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"],
      link_afiliado: "https://mercadolivre.com.br/exemplo-produto-4",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Cueca Esportiva Masculina Microfibra (Pack 3)",
      slug: "cueca-esportiva-masculina-microfibra-pack-3",
      descricao: "Pack com 3 cuecas esportivas em microfibra, secagem rápida e ajuste perfeito. Conforto total para treino e uso diário. Tecido antiodor com tratamento antibacteriano.",
      preco: "R$ 59,90",
      categoria_id: catMap["calcinha-cueca-esportiva"],
      imagens: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"],
      link_afiliado: "https://shopee.com.br/exemplo-produto-5",
      plataforma: "Shopee",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Garrafa Térmica 1L Inox Premium",
      slug: "garrafa-termica-1l-inox-premium",
      descricao: "Garrafa térmica de inox 304, mantém líquidos gelados por 24h e quentes por 12h. Design ergonômico e tampa com trava de segurança. Livre de BPA e ecologicamente correta.",
      preco: "R$ 89,90",
      categoria_id: catMap["garrafas"],
      imagens: ["https://images.unsplash.com/photo-1602143407151-7111541de95e?w=800&q=80"],
      link_afiliado: "https://mercadolivre.com.br/exemplo-produto-6",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Blusa Térmica Feminina Manga Longa",
      slug: "blusa-termica-feminina-manga-longa",
      descricao: "Blusa térmica de compressão que aquece o corpo nos treinos em ambientes frios. Tecido antiodor e proteção UV50+. Perfeita para corrida outdoor e treinos de inverno.",
      preco: "R$ 99,90",
      categoria_id: catMap["termicos"],
      imagens: ["https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80"],
      link_afiliado: "https://www.tiktok.com/shop/exemplo-produto-7",
      plataforma: "TikTok Shop",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Luva de Treino Crossfit com Pulseira",
      slug: "luva-de-treino-crossfit-com-pulseira",
      descricao: "Luva de treino com proteção anti-calos, palma em silicone antiderrapante e pulseira de velcro para ajuste firme. Ideal para levantamento de peso e treinos funcionais.",
      preco: "R$ 49,90",
      categoria_id: catMap["acessorios"],
      imagens: ["https://images.unsplash.com/photo-1584466977773-d55ad8881a7e?w=800&q=80"],
      link_afiliado: "https://shopee.com.br/exemplo-produto-8",
      plataforma: "Shopee",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Cinta Abdominal Neoprene Ajustável",
      slug: "cinta-abdominal-neoprene-ajustavel",
      descricao: "Cinta abdominal em neoprene que aumenta a sudorese na região, ajudando na perda de medidas. Ajuste velcro universal que se adapta a todos os corpos. Reforço lombar incluído.",
      preco: "R$ 39,90",
      categoria_id: catMap["acessorios"],
      imagens: ["https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"],
      link_afiliado: "https://mercadolivre.com.br/exemplo-produto-9",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Shorts Fitness Masculino Elástico Flex",
      slug: "shorts-fitness-masculino-elastico-flex",
      descricao: "Shorts fitness com elastano de 4 vias para máxima liberdade de movimento. Cintura com elástico largo e cordão de ajuste. Bolso interno para chave/cartão. Tecido leve e respirável.",
      preco: "R$ 69,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1556917612-3d5fa6e2f1c8?w=800&q=80"],
      link_afiliado: "https://www.tiktok.com/shop/exemplo-produto-10",
      plataforma: "TikTok Shop",
      destaque: true,
      status: "ativo",
    },
  ];

  const { error: prodError } = await supabase
    .from("produtos")
    .upsert(produtos, { onConflict: "slug" });

  if (prodError) {
    console.error("Erro ao inserir produtos:", prodError);
    process.exit(1);
  }

  console.log("Produtos inseridos:", produtos.length);
  console.log("Seed concluído!");
  console.log("\nPara acessar o admin:");
  console.log("1. Crie um usuário no Supabase Dashboard > Authentication > Users");
  console.log("2. Acesse /admin/login com as credenciais criadas");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
