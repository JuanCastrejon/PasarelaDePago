import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "PasarelaDePago",
  description:
    "Esqueleto operativo y tecnico para una plataforma de payment orchestration en Colombia."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
        style={{
          fontFamily: "var(--font-body)"
        }}
      >
        {children}
      </body>
    </html>
  );
}
