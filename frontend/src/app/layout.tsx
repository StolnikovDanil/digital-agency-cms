import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Digital Agency | Web Development Studio",
    description:
        "We build digital products that grow your business — web development, design and strategy for startups and companies ready to scale online.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />

        <main className="flex-1">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}