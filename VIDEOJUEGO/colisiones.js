//-------------------------------------------------------------------------------------------------------------------------
// Function para generar las coplisiones con las plataformas
//-------------------------------------------------------------------------------------------------------------------------

// Colision enemigos-plataformas

export function colisionPlataformasEnemigo(enem, plataformasArray){

    let colision=false;
    plataformasArray.forEach(plataforma=>{ // Comprobación con un for each con cada plataforma 

        // Variables de la hitbox de la plataforma

        let platIzda=plataforma.coord[0];
        let platDer=plataforma.coord[0]+plataforma.coord[2];
        let platArrib=plataforma.coord[1];
        let platAbaj=plataforma.coord[1]+plataforma.coord[3];

        // Variables de la hitbox del enemigo

        let enemIzda=enem.x;
        let enemDer=enem.x+enem.tamanioX;
        let enemArrib=enem.y;
        let enemAbaj=enem.y+enem.tamanioY;


        // Comprobamos si el enemigo está pisando la plataforma

        if (enemDer > platIzda && enemIzda < platDer && enemAbaj <= platArrib && enemAbaj + enem.velCaida > platArrib){
            
            colision=true;
            enem.enAire=false;
            enem.y=platArrib-enem.tamanioY;
            enem.velCaida=0;
        }
        if(!colision && enem.y!=765 ){
            enem.enAire=true;
        }
    });
    return colision;
}

// Colision prota-plataforma

export function colisionPlataformasProta(prota, plataformasArray){
    let colision=false; // Variable que determina si se está colisionando
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

    });
    return colision;
}

// Colision prota-enemigo

export function colisionProtaEnemigo(prota, enem){

    let colision=false;
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

    if(protaDer>enemIzda && protaIzda<enemDer && protaAbaj>enemArrib && protaArrib<enemAbaj){
        colision=true;
    }


    return colision;
}

// Colision disparo-enemigo

export function colisionEnemigoDisparo(enem,disparo){
    let colision=false;

        // Variables de la hitbox del enemigo

        let enemIzda=enem.x;
        let enemDer=enem.x+enem.tamanioX;
        let enemArrib=enem.y;
        let enemAbaj=enem.y+enem.tamanioY;

        // Variables de la hitbox de la disparo
        let disparoIzda=disparo.x;
        let disparoDer=disparo.x+disparo.tamanioX;
        let disparoArrib=disparo.y;
        let disparoAbaj=disparo.y+disparo.tamanioY;

        if(disparoDer>enemIzda && disparoIzda<enemDer && disparoAbaj>enemArrib && disparoArrib<enemAbaj){
            colision=true;
        }
        return colision;
}

