import { canva, ctx, fondo, musica } from './constantes.js'
import { plataformas,plataformasArray } from './escenario.js';
import { Personaje } from './Personaje.js';
import { Enemigo } from './Enemigo.js';
import { animaciones } from './animaciones.js';
import { xArriba,xDerecha,xEspacio,xIzquierda,xZeta,activarMovimiento,desactivarMovimiento } from './teclas.js';

window.onload=function(){

    let x=225, y=765; // Coordenada X e Y en la que aparecerá el prota 
    const prota=new Personaje(x,y); // Creación del objeto prota con las coordenadas de spawn (En el centro abajo del todo)
    const enemigo=new Enemigo();    // Creación del objeto enemigo

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar las coplisiones con las plataformas
    //-------------------------------------------------------------------------------------------------------------------------

    function colisionPlataformas(prota,enem){
        let colision=false; // Variable que determina si se está colisionando
        let enemigoColision=false;
        plataformasArray.forEach(plataforma=>{ // Comprobación con un for each con cada plataforma 

            // Variables de la hitbox de la plataforma

            let platIzda=plataforma.coord[0];
            let platDer=plataforma.coord[0]+plataforma.coord[2];
            let platArrib=plataforma.coord[1];
            let platAbaj=plataforma.coord[1]+plataforma.coord[3];

            // Variables de la hitbox del personaje

            let protaIzda=prota.x;
            let protaDer=prota.x+prota.tamanioX;
            let protaArrib=prota.y;
            let protaAbaj=prota.y+prota.tamanioY;

            // Variables de la hitbox del enemigo

            let enemIzda=enem.x;
            let enemDer=enem.x+enem.tamanioX;
            let enemArrib=enem.y;
            let enemAbaj=enem.y+enem.tamanioY;

            // Comprobamos si el personaje está tocando la plataforma por los pies (colisión en la parte inferior)

            if (protaDer > platIzda && protaIzda < platDer && protaAbaj <= platArrib && protaAbaj + prota.velSalto > platArrib) {
                colision = true;
                prota.y = platArrib - prota.tamanioY;  // Ajustamos la posición para que quede justo encima de la plataforma
                prota.velSalto = 0;  // Detenemos el salto ya que el personaje ha tocado el suelo
                prota.enAire=false;
            }
            if(!colision && prota.y!=765){ // Si no está haciendo colisión con ninguna platafora y si no está en el suelo
                prota.enAire=true;         // Volvemos al aire y se le aplicará la gravedad
            }



            if (enemDer > platIzda && enemIzda < platDer && enemAbaj <= platArrib && enemAbaj + enem.velCaida > platArrib){
                enemigoColision=true;
                enem.enAire=false;
                enem.y=platArrib-enem.tamanioY;
                enem.velCaida=0;
            }
            if(!enemigoColision && enem.y!=765 ){
                enem.enAire=true;
            }
        });
        return enemigoColision;
    }

    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar el personaje
    //-------------------------------------------------------------------------------------------------------------------------

    function generarPartida(){

        ctx.clearRect(0,0,450,800);        // Limpiamos el canva
        ctx.drawImage(fondo, 0,0,450,800); // Le ponemos fondo al canva

        if(xIzquierda) prota.moverIzda(); // En caso de estar pulsando la tecla izquierda ejecutará la funcion correspondiente
        if(xDerecha) prota.moverDerecha();// Lo mismo con la izda
        if(xEspacio) prota.salto();// Y compruebo si se pulsa espacio, si no esté en el aire o si está en una plataforma

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
        
        if(enemigo.enAire){
            enemigo.y+=enemigo.velCaida;
            enemigo.velCaida+=enemigo.gravedad;
            if(enemigo.y>=765){
                enemigo.y=765;
                enemigo.enAire=false;
                enemigo.velCaida=0;
            }
        }
        
        
        //Dibujamos las plataformas
        plataformas();

        if(colisionPlataformas(prota, enemigo)){
            console.log("colisionn");
        }else{
            console.log("nocolision")
        }
        
        // Dibujamos al personaje
        prota.dibujarProta();

        //Dibujamos y movemos al enemigo
        enemigo.dibujarEnemigo();
        enemigo.moverEnemigo();

    }

    //-------------------------------------------------------------------------------------------------------------------------
    // Manejador de eventos y ejecución de intervalos
    //-------------------------------------------------------------------------------------------------------------------------

    document.addEventListener("keyup",desactivarMovimiento,false); // Manejador de eventos que registra si se ha dejado de pulsar la tecla
    document.addEventListener("keydown",activarMovimiento,false); // Manejador de eventos que registra si se ha pulsado una tecla

    setInterval(generarPartida, 300/24); // Intervalos que ejecutará la función que genera el personaje y los sprites
    setInterval(()=>{animaciones(prota);},800/24);

}