import { plataformas, plataformasArray } from './escenario.js';
import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigo.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,activarMovimiento,desactivarMovimiento, xAbajo } from './teclas.js';
import { Disparo } from './Disparo.js';
import { colisionEnemigoDisparo, colisionPlataformasEnemigo, colisionPlataformasProta, colisionProtaEnemigo } from './colisiones.js';


window.onload=function(){

    //-------------------------------------------------------------------------------------------------------------------------
    // Creamos las variables y la función que las instancia e inicializa
    //------------------------------------------------------------------------------------------------------------------------- 

    let canva; // Variable que contendrá el canva       
    let ctx;   // Variable donde le daremos el contexto 2D
    let fondo=new Image(); fondo.src='assets/plantilla.png'; // Creo un objeto Image con el fondo
    let musica=new Audio('assets/musica.mp3');               // Creo el objeto audio para la música de fondo
    musica.loop=true; musica.play(); musica.volume=0.2;      // La pongo en loop, le bajo el volumen y la reproduzco

    const numEnemigos=5; // Nº de enemigos máximos en pantalla
    let vidasnave;  // Cantidad de enemigos que podrán entrar a la nave

    let id1,id2; // Variables que contendrán los intervalos de ejecución de las funciones

    let puntuacion; // Variable que almacenará la puntuación
    let arrayEnemigos; // Creo el array de enemigos
    let arrayDisparos; // Creo el array que contendrá los disparos

    let prota;    // Variable que contendrá al protagonista
    let disparo;  // Variable que contendrá el disparo
    let enemigos; // Variable que contendrá al enemigo 
    
    // Function que las inicializa
    function iniciarVar(){
        canva=document.getElementById("miCanvas"); // Cargamos el canva del HTML
        arrayDisparos=[];  // Declaro el array de disparos
        arrayEnemigos=[];  // Declaro el array de enemigos
        prota=new Personaje() // Instancio al protagonista con la clase Personaje
        puntuacion=0; // Reiniciamos la puntuación
        vidasnave=10; // Reiniciamos las vidas de la nave

    }


    //-------------------------------------------------------------------------------------------------------------------------
    // Function para controlar el audio
    //-------------------------------------------------------------------------------------------------------------------------

    function manejarAudio(audio){
        audio.currentTime=0; // Retrocede el audio al principio
        audio.play();        // Lo reproduce
    }


    //-------------------------------------------------------------------------------------------------------------------------
    // Function para generar los enemigos
    //-------------------------------------------------------------------------------------------------------------------------

    function generarEnemigos(){
        if(arrayEnemigos.length<3){
            for (let index = 0; index < numEnemigos; index++) {
                enemigos=new Enemigo();
                arrayEnemigos.push(enemigos);
            }
        }
    }


    //-------------------------------------------------------------------------------------------------------------------------
    // Function para generar el disparo
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

            else if(arrayDisparos[index].abajo){       // Si hemos pulsado la tecla abajo invocará el método para moverla hacia abajo
                arrayDisparos[index].moverAbajo();

                if(arrayDisparos[index].limite()){     
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
    // Function para generar la partida
    //-------------------------------------------------------------------------------------------------------------------------

    function generarPartida(){
        
        ctx.clearRect(0,0,450,800);        // Limpiamos el canva
        ctx.drawImage(fondo, 0,0,450,800); // Le ponemos fondo al canva

        if(xIzquierda) prota.moverIzda();  // En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
        if(xDerecha) prota.moverDerecha(); // Lo mismo con la izda
        if(xEspacio) prota.salto();        // Y compruebo si se pulsa espacio, si no esté en el aire o si está en una plataforma

        mueveDisparos(); // Movemos los disparos

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

        // Por cada enemigo en el array lo dibujamos, movemos y comprobamos colisiones
        arrayEnemigos.forEach((enemigo,i) => { 
            enemigo.dibujarEnemigo(ctx); 
            enemigo.moverEnemigo() ; 
            colisionPlataformasEnemigo(enemigo,plataformasArray); // También generamos su colisiones con las plataformas

            if(colisionProtaEnemigo(prota,enemigo)){ // Comprueba que el prota colisione con el enemigo
                prota.haMuerto=true;
            }

            // Comparamos cada elemento de arrayEnemigos con cada elemento del arrayDisparos
            arrayDisparos.forEach((disparo,j)=>{
                if(colisionEnemigoDisparo(enemigo, disparo)) { // Comprueba si colisionan
                    arrayDisparos.splice(j,1);   // En caso afirmativo elimina el disparo del array
                    arrayEnemigos.splice(i,1);   // y al enemigo del array
                    manejarAudio(enemigo.audio); // Reproduce el audio de muerte
                    puntuacion+=200 // Sumamos a la puntuación 200 puntos
                    document.getElementById("puntuacion").innerHTML="Puntuación: " + puntuacion; // Insertamos en el parrafo del HTML la puntuacion
                }
            });

            // Comprobamos si está en el aire y lo hacemos caer, mismo funcionamiento que el salto
            if(enemigo.enAire){
                enemigo.y+=enemigo.velCaida;
                enemigo.velCaida+=enemigo.gravedad; 
                if(enemigo.y>=765){
                    enemigo.y=765;
                    enemigo.enAire=false;
                    enemigo.velCaida=0;
                }
            }

            // Comprobamos si han llegado a la puerta de la nave
            if(enemigo.hanLlegado()){
                arrayEnemigos.splice(i,1); // En caso de haber llegado al ovni, desaparecerán 
                vidasnave-=1;              // y le resta una vida a la nave
                document.getElementById("numenemigos").innerHTML="Nº enemigos restantes: " + vidasnave+"/10"; // Insertamos en el parrafo del HTML la puntuacion
            }
        });

        // Comprueba si la nave se queda sin vidas o el protagonista ha muerto
        if(vidasnave<=0 || prota.haMuerto){
            clearInterval(id1);   // En caso afirmativo para el juego
            boton.disabled=false; // Habilita nuevamente el botón
        }

    }


    //-------------------------------------------------------------------------------------------------------------------------
    // Iniciar manejador de eventos, ejecución de intervalos y botón
    //-------------------------------------------------------------------------------------------------------------------------

    function iniciarPartida() {
        iniciarVar(); // Inicilizamos las variables
        ctx=canva.getContext("2d"); // Le damos el contexto 2D al canva
        document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
        document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

        // Manejador para que al levantar la tecla Z se ejecute un disparo, lo he añadido aquí porque al tener el resto de métodos de tecla
        // en otro documento no podía hace que la funcion activarDisparo ejecutase disparar(), también he cambiado el evt.keyCode porque aparentemente
        // está desactualizado y no me funcionaba. De esta manera declaro la función directamente aquí y puedo usar el método disparar() que he declarado 
        // en este documento sin tener que cambiar toda la estructura del código
        document.addEventListener("keyup", 
            function(evt){ 
                if(evt.code==="KeyZ") disparar();
            },false
        );

        boton.disabled=true; // Deshabilitamos el botón

        id1=setInterval(generarPartida, 300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
        id2=setInterval(()=>{   // Intervalo en los que se generan las animaciones
            animaciones(prota); // He usado una función flecha ya que la función de las animaciones requieren que se les pase como parámetro
        },800/24);              // un prota y no quería reescribir el código ni pasarlo a este archivo ya que el código es muy largo
    }

    // Variable que accederá al boton del html y en caso de hacer click, inicia partida
    let boton=document.getElementById("start");
    boton.onclick=iniciarPartida;

}