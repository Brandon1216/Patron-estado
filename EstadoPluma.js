/**
 * Clase base que define el contrato para todos los estados de la pluma
 * Implementa la interfaz común que todos los estados específicos deben seguir
 */
class EstadoPluma {
    constructor(plumaControlador) {
        if (this.constructor === EstadoPluma) {
            throw new Error("EstadoPluma es una clase abstracta y no puede ser instanciada directamente");
        }
        this.plumaControlador = plumaControlador;
    }

    /**
     * Método para procesar una credencial
     * @param {boolean} esValida - Indica si la credencial es válida
     */
    pasarCredencial(esValida) {
        console.log("Acción no permitida en el estado actual");
    }

    /**
     * Método para detectar el paso de un vehículo
     */
    detectarPasoVehiculo() {
        console.log("No se puede detectar paso de vehículo en el estado actual");
    }

    /**
     * Método para obtener el nombre del estado
     * @returns {string} Nombre del estado actual
     */
    getNombreEstado() {
        return this.constructor.name;
    }
}

module.exports = EstadoPluma;
