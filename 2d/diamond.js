//clase para dibujar el rombo
class Diamond {
    constructor(verts) {
        this.verts = verts;
    }
    //método para dibujar el rombo
    dibujarR(gl) {
        let vertexBuffer;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STATIC_DRAW);
        let diamond ={ buffer: vertexBuffer, vertSize: 3, nVerts: 5, primtype: gl.TRIANGLE_STRIP };
        return diamond;
    }

}

export { Diamond };