

window.onload=function(){
    const canva=document.getElementById("miCanvas"); //Cargamos el canva del HTML
    let ctx=canva.getContext("2d"); //Le damos el contexto 2D
    let xIzquierda, xDerecha, xEspacio, xArriba, xZeta; //Variables para detección de teclas
    let x=225; //Coordenada X en la que aparecerá el Protagonista
    let y=765; //Coordenada Y en la que aparecerá el protagonista 

    let protagonista=new Personaje(x,y); //Creación del objeto protagonista con las coordenadas de spawn (En el centro abajo del todo)
    let id1,id2; // Declaramos los manejadores
    let posicion=0; //Variable posición para intercalar las animaciones
    let enAire=false; //Variable que detectará si el personaje se encuentra en el aire
    let gravedad=0.5; //Variable que determina la gravedad, es la cantidad de Y que se restará en la caída del salto
    let velSalto=0; //Variable que servirá para elevar al personaje
    let direccion='derecha'; //Variable que define hacia donde está mirando o hacia donde miró por última vez

    //Creación de la clase personaje

    function Personaje(x_, y_){
        this.x=x_; //Establecemos su posición tanto X como Y
        this.y=y_;

        this.velocidad=3; //Velocidad a la que se moverá, es la cantidad restada a X
        this.tamanioX=26; //Tamaño X e Y del sprite
        this.tamanioY=41;

        //Array que contiene todos los Sprites en forma de objeto Image junto con sus coordenadas
        this.sprites = [

            // 0 - De pie mirando hacia la derecha
            {
                image: (new Image()),
                src: 'assets/depieDerecha.png',
                coor: [[7, 2], [42, 2], [78, 2], [110, 2], [143, 2], [177, 2]]
            },
        
            // 1 - De pie mirando hacia la izquierda
            {
                image: (new Image()),
                src: 'assets/depieIzda.png',
                coor: [[6, 1], [41, 1], [74, 1], [106, 1], [141, 1], [176, 1]]
            },
        
            // 2 - Saltando hacia arriba
            {
                image: (new Image()),
                src: 'assets/arriba.png',
                coor: [2, 1]
            },
        
            // 3 - Caminando hacia la derecha
            {
                image: (new Image()),
                src: 'assets/HaciaDerecha.png',
                coor: [[1, 1], [29, 1], [55, 1], [86, 1], [112, 1], [138, 1]]
            },
        
            // 4 - Caminando hacia la izquierda
            {
                image: (new Image()),
                src: 'assets/haciaIzda.png',
                coor: [[1, 2], [31, 2], [57, 2], [85, 2], [112, 2], [140, 2]]
            },
        
            // 5 - Disparo hacia la derecha
            {
                image: (new Image()),
                src: 'assets/disparoDerecha.png',
                coor: [[2, 1], [50, 1], [95, 1], [128, 1], [159, 1], [193, 1]]
            },
        
            // 6 - Disparo hacia la izquierda
            {
                image: (new Image()),
                src: 'assets/disparoIzda.png',
                coor: [[2, 1], [36, 1], [68, 1], [98, 1], [132, 1], [179, 1]]
            },
        
            // 7 - Salto hacia la derecha
            {
                image: (new Image()),
                src: 'assets/saltoDerecha.png',
                coor: [[3, 0]]
            },
        
            // 8 - Salto hacia la izquierda
            {
                image: (new Image()),
                src: 'assets/saltoIzda.png',
                coor: [[1, 1]]
            },
        
            // 9 - Salto hacia arriba (sin movimiento lateral)
            {
                image: (new Image()),
                src: 'assets/saltoArriba.png',
                coor: [[2, 4]]
            }
        ];
        

        //Esta función establece el src de cada sprite y em dice si se ha cargado
        //para evitar errores porque no se carguen las imágenes a tiempo

        this.sprites.forEach(sprite => {
            sprite.image.src=sprite.src;
            sprite.image.onload=() =>{
                console.log('sprite cargado')
            }
        });

        this.animacionPersonaje=this.sprites[0].image; //Establezco el sprite mirando hacia la derecha por defecto
        this.animacionPersonajeCoor=this.sprites[0].coor;
        
    }


    //Funcion para mover al personaje hacia la derecha sumando a X la velocidad

    Personaje.prototype.andarDerecha=function(){
        this.x=this.x+this.velocidad;
        if(this.x>420){ //Si la X llega hasta el borde de la pantalla, no dejará continuar
            this.x=420;
        }
    }

    //Lo mismo que la función anterior pero hacia la izquierda

    Personaje.prototype.andarIzquierda=function(){
        this.x=this.x-this.velocidad;
        if(this.x<0){
            this.x=0;
        }
    }

    //Functión que servirá para iniciar el salto, aunque todo el proceso
    //se lleva acabo a la hora de dibujar el sprite

    Personaje.prototype.salto=function(){
        if(!enAire){ //Comprueba si no está en el aire ya que no queremos más de 1 salto
            enAire=true; //Pasamos el estado del personaje a EnAire
            velSalto=-13; //Cantidad que se restará a la Y que hará ascender al personaje
        }
    }

    //Function que sirve para saber qué tecla se ha pulsado usando los códigos de cada key

    function activarMovimiento(evt){
        switch (evt.keyCode) {
            case 37:
                xIzquierda=true;
                break;
        
            case 39:
                xDerecha=true;
                break;
            
            case 32:
                xEspacio=true;
                break;

            case 38:
                xArriba=true;
                break;
            case 90:
                xZeta=true;
                break;       
        }
    }

    //Lo mismo pero para cuando deja de pulsarse

    function desactivaMovimiento(evt){
        switch(evt.keyCode){
            case 37:
                xIzquierda=false;
                break;
            
            case 39:
                xDerecha=false;
                break;

            case 32:
                xEspacio=false;
                break;
            case 38:
                xArriba=false;
                break;
            case 90:
                xZeta=true;
                break;
        }
    }

    //Function que controla las animaciones durante el movimiento

    function movimiento(){
        if(xDerecha) { //Comprueba si la tecla pulsada es la de la derecha
            direccion='derecha'; //registra que la última dirección ha sido derecha
            protagonista.animacionPersonaje=protagonista.sprites[3].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[3].coor;
            posicion=(posicion+1)%6; //itera del 0-5 usando la .image y las .coord del array de sprites
        }
        else if(xIzquierda){ //Lo mismo que en el anterior pero con la izda
            direccion='izquierda';
            protagonista.animacionPersonaje=protagonista.sprites[4].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[4].coor;
            posicion=(posicion+1)%6;
        }

        if(xDerecha!=true && direccion=='derecha'){ //Ahora comprobamos si se ha dejado de pulsar la derecha y 
            posicion=(posicion+1)%6;                //la última dirección ha sido hacia la derecha
            protagonista.animacionPersonaje=protagonista.sprites[0].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[0].coor;//En caso afirmativo asociamos el sprite quieto mirando a la derecha
        }
        else if(xIzquierda!=true && direccion=='izquierda'){ //Lo mismo con la izquierda
            posicion=(posicion+1)%6;
            protagonista.animacionPersonaje=protagonista.sprites[1].image;
            protagonista.animacionPersonajeCoor=protagonista.sprites[1].coor;
        }
        
        if(enAire){ //Comprobará si estamos en el aire y mirando derecha/izda/arriba y le asociará el sprite correspondiente
            if(direccion=='derecha'){
                protagonista.animacionPersonaje=protagonista.sprites[7].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[7].coor;
                posicion=0;    
            }else if(direccion=='izquierda'){
                protagonista.animacionPersonaje=protagonista.sprites[8].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[8].coor;
                posicion=0;
            }
            if(xArriba){
                protagonista.animacionPersonaje=protagonista.sprites[9].image;
                protagonista.animacionPersonajeCoor=protagonista.sprites[9].coor;
                posicion=0;
            }
        }
        
    }

    //Function para generar el personaje

    function generarPersonaje(){
        ctx.clearRect(0,0,450,800); //Limpiamos el canva

        if(xIzquierda){ //En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
            protagonista.andarIzquierda();
        }
        if(xDerecha){//Lo mismo con la izda
            protagonista.andarDerecha();
        }
        if(xEspacio){//Y con el espacio, el cual es el botón para saltar
            protagonista.salto();
        }

        //Función que realizará el salto
        if(enAire){ //Comprueba si el personaje está en el aire
            protagonista.y+=velSalto; //En caso afirmativo le sumará el número -13 por lo que restará y le hará ascender
            velSalto+=gravedad; //A -13 le sumamos 0,5 hasta que el número vuelva a ser positivo y haga al personaje bajar, creando la ilusión de caída
            if(protagonista.y>=765){ // Para que el personaje caiga al suelo comprobará la Y
                protagonista.y=765; //Y la establecerá como límite
                enAire=false; //Devolvemos el estado a false
                velSalto=0; //Y la velocidad del salto a 0
            }
        }
        
        //Dibujamos al personaje
        ctx.drawImage(
            protagonista.animacionPersonaje, //Imagen del sprite
            protagonista.animacionPersonajeCoor[posicion][0], //Posición X del sprite
            protagonista.animacionPersonajeCoor[posicion][1], //Posición Y del sprite
            protagonista.tamanioX, //Tamaño X del sprite
            protagonista.tamanioY, //Tamaño Y del sprite
            protagonista.x, //Posición X del personaje en el canva
            protagonista.y, //Posición Y del personaje en el canva
            protagonista.tamanioX, //Tamaño X del personaje
            protagonista.tamanioY); //Tamaño Y del personaje
    }

    document.addEventListener("keyup",desactivaMovimiento,false); //Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); //Manejador de eventos que registra si se ha pulsado una tecla

    id1=setInterval(generarPersonaje,300/24); //Intervalos que ejecutará la función que genera el personaje y los sprites
    id2=setInterval(movimiento,800/24)

}