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
  title: "Coached by Shweta — Lose 5–8 kg in 12 Weeks Without Extreme Dieting",
  description:
    "Online 1:1 fitness coaching for busy Indian women in USA & Canada. Personalised nutrition, workouts, and accountability — without extreme dieting.",
  openGraph: {
    title: "Coached by Shweta",
    description:
      "Lose 5–8 kg in 12 Weeks Without Extreme Dieting. For busy Indian women in USA & Canada.",
    type: "website",
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
