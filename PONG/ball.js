class ball
{
    constructor(x, y, radio, color, minY, maxY, minX, maxX)
    {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.minY = minY;
        this.maxY = maxY;
        this.minX = minX;
        this.maxX = maxX;
        this.arr=true;
        this.izq=true;
        this.ab=false;
        this.der=false;
    }

    draw(contexto)
    {
        contexto.fillStyle = this.color;
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        contexto.fill();
    }

    update(barraIzq,barraDer)
    {
        if (this.arr){
            this.y-=1;
        }
        if (this.izq){
            this.x-=1;
        }
        if (this.ab){
            this.y+=1;
        }
        if (this.der){
            this.x+=1;
        }
        if((this.y+this.radio) > this.maxY){
            this.arr=true;
            this.ab=false;
        }
        if((this.x+this.radio) > this.maxX){
            this.izq=true;
            this.der=false;
        }
        if((this.y-this.radio) < this.minY){
            this.ab=true;
            this.arr=false;
        }
        if((this.x-this.radio) < this.minX){
            this.der=true;
            this.izq=false;
        }
        if((this.x+this.radio) > (barraDer.x)&&(this.y>=barraDer.y&& this.y<=barraDer.y+barraDer.h)){
            this.izq=true;
            this.der=false;
        }
        if((this.x-this.radio) < (barraIzq.x+barraIzq.w)&&(this.y>=barraIzq.y&& this.y<=barraIzq.y+barraIzq.h)){
            this.der=true;
            this.izq=false;
        }
            
    }
}

export { ball };