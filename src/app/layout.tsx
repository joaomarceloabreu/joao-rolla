import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import EmotionRegistry from "@/components/EmotionRegistry";
import StyledComponentsRegistry from "@/lib/styledComponentsRegistry";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

const carina = localFont({
  src: [
    {
      path: '../fonts/carina.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/carina.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/carina.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-carina',
  display: 'swap',
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
  other: {
    "X-UA-Compatible": "IE=edge",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={`${openSans.variable} ${carina.variable}`} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <EmotionRegistry>
            <Layout>{children}</Layout>
          </EmotionRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
