# PROMPT PARA GENERAR DIAGRAMA UML - PATRÓN DE ESTADO



---

### **Contexto del Proyecto**
Sistema de estacionamiento inteligente con una barrera/pluma controlada por el Patrón de Estado.

### **Clases del Sistema**

#### **1. EstadoPluma (Clase Base Abstracta)**
```javascript
class EstadoPluma {
    constructor(plumaControlador) {
        this.plumaControlador = plumaControlador;
    }
    
    pasarCredencial(esValida) {
        console.log("Acción no permitida en el estado actual");
    }
    
    detectarPasoVehiculo() {
        console.log("No se puede detectar paso de vehículo en el estado actual");
    }
    
    getNombreEstado() {
        return this.constructor.name;
    }
}
```

#### **2. PlumaControlador (Contexto)**
```javascript
class PlumaControlador {
    constructor() {
        this.estadoActual = new Cerrada(this);
    }
    
    cambiarEstado(nuevoEstado) {
        const estadoAnterior = this.estadoActual.getNombreEstado();
        this.estadoActual = nuevoEstado;
        console.log(`Transición: ${estadoAnterior} → ${this.estadoActual.getNombreEstado()}`);
    }
    
    pasarCredencial(esValida) {
        this.estadoActual.pasarCredencial(esValida);
    }
    
    detectarPasoVehiculo() {
        this.estadoActual.detectarPasoVehiculo();
    }
}
```

#### **3. Cerrada (Estado Concreto)**
```javascript
class Cerrada extends EstadoPluma {
    pasarCredencial(esValida) {
        if (esValida) {
            this.plumaControlador.cambiarEstado(new Abriendose(this.plumaControlador));
        } else {
            console.log("Acceso denegado");
        }
    }
    
    detectarPasoVehiculo() {
        console.log("No se puede detectar paso: La pluma está cerrada");
    }
}
```

#### **4. Abriendose (Estado Concreto Transitorio)**
```javascript
class Abriendose extends EstadoPluma {
    constructor(plumaControlador) {
        super(plumaControlador);
        setTimeout(() => this.completarApertura(), 2000);
    }
    
    completarApertura() {
        this.plumaControlador.cambiarEstado(new Abierta(this.plumaControlador));
    }
    
    pasarCredencial(esValida) {
        console.log("Procesando apertura anterior. Espere...");
    }
}
```

#### **5. Abierta (Estado Concreto)**
```javascript
class Abierta extends EstadoPluma {
    pasarCredencial(esValida) {
        console.log("Acceso ya concedido. Espere a que el vehículo pase");
    }
    
    detectarPasoVehiculo() {
        console.log("Vehículo detectado. Cerrando pluma...");
        setTimeout(() => this.completarCierre(), 1500);
    }
    
    completarCierre() {
        this.plumaControlador.cambiarEstado(new Cerrada(this.plumaControlador));
    }
}
```

---

### **Requisitos del Diagrama**

#### **1. Diagrama de Clases UML**
- Mostrar todas las 5 clases
- Indicar que EstadoPluma es abstracta/interface
- Mostrar herencia de los estados concretos
- Mostrar composición entre PlumaControlador y EstadoPluma
- Incluir atributos y métodos principales

#### **2. Diagrama de Secuencia**
- Flujo: Usuario → PlumaControlador → EstadoActual
- Mostrar transición: Cerrada → Abriendose → Abierta → Cerrada
- Incluir llamadas a métodos y temporizadores

#### **3. Diagrama de Estados**
- Estados: Cerrada, Abriendose, Abierta
- Transiciones con condiciones
- Eventos que provocan cambios

#### **4. Relaciones a Mostrar**
- **Herencia**: Cerrada, Abriendose, Abierta → EstadoPluma
- **Composición**: PlumaControlador → EstadoPluma
- **Dependencia**: Estados → PlumaControlador (para cambiar estado)

### **Notación UML Requerida**
- Clases con atributos y métodos
- Interfaces abstractas con <<interface>>
- Flechas de herencia (triángulos vacíos)
- Flechas de composición (rombos rellenos)
- Diagramas de secuencia con líneas de vida
- Diagrama de máquina de estados

### **Formato de Salida Preferido**
- Mermaid syntax para diagramas
- O formato PlantUML
- O imagen generada

---

### **Ejemplo de Flujo Completo**
```
1. Usuario presiona "Pasar Credencial Válida"
2. PlumaControlador.pasarCredencial(true)
3. Cerrada.pasarCredencial(true) → cambia a Abriendose
4. Abriendose (2 segundos) → cambia automáticamente a Abierta
5. Usuario presiona "Detectar Vehículo"
6. Abierta.detectarPasoVehiculo() → cambia a Cerrada
```

Por favor, genera los diagramas UML mostrando claramente la implementación del Patrón de Estado en este sistema.
