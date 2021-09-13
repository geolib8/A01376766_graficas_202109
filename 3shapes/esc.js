//clase del escutoide
class Esc {
    //constructor del escutoide 
    constructor() {
    }
    createEscutoide(gl, translation, rotationAxis, mat4, duration) {
        let vertexBuffer;
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        let verts = [
            //caras del escutoide una por una dibujadas con los ángulos
            0, -1, .5, 
            0.5*Math.cos(18*(Math.PI/180)), -1, 0.5*Math.sin(18*(Math.PI/180)), 
            0.5*Math.cos(-54*(Math.PI/180)), -1, 0.5*Math.sin(-54*(Math.PI/180)), 
            0.5*Math.cos(-126*(Math.PI/180)), -1, 0.5*Math.sin(-126*(Math.PI/180)), 
            0.5*Math.cos(-198*(Math.PI/180)), -1, 0.5*Math.sin(-198*(Math.PI/180)),

            0,0.8,0,
            0.7*Math.cos(60*(Math.PI/180)), 1, 0.7*Math.sin(60*(Math.PI/180)),
            0.7*Math.cos(120*(Math.PI/180)), 1, 0.7*Math.sin(120*(Math.PI/180)),
            0.7*Math.cos(180*(Math.PI/180)), 1, 0.7*Math.sin(180*(Math.PI/180)),
            0.7*Math.cos(240*(Math.PI/180)), 1, 0.7*Math.sin(240*(Math.PI/180)),
            0.7*Math.cos(300*(Math.PI/180)), 1, 0.7*Math.sin(300*(Math.PI/180)),
            0.7*Math.cos(360*(Math.PI/180)), 1, 0.7*Math.sin(360*(Math.PI/180)),

            0,0.3,1,
            0.7*Math.cos(60*(Math.PI/180)), 1, 0.7*Math.sin(60*(Math.PI/180)),
            0.7*Math.cos(120*(Math.PI/180)), 1, 0.7*Math.sin(120*(Math.PI/180)),

            0,0.3,1,
            0, -1, .5, 
            0.5*Math.cos(18*(Math.PI/180)), -1, 0.5*Math.sin(18*(Math.PI/180)),   
            0.7*Math.cos(60*(Math.PI/180)), 1, 0.7*Math.sin(60*(Math.PI/180)),
            0.7*Math.cos(360*(Math.PI/180)), 1, 0.7*Math.sin(360*(Math.PI/180)), 

            0,0.3,1,
            0, -1, .5,
            0.5*Math.cos(-198*(Math.PI/180)), -1, 0.5*Math.sin(-198*(Math.PI/180)),
            0.7*Math.cos(120*(Math.PI/180)), 1, 0.7*Math.sin(120*(Math.PI/180)),
            0.7*Math.cos(180*(Math.PI/180)), 1, 0.7*Math.sin(180*(Math.PI/180)),

            0.5*Math.cos(-198*(Math.PI/180)), -1, 0.5*Math.sin(-198*(Math.PI/180)),
            0.5*Math.cos(-126*(Math.PI/180)), -1, 0.5*Math.sin(-126*(Math.PI/180)), 
            0.7*Math.cos(180*(Math.PI/180)), 1, 0.7*Math.sin(180*(Math.PI/180)), 
            0.7*Math.cos(240*(Math.PI/180)), 1, 0.7*Math.sin(240*(Math.PI/180)),

            0.5*Math.cos(18*(Math.PI/180)), -1, 0.5*Math.sin(18*(Math.PI/180)), 
            0.5*Math.cos(-54*(Math.PI/180)), -1, 0.5*Math.sin(-54*(Math.PI/180)),
            0.7*Math.cos(360*(Math.PI/180)), 1, 0.7*Math.sin(360*(Math.PI/180)),
            0.7*Math.cos(300*(Math.PI/180)), 1, 0.7*Math.sin(300*(Math.PI/180)), 

            0.5*Math.cos(-54*(Math.PI/180)), -1, 0.5*Math.sin(-54*(Math.PI/180)), 
            0.5*Math.cos(-126*(Math.PI/180)), -1, 0.5*Math.sin(-126*(Math.PI/180)),
            0.7*Math.cos(240*(Math.PI/180)), 1, 0.7*Math.sin(240*(Math.PI/180)),
            0.7*Math.cos(300*(Math.PI/180)), 1, 0.7*Math.sin(300*(Math.PI/180)),
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        let colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        let faceColors = [
            [1.0, 0.3, 0.8, 1.0], [0.0, 0.0, 1.0, 1.0], [0.0, 1.0, 0.0, 1.0], 
            [1.0, 0.0, 1.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 1.0, 1.0], 
            [1.0, 0.0, 0.5, 1.0], [0.5, 1.0, 0.3, 1.0]
        ];

        // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
        let vertexColors = [];
        //se colorea 1 por 1 por ser diferentes
        for(let i = 0; i<5; i++){
            vertexColors.push(...faceColors[0]);
        }
        for(let i = 0; i<7; i++){
            vertexColors.push(...faceColors[1]);
        }
        for(let i = 0; i<3; i++){
            vertexColors.push(...faceColors[2]);
        }
        for(let i = 0; i<5; i++){
            vertexColors.push(...faceColors[3]);
        }
        for(let i = 0; i<5; i++){
            vertexColors.push(...faceColors[4]);
        }
        for(let i = 0; i<4; i++){
            vertexColors.push(...faceColors[5]);
        }
        for(let i = 0; i<4; i++){
            vertexColors.push(...faceColors[6]);
        }
        for(let i = 0; i<4; i++){
            vertexColors.push(...faceColors[7]);
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

        // Index data (defines the triangles to be drawn).
        let IndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBuffer);

        let Indices = [
            //indíces de cada cara
            0,1,2,  0,2,3,  0,3,4,

            5,6,7,  5,7,8,  5,8,9, 5,9,10, 5,10,11, 5,11,6,

            12,13,14,

            15,16,18,  16,18,17,  18,17,19, 

            20,21,23,  23,21,22,  23,22,24,

            25,26,27,  28,26,27, 

            29,30,31,  32,31,30,

            33,34,36,  35,36,34
        ];

        // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
        // Uint16Array: Array of 16-bit unsigned integers.
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Indices), gl.STATIC_DRAW);

        let escutoide = {
            buffer: vertexBuffer, colorBuffer: colorBuffer, indices: IndexBuffer,
            vertSize: 3, nVerts: 37, colorSize: 4, nColors: 24, nIndices: 66,
            primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
        };

        mat4.translate(escutoide.modelViewMatrix, escutoide.modelViewMatrix, translation);

        escutoide.update = function () {
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

        return escutoide;

    }
}


export { Esc };