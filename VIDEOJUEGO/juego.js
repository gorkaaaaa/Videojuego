window.onload=function(){
    const canva=document.getElementById("miCanvas");
    let ctx=canva.getContext("2d");
    let xIzquierda, xDerecha, xEspacio, xArriba, xZeta;
    let x=225;
    let y=759;
    let imagen=new Image();
    imagen.src="assets/sprites1.png";
    let protagonista=new Personaje(x,y);
    let id1,id2;
    let posicion=0;
    let enAire=false;
    let gravedad=0.5;
    let velSalto=0;

    function Personaje(x_, y_){
        this.x=x_;
        this.y=y_;

        this.velocidad=3;
        this.tamanioX=30;
        this.tamanioY=41;
        this.imagen=imagen;

        this.spriteDerecha=[[7,1],[38,1],[68,1],[101,1],[135,1],[165,1],[197,1],[230,1],[266,1]];
        this.spriteIzquierda=[[2,45],[33,45],[70,47],[104,47],[137,47],[166,47],[199,47],[232,47],[262,47]];
        this.animacionPersonaje=this.spriteDerecha;
    }

    Personaje.prototype.andarDerecha=function(){
        this.x=this.x+this.velocidad;
        if(this.x>420){
            this.x=420;
        }
    }

    Personaje.prototype.andarIzquierda=function(){
        this.x=this.x-this.velocidad;
        if(this.x<0){
            this.x=0;
        }
    }

    Personaje.prototype.salto=function(){
        if(!enAire){
            enAire=true;
            velSalto=-13;
        }
    }

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

    function movimiento(){
        if(xDerecha) {
            protagonista.animacionPersonaje=protagonista.spriteDerecha;
            posicion=(posicion+1)%9;
        }
        else if(xIzquierda){ 
            protagonista.animacionPersonaje=protagonista.spriteIzquierda;
            posicion=(posicion+1)%9;
        }else{posicion=0};
        if(enAire){
            posicion=2;
        }
        
    }

    function generarPersonaje(){
        ctx.clearRect(0,0,450,800);

        if(xIzquierda){
            protagonista.andarIzquierda();
            
        }
        if(xDerecha){
            protagonista.andarDerecha();
        }
        if(xEspacio){
            protagonista.salto();
        }
        if(enAire){
            protagonista.y+=velSalto;
            velSalto+=gravedad;
            if(protagonista.y>=759){
                protagonista.y=759;
                enAire=false;
                velSalto=0;
            }
        }
        

        ctx.drawImage(
            protagonista.imagen,
            protagonista.animacionPersonaje[posicion][0],
            protagonista.animacionPersonaje[posicion][1],
            protagonista.tamanioX,
            protagonista.tamanioY,
            protagonista.x,
            protagonista.y,
            protagonista.tamanioX,
            protagonista.tamanioY);
    }

    document.addEventListener("keyup",desactivaMovimiento,false);
    document.addEventListener("keydown",activarMovimiento,false);

    id1=setInterval(generarPersonaje,300/24);
    id2=setInterval(movimiento,800/24)

}