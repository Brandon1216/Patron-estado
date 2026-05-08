const EstadoPluma = require('./EstadoPluma');

/**
 * Estado Cerrada: La pluma está bajada y bloquea el paso
 * Solo puede reaccionar a credenciales válidas para comenzar a abrirse
 */
class Cerrada extends EstadoPluma {
    constructor(plumaControlador) {
        super(plumaControlador);
        console.log(" Pluma en estado CERRADA");
    }

    /**
     * Solo permite el paso si la credencial es válida
     * @param {boolean} esValida - Indica si la credencial es válida
     */
    pasarCredencial(esValida) {
        if (esValida) {
            console.log("Acceso concedido: Levantando pluma...");
            // Cambiar al estado Abriéndose
            const Abriendose = require('./Abriendose');
            this.plumaControlador.cambiarEstado(new Abriendose(this.plumaControlador));
        } else {
            console.log("Acceso denegado: Credencial inválida");
        }
    }

    /**
     * En estado cerrado no se puede detectar paso de vehículo
     */
    detectarPasoVehiculo() {
        console.log("No se puede detectar paso de vehículo: La pluma está cerrada");
    }
}

module.exports = Cerrada;
