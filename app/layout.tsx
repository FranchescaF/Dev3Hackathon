import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@solana/wallet-adapter-react-ui/styles.css';
import "./globals.css";

// 1. Importamos el proveedor que creaste en el paso anterior
import AppWalletProvider from "./components/WalletProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VozMayor | Dev3Hackathon", // Actualizado para que luzca profesional en la pestaña
  description: "Trámites inmutables con inteligencia artificial y Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Envolvemos toda la app con el contexto de Phantom */}
        <AppWalletProvider>
            {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}