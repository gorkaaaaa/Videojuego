

window.onload=function(){
    const canva=document.getElementById("miCanvas");       // Cargamos el canva del HTML
    const ctx=canva.getContext("2d");                      // Le damos el contexto 2D
    const fondo=new Image(); fondo.src='assets/fondo.jpg'; // Creo un objeto Image con el fondo
    const musica=new Audio('assets/musica.mp3');           // Creo el objeto audio para la música de fondo
    musica.loop=true; musica.play(); musica.volume=0.2;    // La pongo en loop, le bajo el volumen y la reproduzco

    let xIzquierda, xDerecha, xEspacio, xArriba, xZeta; // Variables para detección de teclas
    let x=225, y=765; // Coordenada X e Y en la que aparecerá el protagonista 
    let posicion=0;   // Variable posición para intercalar las animaciones
    let enAire=false; // Variable que detectará si el personaje se encuentra en el aire
    let gravedad=0.5; // Variable que determina la gravedad, es la cantidad de Y que se restará en la caída del salto
    let velSalto=0;   // Variable que servirá para elevar al personaje
    let direccion='derecha'; // Variable que define hacia donde está mirando o hacia donde miró por última vez

    const protagonista=new Personaje(x,y); // Creación del objeto protagonista con las coordenadas de spawn (En el centro abajo del todo)

    //-------------------------------------------------------------------------------------------------------------------------
    // Creación de la clase personaje
    //-------------------------------------------------------------------------------------------------------------------------

    function Personaje(x_, y_){
        this.x=x_; // Establecemos su posición tanto X como Y
        this.y=y_;

        this.velocidad=3; // Velocidad a la que se moverá, es la cantidad restada a X
        this.tamanioX=26; // Tamaño X e Y del sprite
        this.tamanioY=41;

        // Array que contiene todos los Sprites en forma de objeto Image junto con sus coordenadas
        this.sprites = [
            { src: 'assets/depieDerecha.png', coor: [[7, 2], [42, 2], [78, 2], [110, 2], [143, 2], [177, 2]] },//---> 0 - De pie mirando hacia la derecha
            { src: 'assets/depieIzda.png', coor: [[10, 1], [45, 1], [78, 1], [110, 1], [145, 1], [180, 1]] }, // ---> 1 - De pie mirando hacia la izquierda
            { src: 'assets/arriba.png', coor: [[2, 1]] }, //--------------------------------------------------------> 2 - Mirar hacia arriba
            { src: 'assets/haciaDerecha.png', coor: [[1, 1], [29, 1], [55, 1], [86, 1], [112, 1], [138, 1]] },//----> 3 - Caminando hacia la derecha
            { src: 'assets/haciaIzda.png', coor: [[1, 2], [31, 2], [57, 2], [85, 2], [112, 2], [140, 2]] },//-------> 4 - Caminando hacia la izquierda
            { src: 'assets/disparoDerecha.png', coor: [[2, 1], [50, 1], [95, 1], [128, 1], [159, 1], [193, 1]] },//-> 5 - Disparo hacia la derecha
            { src: 'assets/disparoIzda.png', coor: [[2, 1], [36, 1], [68, 1], [98, 1], [132, 1], [179, 1]] },//-----> 6 - Disparo hacia la izquierda
            { src: 'assets/saltoDerecha.png', coor: [[3, 0]] },// --------------------------------------------------> 7 - Salto hacia la derecha
            { src: 'assets/saltoIzda.png', coor: [[1, 1]] },// -----------------------------------------------------> 8 - Salto hacia la izquierda
            { src: 'assets/saltoArriba.png', coor: [[2, 4]] }, // --------------------------------------------------> 9 - Mirar hacia arriba saltando
            { src: 'assets/arribaHaciaDerecha.png', coor: [[2,6],[30,6],[56,6],[86,6],[113,6],[139,6]]}, //---------> 10 - Caminando derecha mirando arriba
            { src: 'assets/arribaHaciaIzda.png', coor: [[2,3],[32,3],[58,3],[84,3],[111,3],[140,3]]} // ------------> 11 - Caminando izda mirando arriba
        ];
        
        // Creo una nueva propiedad a cada elemento del array con el objeto imagen con los sprites cargados
        this.sprites.forEach(sprite => {
            const img = new Image();
            img.src = sprite.src;
            sprite.image = img;
            console.log("cargado");
        });

        this.animacionPersonaje=this.sprites[0].image; // Establezco el sprite mirando hacia la derecha por defecto
        this.animacionPersonajeCoor=this.sprites[0].coor;
        
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Métodos del personaje
    //-------------------------------------------------------------------------------------------------------------------------

    // Método de movimiento
    // Mueve al personaje hacia la derecha o izda sumando a X la velocidad en función de la dirección

    Personaje.prototype.mover = function (direccion) {

        console.log(direccion);


        if (direccion === 'derecha') {
            this.x += this.velocidad;
            if (this.x > 420) this.x = 420; //Evita que llegue al final del canva y se salga

        } else if (direccion === 'izquierda') {
            this.x -= this.velocidad;
            if (this.x < 0) this.x = 0;
        }
    };

    // Método de salto
    // Functión que servirá para iniciar el salto

    Personaje.prototype.salto=function(){
        if(!enAire){      // Comprueba si no está en el aire ya que no queremos más de 1 salto
            enAire=true;  // Pasamos el estado del personaje a EnAire
            velSalto=-13; // Cantidad que se restará a la Y que hará ascender al personaje
            console.log("salro");
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Funciones de pulsación de teclas
    //-------------------------------------------------------------------------------------------------------------------------

    //Function que sirve para saber qué tecla se ha pulsado usando los códigos de cada key

    function activarMovimiento(evt) {
        switch (evt.keyCode) {
            case 37: xIzquierda = true; break;
            case 39: xDerecha = true; break;
            case 32: {xEspacio = true; console.log("XESPACIO", xEspacio); break};
            case 38: xArriba = true; break;
            case 90: xZeta = true; break;
        }
    }

    // Lo mismo pero para cuando se deja de pulsarlas

    function desactivaMovimiento(evt) {
        switch (evt.keyCode) {
            case 37: xIzquierda = false; break;
            case 39: xDerecha = false; break;
            case 32: xEspacio = false; break;
            case 38: xArriba = false; break;
            case 90: xZeta = false; break;
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Function que controla las animaciones
    //-------------------------------------------------------------------------------------------------------------------------

    function animaciones(){

        //-----------------------------------------------------------------------------------
        // Animaciones en movimiento
        //-----------------------------------------------------------------------------------

        if(xDerecha && !xArriba) {               // Comprueba si la tecla pulsada es la de la derecha

            direccion='derecha';     // registra que la última dirección ha sido derecha
            protagonista.animacionPersonaje=protagonista.sprites[3].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[3].coor;
            posicion=(posicion+1)%6; // itera del 0-5 usando la .image y las .coord del array de sprites
        }
        else if(xIzquierda && !xArriba){         // Lo mismo que en el anterior pero con la izda

            direccion='izquierda';
            protagonista.animacionPersonaje=protagonista.sprites[4].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[4].coor;
            posicion=(posicion+1)%6;
        }else{
            console.log(xArriba, xIzquierda, xDerecha);
            if(xArriba && xIzquierda){
                direccion='izquierda';
                protagonista.animacionPersonaje=protagonista.sprites[11].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[11].coor;
                posicion=(posicion+1)%6;
            }else if(xArriba && xDerecha){
                direccion='derecha'
                protagonista.animacionPersonaje=protagonista.sprites[10].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[10].coor;
                posicion=(posicion+1)%6;
            }
        }

        //-----------------------------------------------------------------------------------
        // Animaciones estando estático
        //-----------------------------------------------------------------------------------

        if(xArriba && !xDerecha && !xIzquierda){      // Compruebo que esté la tecla arriba pero ni izda y derecha para que esté quieto
            protagonista.animacionPersonaje=protagonista.sprites[2].image;      
            protagonista.animacionPersonajeCoor=protagonista.sprites[2].coor;   
            posicion=0;                                                         
        }
        else if(!xDerecha && direccion==='derecha'){   // Ahora comprobamos si se ha dejado de pulsar la derecha y la última dirección ha sido hacia la derecha

            posicion=(posicion+1)%6;                   // En caso afirmativo asociamos el sprite quieto mirando a la derecha
            protagonista.animacionPersonaje=protagonista.sprites[0].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[0].coor;


        }
        else if(!xIzquierda && direccion==='izquierda'){ // Lo mismo con la izquierda

            posicion=(posicion+1)%6;
            protagonista.animacionPersonaje=protagonista.sprites[1].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[1].coor;
        }

        //-----------------------------------------------------------------------------------
        // Animaciones en el aire
        //-----------------------------------------------------------------------------------
        
        if(enAire){ //Comprobará si estamos en el aire y mirando derecha/izda/arriba y le asociará el sprite correspondiente
            if(direccion==='derecha'){
                protagonista.animacionPersonaje=protagonista.sprites[7].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[7].coor;
            }else if(direccion==='izquierda'){
                protagonista.animacionPersonaje=protagonista.sprites[8].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[8].coor;
            }
            if(xArriba){
                protagonista.animacionPersonaje=protagonista.sprites[9].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[9].coor;
            }
            posicion=0;
        }

        //-----------------------------------------------------------------------------------
        // Animaciones de ataque
        //-----------------------------------------------------------------------------------
        
        if(!xDerecha && !xIzquierda && xZeta){
            if(direccion==='derecha'){
                protagonista.animacionPersonaje=protagonista.sprites[5].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[5].coor;
                posicion=(posicion+1)%6;
            }else if(direccion==='izquierda'){
                protagonista.animacionPersonaje=protagonista.sprites[6].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[6].coor;
                posicion=(posicion+1)%6;  
            }
            if(xArriba){
                protagonista.animacionPersonaje=protagonista.sprites[9].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[9].coor;
                posicion=0;
            }
        }
    }
    
    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el personaje
    //-------------------------------------------------------------------------------------------------------------------------

    function generarPersonaje(){

        ctx.clearRect(0,0,450,800);        // Limpiamos el canva
        ctx.drawImage(fondo, 0,0,450,800); // Le ponemos fondo al canva

        console.log(xEspacio);
        if(xIzquierda) protagonista.mover(direccion); // En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
        if(xDerecha) protagonista.mover(direccion);   // Lo mismo con la izda
        if(xEspacio) protagonista.salto();            // Y con el espacio, el cual es el botón para saltar

        //Función que realizará el salto

        if(enAire){ // Comprueba si el personaje está en el aire
            protagonista.y+=velSalto; // En caso afirmativo le sumará el número -13 por lo que restará y le hará ascender
            velSalto+=gravedad;       // A -13 le sumamos 0,5 hasta que el número vuelva a ser positivo y haga al personaje bajar, creando la ilusión de caída
            if(protagonista.y>=765){  // Para que el personaje caiga al suelo comprobará la Y
                protagonista.y=765;   // Y la establecerá como límite
                enAire=false;         // Devolvemos el estado a false
                velSalto=0;           // Y la velocidad del salto a 0
            }
        }
        
        // Dibujamos al personaje

        ctx.drawImage(
            protagonista.animacionPersonaje,                  // Imagen del sprite
            protagonista.animacionPersonajeCoor[posicion][0], // Posición X del sprite
            protagonista.animacionPersonajeCoor[posicion][1], // Posición Y del sprite
            protagonista.tamanioX,                            // Tamaño X del sprite
            protagonista.tamanioY,                            // Tamaño Y del sprite
            protagonista.x,                                   // Posición X del personaje en el canva
            protagonista.y,                                   // Posición Y del personaje en el canva
            protagonista.tamanioX,                            // Tamaño X del personaje
            protagonista.tamanioY);                           // Tamaño Y del personaje
    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Manejador de eventos y ejecución de intervalos
    //-------------------------------------------------------------------------------------------------------------------------

    document.addEventListener("keyup",desactivaMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

    setInterval(generarPersonaje,300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
    setInterval(animaciones,800/24);

}