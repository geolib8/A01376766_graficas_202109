//clase para dibujar el cuadro

class Square {
    constructor(verts) {
        this.verts=verts;
    }
    //método para dibujar el cuadro
    dibujarSqr(gl) {
        let vertexBuffer;
        vertexBuffer=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STATIC_DRAW);
        let square={ buffer: vertexBuffer, vertSize: 3, nVerts: 4, primtype: gl.TRIANGLE_STRIP };
        return square;
    }

}
export { Square };