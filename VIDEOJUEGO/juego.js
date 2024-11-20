import { canva, ctx, fondo, musica } from './constantes.js';
import { plataformas, plataformasArray } from './escenario.js';
import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigo.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,activarMovimiento,desactivarMovimiento, activarDisparo } from './teclas.js';
import { Disparo } from './Disparo.js';
import { colisionPlataformas } from './colisiones.js';
 

window.onload=function(){

    let x=225, y=765; // Coordenada X e Y en la que aparecerá el prota 
    const prota=new Personaje(x,y); // Creación del objeto prota con las coordenadas de spawn (En el centro abajo del todo)
    const enemigo=new Enemigo();    // Creación del objeto enemigo

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el disparo
    //-------------------------------------------------------------------------------------------------------------------------

    let disparo;
    let arrayDisparos=[]; // Creo el array que contendrá los disparos
    
    // Function que genera el disparo

    function disparar(){
        disparo=new Disparo(prota.x,prota.y,prota.direccion);
        console.log(disparo);
        if(xArriba) disparo.arriba=true; // En caso de que se esté pulsando la tecla arriba

        disparo.dibujarDisparo(ctx);
        arrayDisparos.push(disparo); // Meto en el array el disparo
    }

    // Function que moverá el disparo

    function mueveDisparos(){
        for (let index = 0; index < arrayDisparos.length; index++) {

            arrayDisparos[index].dibujarDisparo(ctx); // Por cada elemento en el array dibujará el disparo

            if(arrayDisparos[index].arriba){          // Si hemos pulsado la tecla arriba invocará el método para moverla hacia arriba
                arrayDisparos[index].moverArriba();

                if(arrayDisparos[index].limite()){    // En caso de que se encuentre en los límites lo eliminará del array
                    arrayDisparos.splice(index,1);
                    console.log(arrayDisparos)
                }
            }

            else if(arrayDisparos[index].direccion=='izquierda'){ // Lo mismo pero con izda y derecha
                arrayDisparos[index].moverIzda();

                if(arrayDisparos[index].limite()){
                    arrayDisparos.splice(index,1);
                    console.log(arrayDisparos)
                }
            }

            else if(arrayDisparos[index].direccion=='derecha'){
                arrayDisparos[index].moverDer();

                if(arrayDisparos[index].limite()){
                    arrayDisparos.splice(index,1);
                    console.log(arrayDisparos)
                }
            }

        }
    }


    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar la partida
    //-------------------------------------------------------------------------------------------------------------------------

    function generarPartida(){

        ctx.clearRect(0,0,450,800);        // Limpiamos el canva
        ctx.drawImage(fondo, 0,0,450,800); // Le ponemos fondo al canva

        if(xIzquierda) prota.moverIzda(); // En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
        if(xDerecha) prota.moverDerecha();// Lo mismo con la izda
        if(xEspacio) prota.salto();// Y compruebo si se pulsa espacio, si no esté en el aire o si está en una plataforma
        mueveDisparos();

        //Función que realizará el salto
        if(prota.enAire){                  // Comprueba si el personaje está en el aire

            prota.y+=prota.velSalto;       // En caso afirmativo le sumará el número -13 por lo que restará y le hará ascender
            prota.velSalto+=prota.gravedad;// A -13 le sumamos 0,5 hasta que el número vuelva a ser positivo y haga al personaje bajar, creando la ilusión de caída

            if(prota.y>=765){              // Para que el personaje caiga al suelo comprobará la Y
                prota.y=765;               // Y la establecerá como límite
                prota.enAire=false;        // Devolvemos el estado a false
                prota.velSalto=0;          // Y la velocidad del salto a 0
            }
        }

        // Function que hará caer al enemigo, mismo funcionamiento que la de salto
        if(enemigo.enAire){
            enemigo.y+=enemigo.velCaida;
            enemigo.velCaida+=enemigo.gravedad; 
            if(enemigo.y>=765){
                enemigo.y=765;
                enemigo.enAire=false;
                enemigo.velCaida=0;
            }
        }
        
        // Dibujamos las plataformas
        plataformas();

        // Generamos las colisiones con las plataformas
        if(colisionPlataformas(prota, enemigo,plataformasArray )){
            console.log("colisionn");
        }
        
        // Dibujamos al personaje
        prota.dibujarProta();

        // Dibujamos y movemos al enemigo
        enemigo.dibujarEnemigo();
        enemigo.moverEnemigo();

    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Manejador de eventos y ejecución de intervalos
    //-------------------------------------------------------------------------------------------------------------------------
    document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

    // Manejador para que al levantar la tecla Z se ejecute un disparo, lo he añadido aquí porque al tener el resto de métodos de tecla
    // en otro documento no podía hace que la funcion activarDisparo ejecutase disparo(), también he cambiado el evt.keyCode porque aparentemente
    // está desactualizado y no me funcionaba. De esta manera declaro la función directamente aquí y puedo usar el método disparar() que he declarado 
    // en este documento sin tener que cambiar toda la estructura del código
    document.addEventListener("keyup", function(evt){ if(evt.code==="KeyZ") disparar();},false); 



    setInterval(generarPartida, 300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
    setInterval(()=>{animaciones(prota);},800/24);

}