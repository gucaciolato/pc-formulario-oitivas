import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Termo de Declarações - Violência Psicológica e Perseguição (Stalking)",
  description: "Sistema Forense da Polícia Civil do Estado de São Paulo para elaboração de Termo de Oitiva e Declarações nos crimes de perseguição e violência psicológica com geração de PDF oficial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
