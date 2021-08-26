//clase para dibujar
class Draw{
    constructor(coords,color){
        this.coords=coords;
        this.color=color;
    }
    //dibuja los triangulos como en python
    dibujo(cond){
        cond.fillStyle=this.color;
        cond.beginPath();
        cond.moveTo(this.coords[0][0],this.coords[0][1]);
        cond.lineTo(this.coords[1][0],this.coords[1][1]);
        cond.lineTo(this.coords[2][0],this.coords[2][1]);
        cond.closePath();
        cond.fill();
    }
}
//exportar para el otro documento js
export{Draw};