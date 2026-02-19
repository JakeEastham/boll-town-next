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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bollingtontownfc.co.uk"
  ),
  title: {
    default: "Bollington Town FC | The leading Football club in Bollington",
    template: "%s | Bollington Town FC",
  },
  description:
    "Official website of Bollington Town Football Club. Fixtures, results, news, and squad information for the leading football club in Bollington, Cheshire.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              name: "Bollington Town FC",
              url: "https://bollingtontownfc.co.uk",
              sport: "Football",
              logo: "https://bollingtontownfc.co.uk/images/logo.png",
              location: {
                "@type": "Place",
                name: "All Hallows Catholic College",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Macclesfield",
                  addressRegion: "Cheshire",
                  addressCountry: "GB",
                },
              },
              foundingDate: "2021",
              memberOf: {
                "@type": "SportsOrganization",
                name: "Cheshire Football League",
              },
              sameAs: [
                "https://instagram.com/bollingtontownfc",
                "https://facebook.com/bollingtontownfc",
                "https://twitter.com/bollingtontown",
              ],
            }),
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
