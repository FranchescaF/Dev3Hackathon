import DashboardContigo from "../components/dashboardContigo";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Barra superior con el botón de conectar Phantom */}
      <div className="w-full max-w-4xl flex justify-end mb-8">
        <WalletMultiButton />
      </div>

      {/* Contenedor del Agente y las transacciones */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <DashboardContigo />
      </div>
    </div>
  );
}

