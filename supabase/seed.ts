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

  // 12 produtos reais importados do perfil social do Mercado Livre (lssolucoesdigitais)
  const produtos = [
    {
      nome: "Conjunto Feminino Box Fitness Top + Short Treino Premium",
      slug: "conjunto-feminino-box-fitness-top-short-treino-premium",
      descricao: "Conjunto BOX Fitness com top + short de cintura alta e tecido elastano que proporciona ajuste perfeito, respirabilidade e durabilidade. Ideal para atividades físicas e uso diário. 38% OFF + frete grátis.",
      preco: "R$ 89,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1571902943202-507ec2612359?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-5140603022-conjunto-feminino-box-fitness-top-short-treino-premium-_JM?searchVariation=185709714679&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Conjunto Fitness Treino Top Shorts Bolso Zero Transparencia",
      slug: "conjunto-fitness-treino-top-shorts-bolso-zero-transparencia",
      descricao: "Conjunto fitness com top e shorts de cós alto com bolsos. Tecido resistente, flexível e com excelente elasticidade. Zero transparência. Bojo removível e alcinhas que valorizam os ombros.",
      preco: "R$ 89,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1506629905804-3d5d5e5e5e5e?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-4719658525-conjunto-fitness-treino-top-shorts-bolso-zero-transparencia-_JM?searchVariation=204332883435&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Conjunto Feminino Academia Top Short Duplo Cintura Alta",
      slug: "conjunto-feminino-academia-top-short-duplo-cintura-alta",
      descricao: "Conjunto feminino com top e short duplo de cintura alta. Tecido de compressão ideal, ajuste perfeito e zero transparência. Ideal para academia, corrida e esportes ao ar livre.",
      preco: "R$ 79,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-3403422547-conjunto-feminino-academia-top-short-duplo-cintura-alta-_JM?searchVariation=179358124403&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Conjunto Fitness Virginia Top Shorts Meia Coxa Cintura Alta",
      slug: "conjunto-fitness-virginia-top-shorts-meia-coxa-cintura-alta",
      descricao: "Conjunto Virginia com top e shorts meia coxa de cintura alta. Material leve e respirável que oferece liberdade de movimento e conforto durante a atividade física. 50% OFF + frete grátis.",
      preco: "R$ 79,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1602143407151-7111541de95e?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-5184808828-conjunto-fitness-virginia-top-shorts-meia-coxa-cintura-alta-_JM?searchVariation=186114253505&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Kit 4 Camisetas Dry-Fit Sandrini Masculina Academia Caminhada",
      slug: "kit-4-camisetas-dry-fit-sandrini-masculina-academia-caminhada",
      descricao: "Kit com 4 camisetas dry-fit masculinas Sandrini. Tecido leve, respirável e de secagem rápida. Cores sortidas (preto, azul marinho, chumbo, branco). Ajuste rápido ao corpo e toque agradável. 33% OFF + frete grátis. MAIS VENDIDO.",
      preco: "R$ 119,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-4592320910-kit-4-camiseta-dry-fit-sandrini-masculina-academia-caminhada-_JM?searchVariation=186408020313&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Bolsa Sport Premium 4 Cores Academia Treino Viagem Passeio",
      slug: "bolsa-sport-premium-4-cores-academia-treino-viagem-passeio",
      descricao: "Bolsa sport premium disponível em 4 cores. Ideal para academia, treino, viagem e passeio. Material resistente e espaçoso com compartimentos práticos.",
      preco: "R$ 99,90",
      categoria_id: catMap["acessorios"],
      imagens: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-3443554308-bolsa-sport-premiun-4-cores-academia-treino-viagem-passeio-_JM?searchVariation=177346751886&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Bolsa Mala Dia a Dia Grande Para Trabalho Viagem e Academia",
      slug: "bolsa-mala-dia-a-dia-grande-para-trabalho-viagem-e-academia",
      descricao: "Bolsa mala grande para uso no dia a dia, trabalho, viagem e academia. Espaçosa e resistente, ideal para quem precisa de uma bolsa versátil para múltiplas ocasiões.",
      preco: "R$ 119,90",
      categoria_id: catMap["acessorios"],
      imagens: ["https://images.unsplash.com/photo-1547949440-c50f8a4a4c9e?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-5573744968-bolsa-mala-dia-dia-grande-para-trabalho-viagem-e-academia-_JM?matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Bolsa Phase Small Sports Puma Puma Black Lisa",
      slug: "bolsa-phase-small-sports-puma-puma-black-lisa",
      descricao: "Bolsa Puma Phase Small Sports na cor preta lisa. Design funcional e versátil, ideal para uso diário e atividades esportivas. Material sintético de alta qualidade com acabamento em níquel.",
      preco: "R$ 189,90",
      categoria_id: catMap["acessorios"],
      imagens: ["https://images.unsplash.com/photo-1584466977773-d55ad8881a7e?w=800&q=80"],
      link_afiliado: "https://www.mercadolivre.com.br/bolsa-phase-small-sports-puma/p/MLB46272361?matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Bermuda Térmica Compressão Lupo Sem Costura I-Max Masculino",
      slug: "bermuda-termica-compressao-lupo-sem-costura-i-max-masculino",
      descricao: "Bermuda térmica Lupo Sport I-Max com compressão que favorece a circulação e redução de fadiga muscular. Tecnologia Seamless Dry para respirabilidade e aquecimento. 5% OFF.",
      preco: "R$ 94,90",
      categoria_id: catMap["termicos"],
      imagens: ["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-4120422404-bermuda-termica-compresso-lupo-sem-costura-i-max-masculino-_JM?searchVariation=186779402115&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Kit 4 Shorts 2 em 1 Duplo Dryfit Masculino Compressão Térmico",
      slug: "kit-4-shorts-2-em-1-duplo-dryfit-masculino-compressao-termico",
      descricao: "Kit com 4 shorts 2 em 1 duplo Dry Fit masculino com compressão térmica. Camada interna de compressão, tecido ventilado e bolso seguro. Cores versáteis para corrida, academia e treinos.",
      preco: "R$ 129,90",
      categoria_id: catMap["termicos"],
      imagens: ["https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-6203660830-kit-4-shorts-2-em-1-duplo-dryfit-masculino-compresso-termic-_JM?searchVariation=198767261821&matt_tracing_id=4d279db0-cac1-4a4d-b3e1-49b661e6f198&matt_event_ts=1787934813250&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: false,
      status: "ativo",
    },
    {
      nome: "Roupa de Academia Conjunto Moda Fitness Feminino Calça e Top",
      slug: "roupa-de-academia-conjunto-moda-fitness-feminino-calca-e-top",
      descricao: "Conjunto moda fitness feminino com calça e top para academia. Tecido respirável, confortável e com ajuste perfeito. Ideal para treinos, caminhadas e uso esportivo em geral.",
      preco: "R$ 89,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-4045030911-roupa-de-academia-conjunto-moda-fitness-feminino-calca-e-top-_JM?searchVariation=183470114702&matt_tracing_id=a5a564e1-c532-44ae-b71c-dc4b427f5cf8&matt_event_ts=1787934813232&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: true,
      status: "ativo",
    },
    {
      nome: "Conjunto Lupo Sport Attack Short e Top Academia Corrida",
      slug: "conjunto-lupo-sport-attack-short-e-top-academia-corrida",
      descricao: "Conjunto Lupo Sport Attack com short e top para academia e corrida. Tecnologia de ventilação antimicrobial e costura anatômica sem costura para maior conforto durante a atividade física.",
      preco: "R$ 94,90",
      categoria_id: catMap["roupas"],
      imagens: ["https://images.unsplash.com/photo-1556917612-3d5fa6e2f1c8?w=800&q=80"],
      link_afiliado: "https://produto.mercadolivre.com.br/MLB-3816017579-conjunto-lupo-sport-attack-short-e-top-academia-corrida-_JM?searchVariation=188304623947&matt_tracing_id=a5a564e1-c532-44ae-b71c-dc4b427f5cf8&matt_event_ts=1787934813232&matt_d2id=f7cf010b-adbb-48be-ab2b-6a593eed421b-n",
      plataforma: "Mercado Livre",
      destaque: false,
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
