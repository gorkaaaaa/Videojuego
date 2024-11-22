//-------------------------------------------------------------------------------------------------------------------------
// Clase enemigo
//-------------------------------------------------------------------------------------------------------------------------

export function Enemigo(){

    // Atributos con el mismo proposito que los de la clase personaje
    this.x=105;
    this.y=20;
    this.velocidad=(Math.random()*3)+1; // Velocidad aleatoria para que los enemigos se sientan distintos
    this.tamanioY=39;
    this.tamanioX=33;
    this.enAire=false;
    this.velCaida=0; // Velocidad inicial de la caida del enemigo
    this.gravedad=0.5; // Variable que se aplicará durante la caida
    this.direccion='derecha' // Dirección a la que quiero que se dirija el enemigo
    this.posicion=0; // Variable de posición en el array de coordenadas para las animaciones

    // Array de sprites
    this.sprites=[
        { src: 'assets/enemigoDerecha.png', coor:[[7,2],[52,2],[102,2],[155,2],[206,2],[250,2]]}, // Sprite andando hacia la derecha
        { src: 'assets/enemigoIzda.png', coor:[[11,3],[55,3],[106,3],[159,3],[209,3],[254,3]]}    // Sprite andando hacia la izquierda    
    ];

    // Creo una nueva propiedad a cada elemento del array con el objeto imagen con los sprites cargados
    this.sprites.forEach(sprite => {
        const img = new Image();
        img.src = sprite.src;
        sprite.image = img;
    });

    this.animacionEnemigo=this.sprites[0].image;    // Sprite por defecto mirando hacia la derecha
    this.animacionEnemigoCoor=this.sprites[0].coor; // Coordenadas de la animacion mirando hacia la derecha
    
}

// Sonido del enemigo al morir
Enemigo.prototype.audio=new Audio("assets/enemigoMorir.mp3");

// Function que moverá al personaje de izquierda a derecha
Enemigo.prototype.moverEnemigo=function(){
    if(this.direccion==='izquierda'){  // Compruebo si se está dirigiendo a la izquierda
        this.x -= this.velocidad; 
        this.animacionEnemigo=this.sprites[1].image;          // Asocio los sprites a la misma vez que le doy movimiento ya que 
        this.animacionEnemigoCoor=this.sprites[1].coor;       // el movimiento no variará y será siempre el mismo bucle derecha-izquierda
        this.posicion=(this.posicion+1)%6;              
        if (this.x < 0) this.x = 0, this.direccion='derecha'; // En el momento en el que llegue al límite, evita salirse y le cambia de direccion

    }else{ // Mismo funcionamiento pero a la derecha
        this.x += this.velocidad;
        this.animacionEnemigo=this.sprites[0].image;
        this.animacionEnemigoCoor=this.sprites[0].coor;
        this.posicion=(this.posicion+1)%6;
        if (this.x > 420) this.x = 420, this.direccion='izquierda'; 
    }
}

// Function para dibujar al enemigo
Enemigo.prototype.dibujarEnemigo=function(ctx_){
    ctx_.drawImage(
        this.animacionEnemigo,                  // Imagen del sprite
        this.animacionEnemigoCoor[this.posicion][0], // Posición X del sprite
        this.animacionEnemigoCoor[this.posicion][1], // Posición Y del sprite
        this.tamanioX,                            // Tamaño X del sprite
        this.tamanioY,                            // Tamaño Y del sprite
        this.x,                                   // Posición X del Enemigo en el canva
        this.y,                                   // Posición Y del Enemigo en el canva
        this.tamanioX,                            // Tamaño X del Enemigo
        this.tamanioY);                           // Tamaño Y del Enemigo
}

// Function para comprobar si han llegado a la puerta de la nave
Enemigo.prototype.hanLlegado=function(){
    let final=false;
    if(this.y>623) final=true;
    return final;
}