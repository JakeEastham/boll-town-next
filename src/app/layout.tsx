import type { Metadata } from "next";
import { Roboto_Condensed, Oswald } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Bollington Town FC | Community Football in Bollington",
    template: "%s | Bollington Town FC",
  },
  description:
    "Official website of Bollington Town Football Club. Fixtures, results, news, and squad information for our community football club in Bollington, Macclesfield, Cheshire.",
  keywords: [
    "Bollington",
    "football",
    "football club",
    "Cheshire",
    "grassroots football",
    "Macclesfield",
    "community football",
    "BTFC",
  ],
  authors: [{ name: "Bollington Town FC" }],
  creator: "Bollington Town FC",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bollingtontownfc.co.uk",
    siteName: "Bollington Town FC",
    title: "Bollington Town FC | Community Football in Bollington",
    description:
      "Official website of Bollington Town Football Club. Fixtures, results, news, and squad information.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bollington Town FC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bollington Town FC",
    description: "Official website of Bollington Town Football Club",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} ${oswald.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
