    //-------------------------------------------------------------------------------------------------------------------------
    // Funciones para generar las plataformas
    //-------------------------------------------------------------------------------------------------------------------------
    const canva=document.getElementById("miCanvas");       // Cargamos el canva del HTML
    const ctx=canva.getContext("2d");                      // Le damos el contexto 2D
    export function pintarPlataformas(){
        //Plataforma 1
        ctx.fillStyle='green';
        ctx.fillRect(140,661,190,4);

        //Plataforma 2
        ctx.fillStyle='green';
        ctx.fillRect(0,618,90,4);

        //Plataforma 3
        ctx.fillStyle='green';
        ctx.fillRect(359,618,90,4);

        //Plataforma 4
        ctx.fillStyle='green';
        ctx.fillRect(176,535,110,4);

        //Plataforma 5
        ctx.fillStyle='green';
        ctx.fillRect(0,490,50,4);

        //Plataforma 6
        ctx.fillStyle='green';
        ctx.fillRect(400,490,50,4);

        //Plataforma 7
        ctx.fillStyle='green';
        ctx.fillRect(60,405,330,4);

        //Plataforma 8
        ctx.fillStyle='green';
        ctx.fillRect(0,310,160,4);

        //Plataforma 9
        ctx.fillStyle='green';
        ctx.fillRect(290,310,160,4);

        //Plataforma 10
        ctx.fillStyle='green';
        ctx.fillRect(70,245,265,4);

        //Plataforma 11
        ctx.fillStyle='green';
        ctx.fillRect(0,190,70,4);

        //Plataforma 12
        ctx.fillStyle='green';
        ctx.fillRect(250,150,200,4);

        //Plataforma 11
        ctx.fillStyle='green';
        ctx.fillRect(0,90,400,4);

        //Tubería abajo izda
        ctx.fillStyle='red';
        ctx.fillRect(0,700,120,60);

        //Tubería abajo derecha
        ctx.fillStyle='red';
        ctx.fillRect(330,700,120,60);

        //Tubería abajo izda
        ctx.fillStyle='red';
        ctx.fillRect(0,20,120,60);
    }

  