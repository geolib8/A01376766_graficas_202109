//clase del octaedro
class Oct {
    //constuctor del octaedro
    constructor() {
    }
    createOctaedro(gl, translation, rotationAxis, mat4, duration) {
        let vertexBuffer;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var up = true;
        let verts = [
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 

            - 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 

            1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0,

            - 1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 

            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0,

            - 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, 0.0, 

            1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, -1.0, 0.0, 

            - 1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, -1.0, 0.0 
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        let faceColors = [
            [1.0, 0.0, 0.0, 1.0],[0.0, 0.0, 1.0, 1.0],[0.0, 1.0, 0.0, 1.0], 
            [1.0, 0.0, 1.0, 1.0],[1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 1.0, 1.0],
            [1.0, 0.0, 0.5, 1.0], [0.5, 1.0, 0.0, 1.0]
        ];

        // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
        let vertexColors = [];
        //for de los vértices
        faceColors.forEach(color => {
            for (let j = 0; j < 3; j++)
                vertexColors.push(...color);
        });

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

        // Index data (defines the triangles to be drawn).
        let IndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBuffer);

        let Indices = [
            0, 1, 2, 
            3, 4, 5,   
            6, 7, 8,
            9, 10, 11,  
            12, 13, 14,
            15, 16, 17,
            18, 19, 20,
            21, 22, 23
        ];

        // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
        // Uint16Array: Array of 16-bit unsigned integers.
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Indices), gl.STATIC_DRAW);

        let octaedro = {
            buffer: vertexBuffer, colorBuffer: colorBuffer, indices: IndexBuffer,
            vertSize: 3, nVerts: 24, colorSize: 4, nColors: 24, nIndices: 24,
            primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
        };

        mat4.translate(octaedro.modelViewMatrix, octaedro.modelViewMatrix, translation);
        octaedro.update = function () {
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

            //aqui sube y baja la figura
            if (this.modelViewMatrix[13] > 1.3) {
                up = false;
                this.modelViewMatrix[13] = 1.3;

            }

            else if (this.modelViewMatrix[13] < -1.3) {
                up = true;
                this.modelViewMatrix[13] = -1.3;
            }
            if (up) {
                mat4.translate(octaedro.modelViewMatrix, octaedro.modelViewMatrix, [0, angle, 0]);
            } else {
                mat4.translate(octaedro.modelViewMatrix, octaedro.modelViewMatrix, [0, -angle, 0]);
            }
        };

        return octaedro;

    }
}


export { Oct };