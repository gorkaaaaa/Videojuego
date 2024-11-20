import{canva, ctx, fondo, musica } from './constantes.js'

//-------------------------------------------------------------------------------------------------------------------------
// Clase Personaje
//-------------------------------------------------------------------------------------------------------------------------

export function Personaje(x_, y_){
    this.x=x_; // Establecemos su posición tanto X como Y
    this.y=y_;

    this.velocidad=3; // Velocidad a la que se moverá, es la cantidad restada a X
    this.tamanioX=26; // Tamaño X e Y del sprite
    this.tamanioY=38;
    this.enAire=false; // Variable que detectará si el personaje se encuentra en el aire
    this.gravedad=0.5; // Variable que determina la gravedad, es la cantidad de Y que se restará en la caída del salto
    this.velSalto=0;   // Variable que servirá para elevar al personaje   
    this.direccion='izquierda'; // Variable que define hacia donde está mirando o hacia donde miró por última vez
    this.posicion=0;   // Variable posición para intercalar las animaciones



    // Array que contiene todos los Sprites en forma de objeto Image junto con sus coordenadas

    this.sprites = [
        { src: 'assets/depieDerecha.png', coor: [[7, 2], [42, 2], [78, 2], [110, 2], [143, 2], [177, 2]] },//---> 0 - De pie mirando hacia la derecha
        { src: 'assets/depieIzda.png', coor: [[10, 1], [45, 1], [78, 1], [110, 1], [145, 1], [180, 1]] }, // ---> 1 - De pie mirando hacia la izquierda
        { src: 'assets/arriba.png', coor: [[2, 1]] }, //--------------------------------------------------------> 2 - Mirar hacia arriba
        { src: 'assets/haciaDerecha.png', coor: [[1, 1], [29, 1], [55, 1], [86, 1], [112, 1], [138, 1]] },//----> 3 - Caminando hacia la derecha
        { src: 'assets/haciaIzda.png', coor: [[1, 2], [31, 2], [57, 2], [85, 2], [112, 2], [140, 2]] },//-------> 4 - Caminando hacia la izquierda
        { src: 'assets/disparoDerecha.png', coor: [[3, 1], [35, 1]] },//----------------------------------------> 5 - Disparo hacia la derecha
        { src: 'assets/disparoIzda.png', coor: [[2, 1], [34,1]]},//---------------------------------------------> 6 - Disparo hacia la izquierda
        { src: 'assets/saltoDerecha.png', coor: [[3, 0]] },// --------------------------------------------------> 7 - Salto hacia la derecha
        { src: 'assets/saltoIzda.png', coor: [[1, 1]] },// -----------------------------------------------------> 8 - Salto hacia la izquierda
        { src: 'assets/saltoArriba.png', coor: [[2, 4]] }, // --------------------------------------------------> 9 - Mirar hacia arriba saltando
        { src: 'assets/arribaHaciaDerecha.png', coor: [[2,6],[30,6],[56,6],[86,6],[113,6],[139,6]]}, //---------> 10 - Caminando derecha mirando arriba
        { src: 'assets/arribaHaciaIzda.png', coor: [[2,3],[32,3],[58,3],[84,3],[111,3],[140,3]]}, // -----------> 11 - Caminando izda mirando arriba
        { src: 'assets/saltoAbajo.png', coor:[[2,1]]} //--------------------------------------------------------> 12 - Saltando mirando hacia abajo
    ];
    
    // Creo una nueva propiedad a cada elemento del array con el objeto imagen con los sprites cargados
    
    this.sprites.forEach(sprite => {
        const img = new Image();
        img.src = sprite.src;
        sprite.image = img;
    });

    this.animacionPersonaje=this.sprites[1].image; // Establezco el sprite mirando hacia la derecha por defecto
    this.animacionPersonajeCoor=this.sprites[1].coor;
    
}

    //-------------------------------------------------------------------------------------------------------------------------
    // Métodos del personaje
    //-------------------------------------------------------------------------------------------------------------------------

    // Método de movimiento
    // Mueve al personaje hacia la derecha o izda sumando a X la velocidad en función de la dirección

    Personaje.prototype.moverIzda = function () {
        this.x -= this.velocidad;
        if (this.x < 0) this.x = 0;
        
    };

    Personaje.prototype.moverDerecha=function(){
        this.x += this.velocidad;
        if (this.x > 420) this.x = 420; //Evita que llegue al final del canva y se salga
    }

    // Método de salto

    Personaje.prototype.salto=function(){
        if(!this.enAire){      // Comprueba si no está en el aire ya que no queremos más de 1 salto
            this.enAire=true;  // Pasamos el estado del personaje a enAire
            this.velSalto=-13; // Cantidad que se restará a la Y que hará ascender al personaje
        }
    }

    //Método que dibuja al personaje

    Personaje.prototype.dibujarProta=function(){
        ctx.drawImage(
            this.animacionPersonaje,                  // Imagen del sprite
            this.animacionPersonajeCoor[this.posicion][0], // Posición X del sprite
            this.animacionPersonajeCoor[this.posicion][1], // Posición Y del sprite
            this.tamanioX,                            // Tamaño X del sprite
            this.tamanioY,                            // Tamaño Y del sprite
            this.x,                                   // Posición X del personaje en el canva
            this.y,                                   // Posición Y del personaje en el canva
            this.tamanioX,                            // Tamaño X del personaje
            this.tamanioY);                           // Tamaño Y del personaje
    }



