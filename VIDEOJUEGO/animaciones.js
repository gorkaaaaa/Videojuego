//-------------------------------------------------------------------------------------------------------------------------
// Function que controla las animaciones
//-------------------------------------------------------------------------------------------------------------------------
import{xAbajo, xArriba,xDerecha,xEspacio,xIzquierda,xZeta} from './teclas.js'

export function animaciones(prota){

    //-----------------------------------------------------------------------------------
    // Animaciones en movimiento
    //-----------------------------------------------------------------------------------

    if(xDerecha && !xArriba) {               // Comprueba si la tecla pulsada es la de la derecha
        prota.direccion='derecha';           // registra que la última dirección ha sido derecha
        prota.animacionPersonaje=prota.sprites[3].image;
        prota.animacionPersonajeCoor=prota.sprites[3].coor;
        prota.posicion=(prota.posicion+1)%6; // itera del 0-5 usando la .image y las .coord del array de sprites
    }
    else if(xIzquierda && !xArriba){         // Lo mismo que en el anterior pero con la izda
        prota.direccion='izquierda';
        prota.animacionPersonaje=prota.sprites[4].image;
        prota.animacionPersonajeCoor=prota.sprites[4].coor;
        prota.posicion=(prota.posicion+1)%6;

    }

    if(xArriba){

        if(xArriba && xIzquierda){    // Movimiento izquierda y derecha pero mirando hacia arriba
            prota.direccion='izquierda';
            prota.animacionPersonaje=prota.sprites[11].image;
            prota.animacionPersonajeCoor=prota.sprites[11].coor;
            prota.posicion=(prota.posicion+1)%6;

        }else if(xArriba && xDerecha){ // Lo mismo pero para la derecha
            prota.direccion='derecha'
            prota.animacionPersonaje=prota.sprites[10].image;
            prota.animacionPersonajeCoor=prota.sprites[10].coor;
            prota.posicion=(prota.posicion+1)%6;
        }
    } 

    if(xAbajo){

        if(xAbajo && xIzquierda){
            prota.direccion='izquierda';
            prota.animacionPersonaje=prota.sprites[14].image;
            prota.animacionPersonajeCoor=prota.sprites[14].coor;
            prota.posicion=(prota.posicion+1)%6;

        }else if(xAbajo && xDerecha){
            prota.direccion='derecha'
            prota.animacionPersonaje=prota.sprites[13].image;
            prota.animacionPersonajeCoor=prota.sprites[13].coor;
            prota.posicion=(prota.posicion+1)%6;
        }
    }

    //-----------------------------------------------------------------------------------
    // Animaciones estando estático
    //-----------------------------------------------------------------------------------

    if(xArriba && !xDerecha && !xIzquierda){      // Compruebo que esté la tecla arriba pero ni izda y derecha para que esté quieto 
        prota.animacionPersonaje=prota.sprites[2].image;      
        prota.animacionPersonajeCoor=prota.sprites[2].coor;   
        prota.posicion=0;                                                         
    }
    else if(!xDerecha && prota.direccion==='derecha'){   // Ahora comprobamos si se ha dejado de pulsar la derecha y la última dirección ha sido hacia la derecha
        prota.posicion=(prota.posicion+1)%6;             // En caso afirmativo asociamos el sprite quieto mirando a la derecha
        prota.animacionPersonaje=prota.sprites[0].image;
        prota.animacionPersonajeCoor=prota.sprites[0].coor;

    }
    else if(!xIzquierda && prota.direccion==='izquierda'){ // Lo mismo con la izquierda
        prota.posicion=(prota.posicion+1)%6;
        prota.animacionPersonaje=prota.sprites[1].image;
        prota.animacionPersonajeCoor=prota.sprites[1].coor;
    }

    //-----------------------------------------------------------------------------------
    // Animaciones en el aire
    //-----------------------------------------------------------------------------------
    
    if(xEspacio){ //Comprobará si estamos en el aire y mirando derecha/izda/arriba y le asociará el sprite correspondiente

        if(prota.direccion==='derecha' && prota.enAire){
            prota.animacionPersonaje=prota.sprites[7].image;
            prota.animacionPersonajeCoor=prota.sprites[7].coor;

        }else if(prota.direccion==='izquierda'){
            prota.animacionPersonaje=prota.sprites[8].image;
            prota.animacionPersonajeCoor=prota.sprites[8].coor;
        }
        if(xArriba){
            prota.animacionPersonaje=prota.sprites[9].image;
            prota.animacionPersonajeCoor=prota.sprites[9].coor;

        }else if(xAbajo){
            prota.animacionPersonaje=prota.sprites[12].image;
            prota.animacionPersonajeCoor=prota.sprites[12].coor;
        }

        prota.posicion=0; // No es necesario iterar en los sprites del aire puesto que sólo son 1
    }

    //-----------------------------------------------------------------------------------
    // Animaciones de ataque
    //-----------------------------------------------------------------------------------
    
    if(!xDerecha && !xIzquierda && xZeta){  // Comprobamos si se está quieto y si está pulsando la z

        if(prota.direccion==='derecha'){
            prota.animacionPersonaje=prota.sprites[5].image;
            prota.animacionPersonajeCoor=prota.sprites[5].coor;
            prota.posicion=(prota.posicion+1)%2;

        }else if(prota.direccion==='izquierda'){
            prota.animacionPersonaje=prota.sprites[6].image;
            prota.animacionPersonajeCoor=prota.sprites[6].coor;
            prota.posicion=(prota.posicion+1)%2; 
        }
        
        if(xArriba){
            prota.animacionPersonaje=prota.sprites[9].image;
            prota.animacionPersonajeCoor=prota.sprites[9].coor;
            prota.posicion=0;

        }else if(xAbajo){
            prota.animacionPersonaje=prota.sprites[12].image;
            prota.animacionPersonajeCoor=prota.sprites[12].coor;
            prota.posicion=0;
        }
    }
}