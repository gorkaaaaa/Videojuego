//-------------------------------------------------------------------------------------------------------------------------
// Clase del disparo
//-------------------------------------------------------------------------------------------------------------------------


export function Disparo(x_,y_, direccion_){ // Recibirá la posición x e y del protagonista además de la dirección a la que está mirando
    this.x=x_;
    this.y=y_;
    this.tamanioX=12;
    this.tamanioY=5;
    this.direccion=direccion_;
    this.arriba=false;  // Variable para saber si el disparo se debe mover hacia arriba
    this.abajo=false;   // Lo mismo pero para abajo
    this.velocidad=8;
    this.sprite=new Image();
    this.sprite.src='assets/disparo.png'
} 

// Sonido del disparo

Disparo.prototype.audio=new Audio("assets/disparoSonido.mp3");

// Function que dibujará el disparo

Disparo.prototype.dibujarDisparo=function(ctx){ 
    ctx.fillStryl= "#ff376"
    ctx.drawImage(
        this.sprite,
        1,
        1,
        9,
        9,
        this.x+8,
        this.y+18,
        this.tamanioX,
        this.tamanioY
    )
}

// Functions de movimiento

Disparo.prototype.moverIzda=function(){
    this.x-=this.velocidad;
}

Disparo.prototype.moverDer=function(){
    this.x+=this.velocidad;
}

Disparo.prototype.moverArriba=function(){
    this.y-=this.velocidad;
}

Disparo.prototype.moverAbajo=function(){
    this.y+=this.velocidad;
}

// Function para saber si la bala ha llegado o no al límite

Disparo.prototype.limite=function(){
    let limite=false;
    if (this.x<=0 ||
        this.x>=450 ||
        this.y<=0
    ) limite=true;

    return limite;
}