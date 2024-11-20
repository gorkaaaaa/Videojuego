//-------------------------------------------------------------------------------------------------------------------------
// Clase del disparo
//-------------------------------------------------------------------------------------------------------------------------


export function Disparo(x_,y_, direccion_){ // Recibirá la posición x e y del protagonista además de la dirección a la que está mirando
    this.x=x_;
    this.y=y_;
    this.direccion=direccion_;
    this.arriba=false;  // Variable para saber si el disparo se debe mover hacia arriba
} 

// Function que dibujará el disparo

Disparo.prototype.dibujarDisparo=function(ctx){ 
    ctx.fillStryl= "#ff376"
    ctx.fillRect(
        this.x+8,
        this.y+18,
        12,
        5
    )
}

// Functions de movimiento

Disparo.prototype.moverIzda=function(){
    this.x=this.x-14
}

Disparo.prototype.moverDer=function(){
    this.x=this.x+14
}

Disparo.prototype.moverArriba=function(){
    this.y=this.y-14
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

Disparo.prototype.diparar=function(){

}