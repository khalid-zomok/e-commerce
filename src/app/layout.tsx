import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import FirstNav from "./_components/FirstNav/FirstNav";
import UpperFooter from "./_components/UpperFooter/UpperFooter";
import { Toaster } from "@/components/ui/sonner";
import MyProvider from "./_components/MyProvider/MyProvider";
import CartContextProvider from "@/context/CartContext";
import WishlistContextProvider from "@/context/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description:
    "FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MyProvider>
          <WishlistContextProvider>
        <CartContextProvider>
          <FirstNav />
          <Navbar />
          {children}
          <Toaster />
          <UpperFooter />
          <Footer />
        </CartContextProvider>
        </WishlistContextProvider>
        </MyProvider>
      </body>
    </html>
  );
}
