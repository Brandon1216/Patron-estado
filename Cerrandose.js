const EstadoPluma = require('./EstadoPluma');

/**
 * Estado Cerrándose: La pluma está en proceso de bajarse
 * Es un estado transitorio que automáticamente cambia a Cerrada
 */
class Cerrandose extends EstadoPluma {
    constructor(plumaControlador) {
        super(plumaControlador);
        console.log("🔄 Pluma en estado CERRÁNDOSE");
        
        // Simular el tiempo que toma cerrar la pluma
        setTimeout(() => {
            this.completarCierre();
        }, 2000);
    }

    /**
     * Método privado que completa el cierre de la pluma
     */
    completarCierre() {
        console.log("🔒 Pluma completamente cerrada");
        const Cerrada = require('./Cerrada');
        this.plumaControlador.cambiarEstado(new Cerrada(this.plumaControlador));
    }

    /**
     * Durante el estado de cierre no se aceptan más credenciales
     */
    pasarCredencial(esValida) {
        console.log("⏳ Procesando cierre anterior. Espere a que la pluma termine de cerrarse");
    }

    /**
     * Durante el estado de cierre no se puede detectar paso de vehículo
     */
    detectarPasoVehiculo() {
        console.log("⚠️ No se puede detectar paso de vehículo: La pluma aún está cerrándose");
    }
}

module.exports = Cerrandose;
