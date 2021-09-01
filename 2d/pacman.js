//clase para dibujar el pacman
class Pacman {
    constructor(verts) {
        this.verts = verts;
    }
    //método para dibujar el pacman
    dibujarPac(gl) {
        let vertexBuffer;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        let r = 0.5;
        for (var i = 40; i <= 310; i++) {
            this.verts.push(r*Math.cos(i*Math.PI/180));
            this.verts.push(r*Math.sin(i*Math.PI/180));
            this.verts.push(0);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STATIC_DRAW);
        let pacman = { buffer: vertexBuffer, vertSize: 3, nVerts: 310, primtype: gl.TRIANGLE_FAN };
        return pacman;
    }

}

export { Pacman };