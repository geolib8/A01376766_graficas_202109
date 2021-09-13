//clase dodecaedro
class Dod {
    //contructor del dodecaedro
    constructor() {  
    }
    createDodecaedro(gl, translation, rotationAxis,mat4, duration) {
        let vertexBuffer;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        const t = (1 + Math.sqrt(5)) / 2;
        const r = 1 /t;
        let verts = [
            //dibujar las 12 caras 1 por 1
            - 1, 1, 1, 0, r, t, 1, 1, 1, r, t, 0, - r, t, 0, 

            1, 1, 1, t, 0, r, t, 0, - r, 1, 1, - 1, r, t, 0, 

            t, 0, - r, 1, - 1, - 1,  0, - r, - t, 0, r, - t, 1, 1, - 1, 

            0, - r, - t,- 1, - 1, - 1, - t, 0, - r, - 1, 1, - 1, 0, r, - t, 

            - 1, - 1, - 1, - r, - t, 0, - 1, - 1, 1, - t, 0, r, - t, 0, - r, 

            1, 1, - 1, 0, r, - t,- 1, 1, - 1,- r, t, 0, r, t, 0, 

            - 1, 1, - 1,- t, 0, - r, - t, 0, r, - 1, 1, 1, - r, t, 0, 

            - t, 0, r, - 1, - 1, 1, 0, - r, t, 0, r, t, - 1, 1, 1, 

            1, - 1, - 1, r, - t, 0, - r, - t, 0, - 1, - 1, - 1, 0, - r, - t, 

            0, r, t, 0, - r, t, 1, - 1, 1, t, 0, r, 1, 1, 1, 

            t, 0, r, 1, - 1, 1, r, - t, 0, 1, - 1, - 1, t, 0, - r,

            - 1, - 1, 1,- r, - t, 0,r, - t, 0, 1, - 1, 1, 0, - r, t 
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        let faceColors = [
            [1.0, 0.0, 0.0, 1.0], [1.0, 0.3, 0.1, 1.0], [0.5, 1.0, 1.0, 1.0],
            [1.0, 1.0, 0.3, 1.0], [1.0, 0.0, 0.4, 1.0], [1.0, 0.8, 0.4, 1.0], 
            [1.0, 0.3, 0.6, 1.0],[0.3, 0.7, 0.3, 1.0],[1.0, 0.3, 1.0, 1.0],
            [0.5, 0.2, 0.6, 1.0],[0.1, 0.8, 0.2, 1.0],[0.7, 0.5, 0.5, 1.0]
        ];
        let vertexColors = [];
        faceColors.forEach(color => {
            //for de los vértices
            for (let j = 0; j < 5; j++)
                vertexColors.push(...color);
        });

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

        // Index data (defines the triangles to be drawn).
        let IndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBuffer);

        let Indices = [
            //12 caras 1 por 1
            0,1,2,  0,2,3,  0,3,4, 
            5,6,7,  5,7,8,  5,8,9, 
            10,11,12,  10,12,13,  10,13,14,
            15,16,17,  15,17,18,  15,18,19,
            20,21,22,  20,22,23,  20,23,24, 
            25,26,27, 25,27,28,  25,28,29, 
            30,31,32,  30,32,33,  30,33,34, 
            35,36,37,  35, 37,38, 35,38,39, 
            40,41,42,  40,42,43,  40,43,44,
            45,46,47,  45,47,48,  45,48,49,
            50,51,52,  50,52,53,  50,53,54, 
            55,56,57,  55,57,58,  55,58,59 
        ];

        // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
        // Uint16Array: Array of 16-bit unsigned integers.
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Indices), gl.STATIC_DRAW);

        let dodecaedro = {
            buffer: vertexBuffer, colorBuffer: colorBuffer, indices: IndexBuffer,
            vertSize: 3, nVerts: 60, colorSize: 4, nColors: 60, nIndices: 108,
            primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
        };

        mat4.translate(dodecaedro.modelViewMatrix, dodecaedro.modelViewMatrix, translation);

        dodecaedro.update = function () {
            let now = Date.now();
            let deltat = now - this.currentTime;
            this.currentTime = now;
            let fract = deltat / duration;
            let angle = Math.PI * 2 * fract;

            // Rotates a mat4 by the given angle
            // mat4 out the receiving matrix
            // mat4 a the matrix to rotate
            // Number rad the angle to rotate the matrix by
            // vec3 axis the axis to rotate around
            mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
        };

        return dodecaedro;

    }
}


export { Dod };