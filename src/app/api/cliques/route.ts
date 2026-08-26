import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-browser";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { produtoId, origem, campanha } = body;

    if (!produtoId) {
      return NextResponse.json(
        { error: "produtoId é obrigatório" },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { error } = await supabase.from("cliques").insert({
      produto_id: parseInt(produtoId),
      origem: origem || null,
      campanha: campanha || null,
    });

    if (error) {
      console.error("Erro ao registrar clique:", error);
      return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
