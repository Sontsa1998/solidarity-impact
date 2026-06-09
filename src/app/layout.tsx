import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { ClientLayout } from "@/components/providers/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solidarityimpact.org"),
  title: {
    default: "Solidarity Impact — Solidarité Franco-Camerounaise",
    template: "%s — Solidarity Impact",
  },
  description:
    "Association loi 1901 menant des actions solidaires entre la France et le Cameroun : éducation, orphelinats, développement local.",
  openGraph: {
    title: "Solidarity Impact — Solidarité Franco-Camerounaise",
    description:
      "Association loi 1901 franco-camerounaise : éducation, aide aux orphelinats et développement local.",
    url: "https://solidarityimpact.org",
    siteName: "Solidarity Impact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Solidarity Impact" }],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solidarity Impact",
    description: "Association franco-camerounaise — Loi 1901",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={poppins.variable} suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        {/*
          Skip link accessibilité clavier — doit rester en dehors des providers
          pour être le premier élément focusable de la page.
        */}
        <a href="#main-content" className="sr-only">
          Aller au contenu principal
        </a>

        <ThemeProvider>
          <I18nProvider>
            <ClientLayout>{children}</ClientLayout>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
