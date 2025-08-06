import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "João Rolla - Artista Musical",
  description: "Descobrindo novos horizontes sonoros. EP AURORA - Lançamento em 15 de Março, 2025",
  keywords: "João Rolla, música, EP, AURORA, electronic, indie pop, alternative",
  authors: [{ name: "João Rolla" }],
  creator: "João Rolla",
  openGraph: {
    title: "João Rolla - Artista Musical",
    description: "Descobrindo novos horizontes sonoros. EP AURORA - Lançamento em 15 de Março, 2025",
    url: "https://joaorolla.com.br",
    siteName: "João Rolla",
    images: [
      {
        url: "/api/placeholder/1200/630",
        width: 1200,
        height: 630,
        alt: "João Rolla - EP AURORA",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Rolla - Artista Musical",
    description: "Descobrindo novos horizontes sonoros. EP AURORA - Lançamento em 15 de Março, 2025",
    images: ["/api/placeholder/1200/630"],
    creator: "@joaorollamusic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
