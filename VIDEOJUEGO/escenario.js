    //-------------------------------------------------------------------------------------------------------------------------
    // Funciones para generar las plataformas
    //-------------------------------------------------------------------------------------------------------------------------
    
    // Array de objetos con lo que usaremos para generar las plataformas, su color y coordenadas

    //rgba(0,0,0,0)
    export let plataformasArray=[
        {fillStyle: 'green', coord:[140,661,190,4]}, //---> Plataforma 1
        {fillStyle: 'green', coord:[359,618,90,4]}, //----> Plataforma 2
        {fillStyle: 'green', coord:[0,618,90,4]}, //------> Plataforma 3
        {fillStyle: 'green', coord:[176,535,110,4]}, //---> Plataforma 4
        {fillStyle: 'green', coord:[0,490,50,4]}, //------> Plataforma 5
        {fillStyle: 'green', coord:[400,490,50,4]}, //----> Plataforma 6
        {fillStyle: 'green', coord:[60,405,330,4]}, //----> Plataforma 7
        {fillStyle: 'green', coord:[0,310,160,4]}, //-----> Plataforma 8
        {fillStyle: 'green', coord:[290,310,160,4]}, //---> Plataforma 9
        {fillStyle: 'green', coord:[70,245,265,4]}, //----> Plataforma 10
        {fillStyle: 'green', coord:[0,190,70,4]}, //------> Plataforma 11
        {fillStyle: 'green', coord:[250,150,200,4]}, //---> Plataforma 12
        {fillStyle: 'green', coord:[0,90,400,4]}, //------> Plataforma 13
        {fillStyle: 'red', coord:[0,20,120,60]} //--------> Tubería
            
        ];

    // Functión for each que pintará cada plataforma con los atributos del array

    export function plataformas(ctx){
        plataformasArray.forEach(elemento=>{
            ctx.fillStyle=elemento.fillStyle;
            ctx.fillRect(elemento.coord[0],elemento.coord[1],elemento.coord[2],elemento.coord[3]);
        }
        );
    }


  