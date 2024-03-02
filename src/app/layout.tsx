import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat PDF App",
  description: "Talk to Your PDF effortless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" data-color-mode="light">
          <body className={inter.className}>{children}</body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
