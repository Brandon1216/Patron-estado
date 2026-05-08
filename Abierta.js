const EstadoPluma = require('./EstadoPluma');

/**
 * Estado Abierta: La pluma está levantada y permite el paso
 * Espera detectar el paso del vehículo para cerrarse automáticamente
 */
class Abierta extends EstadoPluma {
    constructor(plumaControlador) {
        super(plumaControlador);
        console.log("🔓 Pluma en estado ABIERTA");
        console.log("🚗 Esperando paso del vehículo...");
    }

    /**
     * En estado abierto no se procesan credenciales (ya se concedió el acceso)
     */
    pasarCredencial(esValida) {
        console.log("ℹ️ Acceso ya concedido. Espere a que el vehículo pase para cerrar la pluma");
    }

    /**
     * Detecta el paso del vehículo y cierra la pluma automáticamente
     */
    detectarPasoVehiculo() {
        console.log("🚙 Vehículo detectado. Cerrando pluma...");
        
        // Cambiar inmediatamente al estado Cerrándose
        const Cerrandose = require('./Cerrandose');
        this.plumaControlador.cambiarEstado(new Cerrandose(this.plumaControlador));
    }
}

module.exports = Abierta;
