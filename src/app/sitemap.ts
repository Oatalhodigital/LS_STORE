import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const supabase = createClient();

  const [{ data: produtos }, { data: categorias }] = await Promise.all([
    supabase
      .from("produtos")
      .select("slug, updated_at")
      .eq("status", "ativo"),
    supabase.from("categorias").select("slug"),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/produtos`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/sobre`, lastModified: new Date(), priority: 0.5 },
    { url: `${siteUrl}/privacidade`, lastModified: new Date(), priority: 0.3 },
  ];

  const categoriaPages: MetadataRoute.Sitemap = (categorias || []).map((cat: any) => ({
    url: `${siteUrl}/produtos?categoria=${cat.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const produtoPages: MetadataRoute.Sitemap = (produtos || []).map((p: any) => ({
    url: `${siteUrl}/produtos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    priority: 0.8,
  }));

  return [...staticPages, ...categoriaPages, ...produtoPages];
}
