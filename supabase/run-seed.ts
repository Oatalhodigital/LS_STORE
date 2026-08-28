import { readFileSync } from "fs";
import { resolve } from "path";

// Carregar .env manualmente
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

// Agora importar o seed
import("./seed");
