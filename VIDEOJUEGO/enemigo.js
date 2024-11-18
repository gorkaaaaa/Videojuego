//-------------------------------------------------------------------------------------------------------------------------
// Clase enemigo
//-------------------------------------------------------------------------------------------------------------------------

export function Enemigo(){

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
    
}