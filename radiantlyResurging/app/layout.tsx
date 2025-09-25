import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { Metadata } from "next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export const metadata: Metadata = {
  title:
    "RadiantlyResurging - Christian Wellness & Personal Growth Community",
  description:
    "Join RadiantlyResurging, a faith-based community dedicated to holistic wellness and personal growth. Discover Christian inspiration, mindfulness practices, self-care tips, and transformative content.",
  keywords: [
    "Christian",
    "Blog",
    "Wellness",
    "Health",
    "Personal Growth",
    "Faith",
    "Inspiration",
    "Spirituality"
  ],
  authors: [{ name: "kyalo460" }],
  creator: "kyalo460",
  publisher: "RadiantlyResurging",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code" // You'll get this from Google Search Console
  },
  icons: {
    icon: "/img/icons/favicon_io/favicon-32x32.png",
    shortcut: "/img/icons/favicon_io/favicon-32x32.png",
    apple: "/img/icons/favicon_io/favicon-32x32.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable)}>
      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1152993289561686"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
