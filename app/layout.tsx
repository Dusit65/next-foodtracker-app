import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin"],
  weight:["100","200","300","400","500","600","700","800","900"],
});



export const metadata: Metadata = {
  title: "Food Tracker App V0.1.0",
  description: "Food Tracker for everybody",
  keywords: ["Food", "Tracker", "อาหาร", "ติดตาม"],
  icons: {
    icon: "/next.svg",
    shortcut: "/shortcut.png",
  },
  authors: [
    {
      name: "Dusit65",
      url: "https://github.com/Dusit168",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${prompt.className}`}
      >
        {children}
      </body>
    </html>
  );
}
