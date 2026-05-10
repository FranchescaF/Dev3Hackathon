"use client"
import Script from "next/script";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState } from "react";

export default function DashboardContigo() {
    // Hooks de Solana para leer la billetera de Phantom
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [estadoTx, setEstadoTx] = useState("");

    // Función que se dispara cuando el abuelo termina de hablar
    const registrarEnBlockchain = async () => {
        if (!publicKey) {
            setEstadoTx("⚠️ Por favor, conecta tu billetera Phantom arriba a la derecha.");
            return;
        }

        try {
            setEstadoTx("⏳ Abre Phantom y aprueba la transacción...");
            
            // --- AQUÍ IRÁ LA LÓGICA DE TU SMART CONTRACT ---
            // Por ahora solo simularemos la llamada para que veas que conecta
            console.log("Conectado con la wallet:", publicKey.toBase58());
            
            // Simulación de éxito
            setTimeout(() => {
                setEstadoTx("✅ ¡Trámite registrado inmutablemente en Solana!");
            }, 2000);

        } catch (error) {
            console.error(error);
            setEstadoTx("❌ Error al firmar la transacción.");
        }
    };

    return(
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-start">
            
            {/* Panel Izquierdo: El Agente de Voz */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Habla con tu Asistente</h2>
                <Script
                    src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                    strategy="afterInteractive"
                />
                {/* @ts-ignore */}
                <elevenlabs-convai agent-id="agent_7801kr5reh6jevybhhjfny09c10z"></elevenlabs-convai>
            </div>

            {/* Panel Derecho: La Blockchain (Solana) */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Confirmar Trámite</h2>
                <p className="text-gray-600 mb-6">
                    Una vez que el asistente confirme tus datos, presiona el botón para registrar tu solicitud en la red de Solana.
                </p>
                
                <button 
                    onClick={registrarEnBlockchain}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all shadow-md"
                >
                    Registrar y Firmar
                </button>

                {estadoTx && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg w-full font-mono text-sm">
                        {estadoTx}
                    </div>
                )}
            </div>

        </div>
    );
}

