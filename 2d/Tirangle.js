//clase para dibujar el triángulo 
class Triangle {
    constructor(verts) {
        this.verts = verts;
    }
    //método para dibujar al triángulo
    dibujarTr(gl) {
        let vertexBuffer;
        vertexBuffer =gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STATIC_DRAW);
        let triangle={ buffer: vertexBuffer, vertSize: 3, nVerts: 3, primtype: gl.TRIANGLES };
        return triangle;
    }
}
export { Triangle };