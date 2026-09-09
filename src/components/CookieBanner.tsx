"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-azul shadow-lg p-4 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm text-center sm:text-left">
          Usamos cookies para melhorar sua experiência e rastrear o desempenho
          de nossas campanhas. Ao continuar, você concorda com nossa{" "}
          <Link href="/privacidade" className="text-azul underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-gray-600 hover:text-preto text-sm font-semibold px-4 py-2 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="bg-azul hover:bg-azul-escuro text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
