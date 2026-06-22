import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Le Quang Dieu (Dylan) | Supply Chain & Inventory Analyst Portfolio",
  description: "Professional fantasy game-inspired portfolio of Le Quang Dieu, featuring interactive skill trees, operational dashboards, and automation workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="font-outfit text-slate-100 antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
