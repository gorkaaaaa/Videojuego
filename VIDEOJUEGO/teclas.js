export let xIzquierda, xDerecha, xEspacio, xArriba, xAbajo, xZeta; // Variables para detección de teclas

//-------------------------------------------------------------------------------------------------------------------------
// Funciones de pulsación de teclas
//-------------------------------------------------------------------------------------------------------------------------

// Function que sirve para saber qué tecla se ha pulsado usando los códigos de cada key
export function activarMovimiento(evt) {
    switch (evt.keyCode) {
        case 37: xIzquierda = true; break;
        case 39: xDerecha = true; break;
        case 32: xEspacio = true; break;
        case 38: xArriba = true; break;
        case 40: xAbajo = true; break;
        case 90: xZeta = true; break;
    }
}

// Lo mismo pero para cuando se deja de pulsarlas
export function desactivarMovimiento(evt) {
    switch (evt.keyCode) {
        case 37: xIzquierda = false; break;
        case 39: xDerecha = false; break;
        case 32: xEspacio = false; break;
        case 38: xArriba = false; break;
        case 40: xAbajo = false; break;
        case 90: xZeta = false; break;
    }
}