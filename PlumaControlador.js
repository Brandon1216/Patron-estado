const Cerrada = require('./Cerrada');

/**
 * Clase Contexto que mantiene la instancia del estado actual de la pluma
 * Actúa como intermediario entre el cliente y los estados concretos
 */
class PlumaControlador {
    constructor() {
        // Estado inicial: la pluma comienza cerrada
        this.estadoActual = new Cerrada(this);
        console.log("🚦 Sistema de Estacionamiento Inteligente Iniciado");
        console.log("================================================");
    }

    /**
     * Cambia el estado actual de la pluma
     * @param {EstadoPluma} nuevoEstado - Nuevo estado al que se cambiará
     */
    cambiarEstado(nuevoEstado) {
        const estadoAnterior = this.estadoActual.getNombreEstado();
        this.estadoActual = nuevoEstado;
        console.log(`📊 Transición: ${estadoAnterior} → ${this.estadoActual.getNombreEstado()}`);
    }

    /**
     * Delega el procesamiento de credenciales al estado actual
     * @param {boolean} esValida - Indica si la credencial es válida
     */
    pasarCredencial(esValida) {
        console.log(`\n🎫 Recibiendo credencial: ${esValida ? 'VÁLIDA ✅' : 'INVÁLIDA ❌'}`);
        this.estadoActual.pasarCredencial(esValida);
    }

    /**
     * Delega la detección de paso de vehículo al estado actual
     */
    detectarPasoVehiculo() {
        console.log("\n👁️ Detectando paso de vehículo...");
        this.estadoActual.detectarPasoVehiculo();
    }

    /**
     * Obtiene el nombre del estado actual
     * @returns {string} Nombre del estado actual
     */
    getEstadoActual() {
        return this.estadoActual.getNombreEstado();
    }

    /**
     * Muestra el estado actual de la pluma
     */
    mostrarEstado() {
        console.log(`\n📍 Estado actual de la pluma: ${this.getEstadoActual()}`);
    }
}

module.exports = PlumaControlador;
