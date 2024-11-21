import { canva, ctx, fondo, musica,numEnemigos } from './constantes.js';
import { plataformas, plataformasArray } from './escenario.js';
import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigo.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,activarMovimiento,desactivarMovimiento, activarDisparo, xAbajo } from './teclas.js';
import { Disparo } from './Disparo.js';
import { colisionEnemigoDisparo, colisionPlataformasEnemigo, colisionPlataformasProta, colisionProtaEnemigo } from './colisiones.js';
 

window.onload=function(){

    let x=225, y=765; // Coordenada X e Y en la que aparecerá el prota 
    const prota=new Personaje(x,y); // Creación del objeto prota con las coordenadas de spawn (En el centro abajo del todo)

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar los enemigos
    //-------------------------------------------------------------------------------------------------------------------------

    let enemigos;    
    let arrayEnemigos=[]; // Creo el array de enemigos

    function generarEnemigos(){
        if(arrayEnemigos.length<2){
            for (let index = 0; index < numEnemigos; index++) {
                console.log("nuevo enemigo");
                enemigos=new Enemigo();
                arrayEnemigos.push(enemigos);
            }
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el disparo
    //-------------------------------------------------------------------------------------------------------------------------

    let disparo;
    let arrayDisparos=[]; // Creo el array que contendrá los disparos
    
    // Function que genera el disparo

    function disparar(){
        disparo=new Disparo(prota.x,prota.y,prota.direccion);
        if(xArriba) disparo.arriba=true; // En caso de que se esté pulsando la tecla arriba
        if(xAbajo) disparo.abajo=true;   // Lo mismo pero hacia abajo

        disparo.dibujarDisparo(ctx);
        arrayDisparos.push(disparo); // Meto en el array el disparo
    }

    // Function que moverá el disparo y lo hará desaparecer

    function mueveDisparos(){
        for (let index = 0; index < arrayDisparos.length; index++) {

            arrayDisparos[index].dibujarDisparo(ctx); // Por cada elemento en el array dibujará el disparo

            if(arrayDisparos[index].arriba){          // Si hemos pulsado la tecla arriba invocará el método para moverla hacia arriba
                arrayDisparos[index].moverArriba();

                if(arrayDisparos[index].limite()){    // En caso de que se encuentre en los límites lo eliminará del array
                    arrayDisparos.splice(index,1);
                }
            }

            else if(arrayDisparos[index].abajo){          // Si hemos pulsado la tecla abajo invocará el método para moverla hacia abajo
                arrayDisparos[index].moverAbajo();

                if(arrayDisparos[index].limite()){    // En caso de que se encuentre en los límites lo eliminará del array
                    arrayDisparos.splice(index,1);
                }
            }

            else if(arrayDisparos[index].direccion=='izquierda'){ // Lo mismo pero con izda y derecha
                arrayDisparos[index].moverIzda();

                if(arrayDisparos[index].limite()){
                    arrayDisparos.splice(index,1);
                }
            }

            else if(arrayDisparos[index].direccion=='derecha'){
                arrayDisparos[index].moverDer();

                if(arrayDisparos[index].limite()){
                    arrayDisparos.splice(index,1);
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

        
        // Dibujamos las plataformas
        plataformas();

        // Generamos las colisiones con las plataformas
        
        if(colisionPlataformasProta(prota,plataformasArray)) console.log("colision plataforma");
        // Dibujamos al personaje
        prota.dibujarProta();

        // Dibujamos y movemos al enemigo
        generarEnemigos();
        arrayEnemigos.forEach((enemigo,i) => {
            enemigo.dibujarEnemigo(ctx);
            enemigo.moverEnemigo() ; 
            colisionPlataformasEnemigo(enemigo,plataformasArray);
            if(colisionProtaEnemigo(prota,enemigo)) console.log("colision enemigos");

            arrayDisparos.forEach((disparo,j)=>{
                if(colisionEnemigoDisparo(enemigo, disparo)) {
                    arrayDisparos.splice(j,1);
                    arrayEnemigos.splice(i,1);
                }
            });

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

            if(enemigo.hanLlegado()) arrayEnemigos.splice(i,1);
        });
        

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
    setInterval(()=>{
        animaciones(prota);
    },800/24);

}