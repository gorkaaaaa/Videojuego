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
    let fondo=new Image(); fondo.src='assets/fondo.png'; // Creo un objeto Image con el fondo
    let musica=new Audio('assets/musica.mp3');           // Creo el objeto audio para la música de fondo
   
    let numEnemigos; // Nº de enemigos máximos en pantalla
    let vidasnave;   // Cantidad de enemigos que podrán entrar a la nave

    let id1; // Variables que contendrán los intervalos de ejecución de las funciones

    let puntuacion;     // Variable que almacenará la puntuación
    let recordPuntos=0; // Variable que almacenará el record de puntos
    let arrayEnemigos;  // Creo el array de enemigos
    let arrayDisparos;  // Creo el array que contendrá los disparos

    let prota;    // Variable que contendrá al protagonista
    let disparo;  // Variable que contendrá el disparo
    let enemigos; // Variable que contendrá al enemigo 

    let dificultad; // Variable que almacenará la dificultad

    
    // Function que las inicializa
    function iniciarVar(){
        canva=document.getElementById("miCanvas"); // Cargamos el canva del HTML

        arrayDisparos=[];  // Declaro el array de disparos
        arrayEnemigos=[];  // Declaro el array de enemigos

        prota=new Personaje() // Instancio al protagonista con la clase Personaje
        puntuacion=0; // Reiniciamos la puntuación
        vidasnave=10; // Reiniciamos las vidas de la nave

        musica.loop=true; musica.play(); musica.volume=0.17; // La pongo en loop, le bajo el volumen y la reproduzco
        document.getElementById("puntuacion").innerHTML="Puntuación: " + puntuacion; // Insertamos en el parrafo del HTML la puntuacion que será 0
        document.getElementById("numenemigos").innerHTML="Nº enemigos restantes: " + vidasnave+"/10"; // Insertamos en el parrafo del HTML la puntuacion será 10

        numEnemigos=5; // Por defecto el num de neemigos, aumentará o decrementará al generar el array

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
        if(arrayEnemigos.length<3){ // Comprueba si hay menos de 3 enemigos 
            for (let index = 0; index < numEnemigos; index++) { // Cerea tantos enemigos como le diga en numEnemigos (5)
                enemigos=new Enemigo();       // Crea el objeto enemigo

                switch (dificultad) { // Comprobaremos la dificultad elegida y en funcion de esta spawnearemos mas o menos enemigos más lentos o más rápidos
                    case "f":
                        enemigos.velocidad=(Math.random()*3); // Modo facil
                        numEnemigos=3;
                        break;
                
                    case "m":
                        enemigos.velocidad=(Math.random()*3)+2.5; // Modo medio
                        numEnemigos=5;
                        break;
                    case "d":
                        enemigos.velocidad=(Math.random()*3)+5; // Modo dificil
                        numEnemigos=7;
                        break;
                }
                arrayEnemigos.push(enemigos); // Lo mete en el array de enemigos
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

        disparo.dibujarDisparo(ctx);     // Dibujo el disparo
        arrayDisparos.push(disparo);     // Meto en el array el disparo
        manejarAudio(disparo.audio);     // Reproduzco el audio de disparo
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
        if(xEspacio) prota.salto();        // Y compruebo si se pulsa espacio

        mueveDisparos(); // Movemos los disparos

        //Función que realizará el salto
        if(prota.enAire){                  // Comprueba si el personaje está en el aire para evitar doble salto

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

        // Dibujamos a los enemigos y se meten en el array
        generarEnemigos();

        // Por cada enemigo en el array lo dibujamos, movemos y comprobamos colisiones
        arrayEnemigos.forEach((enemigo,i) => { 
            enemigo.dibujarEnemigo(ctx); 
            enemigo.moverEnemigo() ; 
            colisionPlataformasEnemigo(enemigo,plataformasArray) // También generamos su colisiones con las plataformas

            if(colisionProtaEnemigo(prota,enemigo)){ // Comprueba que el prota colisione con el enemigo
                prota.haMuerto=true;
            }

            // Comparamos cada elemento de arrayEnemigos con cada elemento del arrayDisparos
            arrayDisparos.forEach((disparo,j)=>{
                if(colisionEnemigoDisparo(enemigo, disparo)) { // Comprueba si colisionan
                    arrayDisparos.splice(j,1);   // En caso afirmativo elimina el disparo del array
                    arrayEnemigos.splice(i,1);   // y al enemigo del array
                    manejarAudio(enemigo.audio); // Reproduce el audio de muerte
                    puntuacion+=200              // Sumamos a la puntuación 200 puntos
                    document.getElementById("puntuacion").innerHTML=" Puntuación: " + puntuacion; // Actualizamos la puntuación
                }
            });

            // Comprobamos si está en el aire y lo hacemos caer, mismo funcionamiento que el salto
            if(enemigo.enAire){
                enemigo.y+=enemigo.velCaida;
                enemigo.velCaida+=enemigo.gravedad;
            }

            // Comprobamos si han llegado a la puerta de la nave
            if(enemigo.hanLlegado()){
                arrayEnemigos.splice(i,1); // En caso de haber llegado a la nave, desaparecerán 
                vidasnave-=1;              // y le resta una vida a la nave
                document.getElementById("numenemigos").innerHTML=" Nº enemigos restantes: " + vidasnave+"/10"; // Actualizamos la vida de la nave
            }
        });

        // Comprueba si la nave se queda sin vidas o el protagonista ha muerto
        if(vidasnave<=0 || prota.haMuerto){
            musica.pause();       // Pausamos la música
            musica.currentTime=0; // La retrocedemos hasta el principio
            clearInterval(id1);   // En caso afirmativo para el juego

            // Habilitamos de nuevo los 3 botones
            botonF.disabled=false; 
            botonM.disabled=false; 
            botonD.disabled=false; 

            if(puntuacion>recordPuntos){ // Comprueba si la puntuación actual es mayor que el record almacenado
                document.getElementById("record").innerHTML=" Record de puntuacion: " + puntuacion; // Insertamos en el parrafo del HTML el record
                recordPuntos=puntuacion; // El nuevo record de puntuación pasa a ser la puntuación actual
            }
        }

    }


    //-------------------------------------------------------------------------------------------------------------------------
    // Iniciar manejador de eventos, ejecución de intervalos y botón
    //-------------------------------------------------------------------------------------------------------------------------

    function iniciarPartida(evt) { // Recogerá el evento que invocó esta función, es decir, uno de los 3 botones de dificultad

        switch (evt.target.value) { // Comprobará el value recibido y lo trasladaremos a la variable dificultad
            case "f":
                dificultad="f"
                break;
        
            case "m":
                dificultad="m"
                break;
            
            case "d":
                dificultad="d"
                break;
        }

        iniciarVar(); // Inicilizamos las variables
        ctx=canva.getContext("2d"); // Le damos el contexto 2D al canva
        document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
        document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

        // Manejador para que al levantar la tecla Z se ejecute un disparo, lo he añadido de esta manera ya que quería que al levantar la tecla
        // ejecutase el método disparar directamente, pero tengo las funciones que registan la pulsación de teclas en otro documento y no sabía
        // como pasarle como parametro una función, de esta manera creo la función en el listener directamente
        document.addEventListener("keyup", 
            function(evt){ 
                if(evt.code==="KeyZ") disparar();
            },false
        );
        document.addEventListener("click", // Mismo funcionamiento que el caso anterior pero al hacer click en la página
            function(){
                    disparar();
            }
        );

        // Deshabilitamos los 3 botones ya que independientemente de cual se haya pulsado, los querremos deshabilitar
        botonF.disabled=true; 
        botonM.disabled=true; 
        botonD.disabled=true; 

        id1=setInterval(generarPartida, 300/24); // Intervalo que ejecutará la función que genera al personaje
        
        setInterval(()=>{       // Intervalo que se genera las animaciones
            animaciones(prota); // He usado una función flecha ya que la función de las animaciones requieren que se les pase como parámetro
        },800/24);              // un prota y no quería reescribir el código ni pasarlo a este archivo ya que el código es muy largo
    }

    // Variable que accederá a los botones del html y en caso de hacer click, inicia partida
    let botonF=document.getElementById("start-f");
    botonF.onclick=iniciarPartida;

    let botonM=document.getElementById("start-m");
    botonM.onclick=iniciarPartida;

    let botonD=document.getElementById("start-d");
    botonD.onclick=iniciarPartida;

}