import { canva, ctx, fondo, musica } from './constantes.js'
import { pintarPlataformas } from './escenario.js';
import { Personaje } from './personaje.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,xZeta,activarMovimiento,desactivarMovimiento } from './teclas.js';

window.onload=function(){

    let x=225, y=765; // Coordenada X e Y en la que aparecerá el prota 
    const prota=new Personaje(x,y); // Creación del objeto prota con las coordenadas de spawn (En el centro abajo del todo)

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el personaje
    //-------------------------------------------------------------------------------------------------------------------------

    function generarProta(){

        ctx.clearRect(0,0,450,800);        // Limpiamos el canva
        ctx.drawImage(fondo, 0,0,450,800); // Le ponemos fondo al canva

        if(xIzquierda) prota.moverIzda(); // En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
        if(xDerecha) prota.moverDerecha();   // Lo mismo con la izda
        if(xEspacio) prota.salto();            // Y con el espacio, el cual es el botón para saltar

        //Función que realizará el salto

        if(prota.enAire){ // Comprueba si el personaje está en el aire
            prota.y+=prota.velSalto; // En caso afirmativo le sumará el número -13 por lo que restará y le hará ascender
            prota.velSalto+=prota.gravedad;// A -13 le sumamos 0,5 hasta que el número vuelva a ser positivo y haga al personaje bajar, creando la ilusión de caída
            if(prota.y>=765){  // Para que el personaje caiga al suelo comprobará la Y
                prota.y=765;   // Y la establecerá como límite
                prota.enAire=false;         // Devolvemos el estado a false
                prota.velSalto=0;           // Y la velocidad del salto a 0
            }
        }
        
        //Dibujamos las plataformas
        pintarPlataformas();

        // Dibujamos al personaje
        prota.dibujarProta();

    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Manejador de eventos y ejecución de intervalos
    //-------------------------------------------------------------------------------------------------------------------------

    document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

    setInterval(generarProta, animaciones, 300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
    setInterval(()=>{animaciones(prota);},800/24);

}