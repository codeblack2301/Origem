import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fontes auto-hospedadas (woff2 em src/app/fonts). Evita o fetch do Google em
// tempo de build do Turbopack, que quebra em redes restritas (CI/container)
// com "Can't resolve '@vercel/turbopack-next/internal/font/google/font'".
const interSans = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter-sans",
});

// Fonte serifada refinada para títulos artesanais e destaques da marca Manuali
const playfairSerif = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair-serif",
});
export const metadata: Metadata = {
  title: "Manuali — Economia Criativa e Artesanato Pernambucano",
  description:
    "Conectamos os mestres do barro, da renda e da madeira diretamente com admiradores da nossa economia criativa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${interSans.variable} ${playfairSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-creme text-marrom-escuro">
        {children}
      </body>
    </html>
  );
}