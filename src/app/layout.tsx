import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LS_STORE — Fitness & Performance",
  description:
    "Curadoria de produtos fitness das melhores plataformas. Roupas, acessórios e equipamentos para seu treino com qualidade garantida.",
  keywords: ["fitness", "academia", "roupas fitness", "acessórios fitness", "LS_STORE"],
  openGraph: {
    title: "LS_STORE — Fitness & Performance",
    description: "Curadoria de produtos fitness das melhores plataformas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
