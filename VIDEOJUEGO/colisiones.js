    //-------------------------------------------------------------------------------------------------------------------------
    //Function para generar las coplisiones con las plataformas
    //-------------------------------------------------------------------------------------------------------------------------

export function colisionPlataformas(prota,enem, plataformasArray){
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

        // Comprobamos si el personaje está pisando la plataforma

        if (protaDer > platIzda && protaIzda < platDer && protaAbaj <= platArrib && protaAbaj + prota.velSalto > platArrib) {

            colision = true;
            prota.y = platArrib - prota.tamanioY;  // Ajustamos la posición para que quede justo encima de la plataforma
            prota.velSalto = 0;  // Detenemos el salto ya que el personaje ha tocado el suelo
            prota.enAire=false;

        }
        if(!colision && prota.y!=765){ // Si no está haciendo colisión con ninguna platafora y si no está en el suelo
            prota.enAire=true;         // Volvemos al aire y se le aplicará la gravedad
        }

        // Comprobamos si el enemigo está pisando la plataforma

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