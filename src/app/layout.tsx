import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const mona = localFont({
  src: '../../public/fonts/Mona-Sans.ttf',
  variable: "--font-mona",
});
    

export const metadata: Metadata = {
  title: "Tokena",
  description: "Crypto website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mona.variable}`}>{children}</body>
    </html>
  );
}
