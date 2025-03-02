import type { Metadata } from "next";
import { Lato, Roboto_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/ui/TopBar";

const lato = Lato({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${lato.variable} antialiased pt-6 h-full`}>
        <TopBar />
        <main className="mt-8 h-full">{children}</main>
      </body>
    </html>
  );
}
