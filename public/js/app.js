// Sistema de estacionamiento inteligente - Versión modular
let plumaControlador = null;
let transitionCount = 0;

// Elementos del DOM
const elements = {
    estadoActual: document.getElementById('estadoActual'),
    estadoIcon: document.getElementById('estadoIcon'),
    transicionCount: document.getElementById('transicionCount'),
    barrierArm: document.getElementById('barrierArm'),
    car: document.getElementById('car'),
    logConsole: document.getElementById('logConsole'),
    btnValidCredential: document.getElementById('btnValidCredential'),
    btnInvalidCredential: document.getElementById('btnInvalidCredential'),
    btnDetectVehicle: document.getElementById('btnDetectVehicle'),
    btnClearLog: document.getElementById('btnClearLog')
};

// Estado visual de la interfaz
const stateVisuals = {
    'Cerrada': {
        text: 'CERRADA',
        icon: '🔒',
        color: 'text-yellow-400',
        barrierClass: 'barrier-closed',
        carPosition: 'left-8'
    },
    'Abriendose': {
        text: 'ABRIÉNDOSE',
        icon: '🔄',
        color: 'text-blue-400',
        barrierClass: 'barrier-up',
        carPosition: 'left-8'
    },
    'Abierta': {
        text: 'ABIERTA',
        icon: '🔓',
        color: 'text-green-400',
        barrierClass: 'barrier-open',
        carPosition: 'left-1/2 -translate-x-1/2'
    },
    'Cerrandose': {
        text: 'CERRÁNDOSE',
        icon: '🔄',
        color: 'text-orange-400',
        barrierClass: 'barrier-down',
        carPosition: 'left-1/2 -translate-x-1/2'
    }
};

// Inicializar el sistema
async function initializeSystem() {
    try {
        // Importar el PlumaControlador modular
        const PlumaControlador = (await import('/PlumaControlador.js')).default;
        
        // Crear instancia del controlador
        plumaControlador = new PlumaControlador();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Actualizar estado inicial
        updateStateDisplay();
        
        addLog('✅ Sistema modular inicializado correctamente', 'success');
        addLog('🎯 Patrón de Estado en archivos separados', 'info');
    } catch (error) {
        console.error('Error al inicializar el sistema modular:', error);
        addLog('❌ Error al inicializar el sistema: ' + error.message, 'error');
        
        // Fallback: crear un sistema simulado
        createFallbackSystem();
    }
}

// Configurar event listeners
function setupEventListeners() {
    elements.btnValidCredential.addEventListener('click', () => {
        handleCredential(true);
    });
    
    elements.btnInvalidCredential.addEventListener('click', () => {
        handleCredential(false);
    });
    
    elements.btnDetectVehicle.addEventListener('click', () => {
        handleVehicleDetection();
    });
    
    elements.btnClearLog.addEventListener('click', () => {
        clearLog();
    });
}

// Manejar credenciales
function handleCredential(isValid) {
    if (!plumaControlador) return;
    
    addLog(`🎫 Recibiendo credencial: ${isValid ? 'VÁLIDA ✅' : 'INVÁLIDA ❌'}`, isValid ? 'success' : 'error');
    
    // Guardar estado anterior para comparar
    const previousState = plumaControlador.getEstadoActual();
    
    // Procesar credencial
    plumaControlador.pasarCredencial(isValid);
    
    // Verificar si hubo cambio de estado
    const currentState = plumaControlador.getEstadoActual();
    if (previousState !== currentState) {
        transitionCount++;
        elements.transicionCount.textContent = transitionCount;
        
        // Animar la barrera si está abriéndose
        if (currentState === 'Abriendose') {
            animateBarrierOpening();
        }
    }
    
    updateStateDisplay();
}

// Manejar detección de vehículo
function handleVehicleDetection() {
    if (!plumaControlador) return;
    
    addLog('👁️ Detectando paso de vehículo...', 'info');
    
    // Guardar estado anterior
    const previousState = plumaControlador.getEstadoActual();
    
    // Procesar detección
    plumaControlador.detectarPasoVehiculo();
    
    // Verificar si hubo cambio de estado
    const currentState = plumaControlador.getEstadoActual();
    if (previousState !== currentState) {
        transitionCount++;
        elements.transicionCount.textContent = transitionCount;
        
        // Animar el cierre y el paso del vehículo
        animateVehiclePassing();
    }
    
    updateStateDisplay();
}

// Actualizar visualización del estado
function updateStateDisplay() {
    if (!plumaControlador) return;
    
    const currentState = plumaControlador.getEstadoActual();
    const visual = stateVisuals[currentState];
    
    if (visual) {
        // Actualizar texto e icono
        elements.estadoActual.textContent = visual.text;
        elements.estadoIcon.textContent = visual.icon;
        
        // Actualizar color
        elements.estadoActual.className = `text-3xl font-bold ${visual.color}`;
        
        // Actualizar posición del coche
        elements.car.className = `car-animation absolute bottom-24 ${visual.carPosition} w-16 h-10`;
        
        // Actualizar estado del botón de detección
        elements.btnDetectVehicle.disabled = currentState !== 'Abierta';
        
        // Actualizar la barrera
        updateBarrier(visual.barrierClass);
    }
}

// Actualizar la barrera
function updateBarrier(barrierClass) {
    // Remover todas las clases de barrera
    elements.barrierArm.classList.remove('barrier-closed', 'barrier-open', 'barrier-up', 'barrier-down');
    
    // Agregar la nueva clase
    elements.barrierArm.classList.add(barrierClass);
}

// Animar apertura de barrera
function animateBarrierOpening() {
    addLog('🔄 Levantando pluma...', 'info');
    
    // Remover clases previas
    elements.barrierArm.classList.remove('barrier-closed', 'barrier-open', 'barrier-down');
    
    // Agregar animación de apertura
    elements.barrierArm.classList.add('barrier-up');
    
    // Después de la animación, actualizar a estado abierto
    setTimeout(() => {
        elements.barrierArm.classList.remove('barrier-up');
        elements.barrierArm.classList.add('barrier-open');
        updateStateDisplay();
        addLog('🔓 Pluma completamente abierta', 'success');
        addLog('🚗 Esperando paso del vehículo...', 'info');
    }, 2000);
}

// Animar paso del vehículo y cierre
function animateVehiclePassing() {
    addLog('🚙 Vehículo detectado. Cerrando pluma...', 'info');
    
    // Mover el coche
    elements.car.classList.add('car-passing');
    
    // Iniciar cierre de barrera después de un pequeño delay
    setTimeout(() => {
        elements.barrierArm.classList.remove('barrier-closed', 'barrier-open', 'barrier-up');
        elements.barrierArm.classList.add('barrier-down');
        
        // Después de cerrar, resetear todo
        setTimeout(() => {
            elements.barrierArm.classList.remove('barrier-down');
            elements.barrierArm.classList.add('barrier-closed');
            elements.car.classList.remove('car-passing');
            updateStateDisplay();
            addLog('🔒 Pluma completamente cerrada', 'warning');
        }, 1500);
    }, 500);
}

// Agregar mensaje a la consola
function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    
    // Configurar colores según el tipo
    const colorClasses = {
        'success': 'text-green-400',
        'error': 'text-red-400',
        'warning': 'text-yellow-400',
        'info': 'text-blue-400'
    };
    
    logEntry.className = colorClasses[type] || 'text-gray-400';
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    elements.logConsole.appendChild(logEntry);
    
    // Auto-scroll al final
    elements.logConsole.scrollTop = elements.logConsole.scrollHeight;
    
    // Limitar número de mensajes
    while (elements.logConsole.children.length > 50) {
        elements.logConsole.removeChild(elements.logConsole.firstChild);
    }
}

// Limpiar consola
function clearLog() {
    elements.logConsole.innerHTML = '';
    addLog('🚦 Consola limpiada', 'info');
}

// Sistema de fallback para cuando los módulos no se pueden cargar
function createFallbackSystem() {
    console.log('Creando sistema de fallback...');
    
    plumaControlador = {
        estadoActual: 'Cerrada',
        getEstadoActual: function() {
            return this.estadoActual;
        },
        pasarCredencial: function(esValida) {
            const previousState = this.estadoActual;
            
            if (this.estadoActual === 'Cerrada' && esValida) {
                this.estadoActual = 'Abriendose';
                setTimeout(() => {
                    this.estadoActual = 'Abierta';
                    updateStateDisplay();
                    addLog('🔓 Pluma completamente abierta', 'success');
                    addLog('🚗 Esperando paso del vehículo...', 'info');
                }, 2000);
            } else if (this.estadoActual === 'Abierta') {
                // No hacer nada, ya está abierta
            }
        },
        detectarPasoVehiculo: function() {
            if (this.estadoActual === 'Abierta') {
                this.estadoActual = 'Cerrandose';
                updateStateDisplay();
                addLog('🔄 Pluma en estado CERRÁNDOSE', 'info');
                
                setTimeout(() => {
                    this.estadoActual = 'Cerrada';
                    updateStateDisplay();
                    addLog('🔒 Pluma completamente cerrada', 'warning');
                }, 2000);
            }
        }
    };
    
    setupEventListeners();
    updateStateDisplay();
    addLog('⚠️ Usando sistema de demostración (módulos no disponibles)', 'warning');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeSystem);

// Manejar errores globales
window.addEventListener('error', (event) => {
    console.error('Error global:', event.error);
    addLog('❌ Error en la aplicación', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no manejada:', event.reason);
    addLog('❌ Error asíncrono no manejado', 'error');
});
