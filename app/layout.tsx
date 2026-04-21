import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans, Dancing_Script } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
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
    "Online 1:1 fitness & nutrition coaching for busy Indian women all over the world. Personalised meal plans, home workouts, and accountability - lose 5–8 kg in 12 weeks without extreme dieting. 500+ women coached.",
  keywords: [
    "online fitness coach",
    "Indian women fitness USA",
    "Indian women fitness worldwide",
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
      "Online 1:1 fitness & nutrition coaching for busy Indian women all over the world. 500+ women coached. Apply for limited spots.",
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
      "Online 1:1 fitness coaching for busy Indian women all over the world. Personalised nutrition, workouts & accountability.",
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
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1656013225576369');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1656013225576369&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          {children}
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
