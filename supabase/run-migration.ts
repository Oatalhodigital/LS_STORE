import { readFileSync } from "fs";
import { resolve } from "path";

// Carregar .env
const envPath = resolve(process.cwd(), ".env");
const envContent = readFileSync(envPath, "utf8");
envContent.split("\n").forEach((line) => {
  const p = line.indexOf("=");
  if (p > 0) {
    const key = line.slice(0, p).trim();
    const value = line.slice(p + 1).replace(/^["']|["']$/g, "").trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
});

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const sql = readFileSync(resolve(process.cwd(), "supabase/migration.sql"), "utf8");

  console.log("Executando migration no Supabase...");
  console.log("URL:", supabaseUrl);

  // O Supabase não tem um endpoint REST direto para executar SQL arbitrário
  // Precisamos usar o endpoint de management ou o pg REST
  // Vamos tentar via fetch direto ao endpoint /pg/exec

  const resp = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
    body: JSON.stringify({ sql }),
  });

  const text = await resp.text();
  console.log("Status:", resp.status);
  console.log("Response:", text);

  if (resp.ok) {
    console.log("Migration executada com sucesso!");
  } else {
    console.log("Erro ao executar migration.");
    console.log("Execute manualmente o arquivo supabase/migration.sql no SQL Editor do Supabase Dashboard.");
  }
}

runMigration().catch(console.error);
