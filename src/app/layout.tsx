import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const adventure = localFont({
  src: [
    { path: "../../public/fonts/Adventure-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Adventure-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Adventure-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Adventure-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-adventure",
  display: "swap",
});

const liga = localFont({
  src: [
    { path: "../../public/fonts/Liga-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Liga-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Liga-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-liga",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rivian: Electric Vehicles Designed For Adventure",
  description:
    "Discover Rivian's long-range electric vehicles, innovative EV trucks, SUVs and vans built for adventure. Join the movement towards a sustainable future.",
  keywords:
    "Rivian, electric vehicle, R1T, R1S, R2, R3, electric truck, electric SUV, adventure",
  openGraph: {
    title: "Rivian: Electric Vehicles Designed For Adventure",
    description:
      "Discover Rivian's long-range electric vehicles, innovative EV trucks, SUVs and vans built for adventure.",
    url: "https://rivian.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rivian",
  },
  icons: {
    icon: "/seo/favicon.ico",
    apple: "/seo/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#000000",
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
      data-scroll-behavior="smooth"
      className={`${adventure.variable} ${liga.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-adventure">{children}</body>
    </html>
  );
}
