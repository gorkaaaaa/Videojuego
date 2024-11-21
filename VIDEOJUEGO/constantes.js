export const canva=document.getElementById("miCanvas");       // Cargamos el canva del HTML
export const ctx=canva.getContext("2d");                      // Le damos el contexto 2D
export const fondo=new Image(); fondo.src='assets/plantilla.png'; // Creo un objeto Image con el fondo
export const musica=new Audio('assets/musica.mp3');           // Creo el objeto audio para la música de fondo
musica.loop=true; musica.play(); musica.volume=0.2;    // La pongo en loop, le bajo el volumen y la reproduzco
export const numEnemigos=5;