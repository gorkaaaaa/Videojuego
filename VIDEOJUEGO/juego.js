import { plataformas, plataformasArray } from './escenario.js';
import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigo.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,activarMovimiento,desactivarMovimiento, activarDisparo, xAbajo } from './teclas.js';
import { Disparo } from './Disparo.js';
import { colisionEnemigoDisparo, colisionPlataformasEnemigo, colisionPlataformasProta, colisionProtaEnemigo } from './colisiones.js';


window.onload=function(){
    let canva;       
    let ctx;                      // Le damos el contexto 2D
    let fondo=new Image(); fondo.src='assets/plantilla.png'; // Creo un objeto Image con el fondo
    let musica=new Audio('assets/musica.mp3');           // Creo el objeto audio para la música de fondo
    musica.loop=true; musica.play(); musica.volume=0.2;    // La pongo en loop, le bajo el volumen y la reproduzco
    const numEnemigos=5;
    let id1,id2;
    let arrayEnemigos; // Creo el array de enemigos
    let arrayDisparos; // Creo el array que contendrá los disparos
    let prota; 
    let vidasnave=10; // Cantidad de enemigos que podrán entrar a la nave
    let disparo; // Variable que contendrá el disparo

    let enemigos;   
    function iniciarVar(){
        canva=document.getElementById("miCanvas"); // Cargamos el canva del HTML
        arrayDisparos=[];  // Declaro el array de disparos
        arrayEnemigos=[];  // Declaro el array de enemigos
        prota=new Personaje() // Instancio al protagonista con la clase Personaje

    }

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para controlar el audio
    //-------------------------------------------------------------------------------------------------------------------------

    function manejarAudio(audio){
        audio.currentTime=0;
        audio.play();
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar los enemigos
    //-------------------------------------------------------------------------------------------------------------------------



    function generarEnemigos(){
        if(arrayEnemigos.length<2){
            for (let index = 0; index < numEnemigos; index++) {
                enemigos=new Enemigo();
                arrayEnemigos.push(enemigos);
            }
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el disparo
    //-------------------------------------------------------------------------------------------------------------------------

    // Function que genera el disparo

    function disparar(){
        disparo=new Disparo(prota.x,prota.y,prota.direccion);
        if(xArriba) disparo.arriba=true; // En caso de que se esté pulsando la tecla arriba
        if(xAbajo) disparo.abajo=true;   // Lo mismo pero hacia abajo

        disparo.dibujarDisparo(ctx);
        arrayDisparos.push(disparo); // Meto en el array el disparo
        manejarAudio(disparo.audio);
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
        plataformas(ctx);

        // Generamos las colisiones con las plataformas
        colisionPlataformasProta(prota,plataformasArray);

        // Dibujamos al personaje
        prota.dibujarProta(ctx);

        // Dibujamos y movemos al enemigo
        generarEnemigos();

        let tiempoinvul=false; // Variable que nos dirá si el tiempo de invulnerabilidad está activo

        arrayEnemigos.forEach((enemigo,i) => { // Por cada enemigo en el array lo dibujamos y movemos
            enemigo.dibujarEnemigo(ctx); 
            enemigo.moverEnemigo() ; 
            colisionPlataformasEnemigo(enemigo,plataformasArray); // También generamos su colisiones con las plataformas

            if(!tiempoinvul && !prota.invul && colisionProtaEnemigo(prota,enemigo)){ // Comprueba que el prota no sea invulnerable y que colisione con el enemigo
                prota.vidas-=1; // Le quita una vida
                console.log(prota.vidas);
                prota.invul=true; // Lo convierte en invulnerable
                tiempoinvul=true; // Comienza el tiempo de invulnerabilidad
                console.log("comienzo de invul");
                

            }else if(tiempoinvul){                // Comprueba que haya comenzado el tiempo de invul
                setTimeout(() => {                // en caso afirmativo ignorará las colisiones durante 1,5 segundos
                    tiempoinvul=false;            // Al terminar pondremos a false las variables de tiempo de invul y la invulnerabilidad del prota
                    prota.invul=false;
                    console.log("fin de invul");
                }, (2000));

            }
            arrayDisparos.forEach((disparo,j)=>{
                if(colisionEnemigoDisparo(enemigo, disparo)) {
                    arrayDisparos.splice(j,1);
                    arrayEnemigos.splice(i,1);
                    manejarAudio(enemigo.audio);
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

            if(enemigo.hanLlegado()){
                arrayEnemigos.splice(i,1); 
                vidasnave-=1; 
                console.log(vidasnave)// En caso de haber llegado al ovni, desaparecerán 

            }
        });

        if(vidasnave<=0 || prota.vidas<=0){
            clearInterval(id1)
            boton.disabled=false;
        }

    }

    function iniciarPartida() {
    //-------------------------------------------------------------------------------------------------------------------------
    // Manejador de eventos, ejecución de intervalos y botón
    //-------------------------------------------------------------------------------------------------------------------------
    clearInterval(id1);
    clearInterval(id2);
    iniciarVar();
    ctx=canva.getContext("2d");
    document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

    // Manejador para que al levantar la tecla Z se ejecute un disparo, lo he añadido aquí porque al tener el resto de métodos de tecla
    // en otro documento no podía hace que la funcion activarDisparo ejecutase disparo(), también he cambiado el evt.keyCode porque aparentemente
    // está desactualizado y no me funcionaba. De esta manera declaro la función directamente aquí y puedo usar el método disparar() que he declarado 
    // en este documento sin tener que cambiar toda la estructura del código
    document.addEventListener("keyup", function(evt){ if(evt.code==="KeyZ") disparar();},false);

    boton.disabled=true; // Deshabilitamos el botón

    id1=setInterval(generarPartida, 300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
    id2=setInterval(()=>{
        animaciones(prota);
    },800/24);
    }




    let boton=document.getElementById("start");
    boton.onclick=iniciarPartida;

}