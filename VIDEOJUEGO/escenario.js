    //-------------------------------------------------------------------------------------------------------------------------
    // Funciones para generar las plataformas
    //-------------------------------------------------------------------------------------------------------------------------
    import{canva, ctx, fondo, musica } from './constantes.js'
    
    // Array de objetos con lo que usaremos para generar las plataformas, su color y coordenadas

    export let plataformasArray=[
        {fillStyle: 'rgba(0,0,0,0)', coord:[140,661,190,4]}, //---> Plataforma 1
        {fillStyle: 'rgba(0,0,0,0)', coord:[359,618,90,4]}, //----> Plataforma 2
        {fillStyle: 'rgba(0,0,0,0)', coord:[0,618,90,4]}, //------> Plataforma 3
        {fillStyle: 'rgba(0,0,0,0)', coord:[176,535,110,4]}, //---> Plataforma 4
        {fillStyle: 'rgba(0,0,0,0)', coord:[0,490,50,4]}, //------> Plataforma 5
        {fillStyle: 'rgba(0,0,0,0)', coord:[400,490,50,4]}, //----> Plataforma 6
        {fillStyle: 'rgba(0,0,0,0)', coord:[60,405,330,4]}, //----> Plataforma 7
        {fillStyle: 'rgba(0,0,0,0)', coord:[0,310,160,4]}, //-----> Plataforma 8
        {fillStyle: 'rgba(0,0,0,0)', coord:[290,310,160,4]}, //---> Plataforma 9
        {fillStyle: 'rgba(0,0,0,0)', coord:[70,245,265,4]}, //----> Plataforma 10
        {fillStyle: 'rgba(0,0,0,0)', coord:[0,190,70,4]}, //------> Plataforma 11
        {fillStyle: 'rgba(0,0,0,0)', coord:[250,150,200,4]}, //---> Plataforma 12
        {fillStyle: 'rgba(0,0,0,0)', coord:[0,90,400,4]}, //------> Plataforma 13
        {fillStyle: 'red', coord:[0,20,120,60]} //--------> Tubería
            
        ];

    // Functión for each que pintará cada plataforma con los atributos del array

    export function plataformas(){
        plataformasArray.forEach(elemento=>{
            ctx.fillStyle=elemento.fillStyle;
            ctx.fillRect(elemento.coord[0],elemento.coord[1],elemento.coord[2],elemento.coord[3]);
        }
        );
    }


  