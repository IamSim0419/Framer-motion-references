import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider} from "./components/ThemeToggle";

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
    <ThemeProvider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
            {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
