import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@solana/wallet-adapter-react-ui/styles.css';
import "./globals.css"; 

// Importamos el proveedor de la billetera
import {AppWalletProvider} from "./components/WalletProvider";

// Usamos la fuente estándar y segura
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VozMayor | Dev3Hackathon", 
  description: "Trámites inmutables con inteligencia artificial y Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* Envolvemos toda la app con el contexto de Phantom */}
        <AppWalletProvider>
            {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}