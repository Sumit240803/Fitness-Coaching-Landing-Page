import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Coached by Shweta - Lose 5–8 kg in 12 Weeks Without Extreme Dieting",
    template: "%s | Coached by Shweta",
  },
  description:
    "Online 1:1 fitness & nutrition coaching for busy Indian women in USA & Canada. Personalised meal plans, home workouts, and accountability - lose 5–8 kg in 12 weeks without extreme dieting. 500+ women coached.",
  keywords: [
    "online fitness coach",
    "Indian women fitness USA",
    "Indian women fitness Canada",
    "lose weight without dieting",
    "1:1 nutrition coaching",
    "online personal trainer for women",
    "coached by shweta",
    "weight loss coach Indian women",
    "12 week fitness program",
    "personalised meal plan",
    "home workout program",
    "postpartum weight loss",
    "PCOS weight loss coach",
    "desi diet plan",
  ],
  authors: [{ name: "Shweta", url: "https://coachedbyshweta.co" }],
  creator: "Coached by Shweta",
  metadataBase: new URL("https://coachedbyshweta.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coached by Shweta - Lose 5–8 kg in 12 Weeks Without Extreme Dieting",
    description:
      "Online 1:1 fitness & nutrition coaching for busy Indian women in USA & Canada. 500+ women coached. Apply for limited spots.",
    url: "https://coachedbyshweta.co",
    siteName: "Coached by Shweta",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/shweta/2.jpeg",
        width: 1200,
        height: 630,
        alt: "Coached by Shweta - Online Fitness Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coached by Shweta - Lose 5–8 kg in 12 Weeks",
    description:
      "Online 1:1 fitness coaching for busy Indian women in USA & Canada. Personalised nutrition, workouts & accountability.",
    images: ["/assets/shweta/2.jpeg"],
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
