import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/ThemeToggle";


const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Framer-Motion Lesson",
  description: "Learning framer Motion with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased`}
        >
          <Providers>
            {children}
          </Providers> 
        </body>
      </html>
    
  );
}
