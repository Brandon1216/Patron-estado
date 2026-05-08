const EstadoPluma = require('./EstadoPluma');

/**
 * Estado Abriéndose: La pluma está en proceso de levantarse
 * Es un estado transitorio que automáticamente cambia a Abierta
 */
class Abriendose extends EstadoPluma {
    constructor(plumaControlador) {
        super(plumaControlador);
        console.log("🔄 Pluma en estado ABRIÉNDOSE");
        
        // Simular el tiempo que toma abrir la pluma
        setTimeout(() => {
            this.completarApertura();
        }, 2000);
    }

    /**
     * Método privado que completa la apertura de la pluma
     */
    completarApertura() {
        console.log("🔓 Pluma completamente abierta");
        const Abierta = require('./Abierta');
        this.plumaControlador.cambiarEstado(new Abierta(this.plumaControlador));
    }

    /**
     * Durante el estado de apertura no se aceptan más credenciales
     */
    pasarCredencial(esValida) {
        console.log("⏳ Procesando apertura anterior. Espere a que la pluma termine de abrirse");
    }

    /**
     * Durante el estado de apertura no se puede detectar paso de vehículo
     */
    detectarPasoVehiculo() {
        console.log("⚠️ No se puede detectar paso de vehículo: La pluma aún está abriéndose");
    }
}

module.exports = Abriendose;
