use anchor_lang::prelude::*;

declare_id!("EoHkqQVDX5rdYJVrZdCZVAY848TExEsbuWB8NLs7sQoV");

#[program]
pub mod contigo_voz {
    use super::*;

    // Función 1: El abuelito inicia el trámite con su voz
    pub fn registrar_solicitud(ctx: Context<RegistrarSolicitud>, monto: u64) -> Result<()> {
        let solicitud = &mut ctx.accounts.solicitud;
        
        // Guardamos los datos en la blockchain
        solicitud.titular = ctx.accounts.abuelito.key();
        solicitud.monto = monto;
        solicitud.estado = String::from("Pendiente");
        
        msg!("¡Éxito! Solicitud registrada para el titular: {} por {} SOL", solicitud.titular, monto);
        Ok(())
    }

    // Función 2: La AFP/LI.FI aprueba y fondea
    pub fn aprobar_retiro(ctx: Context<AprobarRetiro>) -> Result<()> {
        let solicitud = &mut ctx.accounts.solicitud;
        
        // Cambiamos el estado (Esto quedará grabado para siempre como certificado)
        solicitud.estado = String::from("Aprobado y Fondeado");
        
        msg!("La AFP ha aprobado el retiro. Estado actual: {}", solicitud.estado);
        Ok(())
    }
}

// --- ESTRUCTURAS DE CUENTAS (LOS PERMISOS) ---

#[derive(Accounts)]
pub struct RegistrarSolicitud<'info> {
    #[account(
        init, 
        payer = abuelito, 
        space = 8 + 32 + 8 + 32 // Espacio en memoria que ocupará este "documento"
    )]
    pub solicitud: Account<'info, SolicitudAfp>,
    
    #[account(mut)]
    pub abuelito: Signer<'info>, // Quien ejecuta esto debe firmar (El celular del abuelo)
    
    pub system_program: Program<'info, System>, // Programa base de Solana
}

#[derive(Accounts)]
pub struct AprobarRetiro<'info> {
    #[account(mut)]
    pub solicitud: Account<'info, SolicitudAfp>, // Traemos la solicitud creada antes para modificarla
}

// --- EL "DOCUMENTO" QUE SE GUARDA EN LA BLOCKCHAIN ---
#[account]
pub struct SolicitudAfp {
    pub titular: Pubkey, // Dirección de la wallet del abuelo (32 bytes)
    pub monto: u64,      // Cantidad a retirar (8 bytes)
    pub estado: String,  // Texto: "Pendiente" o "Aprobado" (aprox 32 bytes)
}
