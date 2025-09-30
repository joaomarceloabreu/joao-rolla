import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});


export const metadata: Metadata = {
  title: "João Rolla - Artista Musical",
  description: "Mente sã e samba. Álbum 'Só queria falar de amor' - Uma jornada sonora pela cultura brasileira e bem-estar",
  keywords: "João Rolla, música, álbum, Só queria falar de amor, samba, MPB, cultura brasileira, mente sã",
  authors: [{ name: "João Rolla" }],
  creator: "João Rolla",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/JR.png",
    apple: "/JR.png",
  },
  openGraph: {
    title: "João Rolla - Artista Musical",
    description: "Mente sã e samba. Álbum 'Só queria falar de amor' - Uma jornada sonora pela cultura brasileira e bem-estar",
    url: "https://joaorolla.com.br",
    siteName: "João Rolla",
    images: [
      {
        url: "/images/placeholder-1200x630.svg",
        width: 1200,
        height: 630,
        alt: "João Rolla - Só queria falar de amor",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Rolla - Artista Musical",
    description: "Mente sã e samba. Álbum 'Só queria falar de amor' - Uma jornada sonora pela cultura brasileira e bem-estar",
    images: ["/images/placeholder-1200x630.svg"],
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
      <body className={`${openSans.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
