//importar el dibujo
import { Draw } from "./draw.js";
let canvas=null,cond=null;
function sierTriangle(coords,numero){
    //colores en los que se puede dibujar
    let colors = ['salmon','white'];
    let firstDraw= new Draw(coords,colors[numero]);
    firstDraw.dibujo(cond);
    //funcion que divide los puntos
    function divide(x,y){
        return [(x[0]+y[0])/2,(x[1]+y[1])/2];
    }
    //recursividad
    if(numero>0){
        sierTriangle([coords[0],divide(coords[0],coords[1]),divide(coords[0],coords[2])],numero-1);
        sierTriangle([coords[1],divide(coords[0],coords[1]),divide(coords[1],coords[2])],numero-1);
        sierTriangle([coords[2],divide(coords[2],coords[0]),divide(coords[1],coords[2])],numero-1);
    }
}
//cambiar el valor según el slide
function slideChange(coords){
    var numberChange=document.getElementById("count");
    var slide=document.getElementById("slide");
    slide.oninput=function(){
        numberChange.innerHTML=slide.value;
        sierTriangle(coords,slide.value);
    }
}
//funcion main
function main(){
    canvas = document.getElementById("canvas");
    cond = canvas.getContext('2d');
    let coords = [[0,400],[200,0],[400,400]];
    sierTriangle(coords,0);
    slideChange(coords);
}
main();

