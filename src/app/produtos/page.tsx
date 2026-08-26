import { Suspense } from "react";
import { createClient } from "@/lib/supabase-server";
import CatalogoClient from "./CatalogoClient";

export const metadata = {
  title: "Catálogo — LS_STORE",
  description: "Explore todos os produtos fitness da LS_STORE.",
};

export default async function ProdutosPage() {
  const supabase = createClient();

  const [{ data: produtos }, { data: categorias }] = await Promise.all([
    supabase
      .from("produtos")
      .select("*, categoria:categorias(*)")
      .eq("status", "ativo")
      .order("created_at", { ascending: false }),
    supabase.from("categorias").select("*").order("nome"),
  ]);

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-cinza-claro">Carregando...</p>
        </div>
      }
    >
      <CatalogoClient produtos={produtos || []} categorias={categorias || []} />
    </Suspense>
  );
}
