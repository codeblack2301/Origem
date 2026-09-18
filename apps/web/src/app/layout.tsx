import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fonte principal para corpo do texto e formulários
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

// Fonte serifada refinada para títulos artesanais e destaques da marca Manuali
const playfairSerif = Playfair_Display({
  variable: "--font-playfair-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
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