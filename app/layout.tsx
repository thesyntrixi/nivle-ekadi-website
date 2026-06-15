import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIVLE Designs — Mialiko ya Kidigitali yenye Mtindo",
  description:
    "NIVLE Designs inatengeneza mialiko ya kidigitali kwa harusi, kitchen party, send-off na zaidi — pamoja na kutuma kwa wageni kupitia SMS na WhatsApp na majibu ya RSVP papo hapo.",
  openGraph: {
    title: "NIVLE Designs — Mialiko ya Kidigitali yenye Mtindo",
    description:
      "Design ya kipekee, SMS kwa wageni wote, na WhatsApp na majibu ya Nitakuwepo/Sitakuwepo — chagua kifurushi kinachokufaa.",
    locale: "sw_TZ",
    type: "website",
    siteName: "NIVLE Designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIVLE Designs — Mialiko ya Kidigitali yenye Mtindo",
    description:
      "Wageni wako wanajua kila kitu — bila wewe kupiga simu hata mmoja.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sw"
      className={`${inter.variable} ${fraunces.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
