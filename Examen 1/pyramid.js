let projectionMatrix = null, shaderProgram = null;

let shaderVertexPositionAttribute = null, shaderVertexColorAttribute = null, shaderProjectionMatrixUniform = null, shaderModelViewMatrixUniform = null;

let mat4 = glMatrix.mat4;

let duration = 10000;

let vertexShaderSource = `#version 300 es
in vec3 vertexPos;
in vec4 vertexColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec4 vColor;

void main(void) {
    // Return the transformed and projected vertex value
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
    // Output the vertexColor in vColor
    vColor = vertexColor;
}`;

let fragmentShaderSource = `#version 300 es
    precision lowp float;
    in vec4 vColor;
    out vec4 fragColor;

    void main(void) {
    // Return the pixel color: always output white
    fragColor = vColor;
}
`;

function createShader(glCtx, str, type) {
    let shader = null;

    if (type == "fragment")
        shader = glCtx.createShader(glCtx.FRAGMENT_SHADER);
    else if (type == "vertex")
        shader = glCtx.createShader(glCtx.VERTEX_SHADER);
    else
        return null;

    glCtx.shaderSource(shader, str);
    glCtx.compileShader(shader);

    if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        throw new Error(glCtx.getShaderInfoLog(shader));
    }

    return shader;
}

function initShader(glCtx, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = createShader(glCtx, vertexShaderSource, "vertex");
    const fragmentShader = createShader(glCtx, fragmentShaderSource, "fragment");

    let shaderProgram = glCtx.createProgram();

    glCtx.attachShader(shaderProgram, vertexShader);
    glCtx.attachShader(shaderProgram, fragmentShader);
    glCtx.linkProgram(shaderProgram);

    if (!glCtx.getProgramParameter(shaderProgram, glCtx.LINK_STATUS)) {
        throw new Error("Could not initialise shaders");
    }

    return shaderProgram;
}

function initWebGL(canvas) {
    let gl = null;
    let msg = "Your browser does not support WebGL, or it is not enabled by default.";

    try {
        gl = canvas.getContext("webgl2");
    }
    catch (e) {
        msg = "Error creating WebGL Context!: " + e.toString();
    }

    if (!gl) {
        throw new Error(msg);
    }

    return gl;
}

function initViewport(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initGL(gl, canvas) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 100);
}

function draw(gl, objs) {
    // clear the background (with black)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set the shader to use
    gl.useProgram(shaderProgram);

    for (const obj of objs) {
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);

        gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, obj.modelViewMatrix);

        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    }
}

let nuevosVerts = [];
function first_last(p, iter) {
    if (iter == 0) {
        nuevosVerts.push(p[0]);
        nuevosVerts.push(p[1]);
        nuevosVerts.push(p[2]);
        nuevosVerts.push(p[3]);
        nuevosVerts.push(p[4]);
        nuevosVerts.push(p[5]);
        nuevosVerts.push(p[6]);
        nuevosVerts.push(p[7]);
        nuevosVerts.push(p[8]);
    } else {
        first_last([(p[6] + p[0]) / 2, (p[7] + p[1]) / 2, (p[8] + p[2]) / 2, (p[6] + p[3]) / 2, (p[7] + p[4]) / 2, (p[8] + p[5]) / 2, p[6], p[7], p[8]], iter - 1);
        first_last([p[0], p[1], p[2], p[6], p[4], p[5], (p[6] + p[0]) / 2, (p[7] + p[1]) / 2, (p[8] + p[2]) / 2], iter - 1);
        first_last([p[6], p[1], p[2], p[3], p[4], p[5], (p[6] + p[3]) / 2, (p[7] + p[4]) / 2, (p[8] + p[5]) / 2], iter - 1);
    }
}

function second_third(p, iter) {
    if (iter == 0) {
        nuevosVerts.push(p[0]);
        nuevosVerts.push(p[1]);
        nuevosVerts.push(p[2]);
        nuevosVerts.push(p[3]);
        nuevosVerts.push(p[4]);
        nuevosVerts.push(p[5]);
        nuevosVerts.push(p[6]);
        nuevosVerts.push(p[7]);
        nuevosVerts.push(p[8]);
    } else {
        second_third([(p[6] + p[0]) / 2, (p[7] + p[1]) / 2, (p[8] + p[2]) / 2, (p[6] + p[3]) / 2, (p[7] + p[4]) / 2, (p[8] + p[5]) / 2, p[6], p[7], p[8]], iter - 1);
        second_third([p[0], p[1], p[2], (p[0] + p[3]) / 2, p[1], (p[2] + p[5]) / 2, (p[6] + p[0]) / 2, (p[7] + p[1]) / 2, (p[8] + p[2]) / 2], iter - 1);
        second_third([(p[0] + p[3]) / 2, p[1], (p[2] + p[5]) / 2, p[3], p[4], p[5], (p[6] + p[3]) / 2, (p[7] + p[4]) / 2, (p[8] + p[5]) / 2], iter - 1);
    }
}

function createPyramid(gl, translation, rotationAxis) {
    first_last([1, -1, 1, -1, -1, 1, 0, -1, -1], 2);
    first_last([1, -1, 1, -1, -1, 1, 0, 1, 0], 2);
    second_third([0, -1, -1, 1, -1, 1, 0, 1, 0], 2);
    second_third([-1, -1, 1, 0, -1, -1, 0, 1, 0], 2);
    let verts = nuevosVerts;
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // Color data
    let colors = [];
    for (let i = 0; i < (verts.length); i++) {
        colors.push([Math.random(), Math.random(), Math.random(), 1.0]);
    }
    let vertexColors = [];
    colors.forEach(color => {
        for (let i = 0; i < 3; i++) {
            vertexColors.push(...color);
        }
    });

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    // Index data (defines the triangles to be drawn).
    let pyramidIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexBuffer);

    let pyramidIndices = [];

    for (let i = 0; i < (verts.length / 3); i++) {
        pyramidIndices.push(i);
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pyramidIndices), gl.STATIC_DRAW);

    let pyramid = {
        buffer: vertexBuffer, colorBuffer: colorBuffer, indices: pyramidIndexBuffer,
        vertSize: 3, nVerts: verts.length / 3, colorSize: 4, nColors: vertexColors.length / 4, nIndices: pyramidIndices.length,
        primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
    };

    mat4.translate(pyramid.modelViewMatrix, pyramid.modelViewMatrix, translation);
    mat4.rotate(pyramid.modelViewMatrix, pyramid.modelViewMatrix, Math.PI / 8, [1, 0, 0]);

    pyramid.update = function () {
        let now = Date.now();
        let deltat = now - this.currentTime;
        this.currentTime = now;
        let fract = deltat / duration;
        let angle = Math.PI * 2 * fract;

        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
    };

    return pyramid;
}

function update(glCtx, objs) {
    requestAnimationFrame(() => update(glCtx, objs));

    draw(glCtx, objs);
    objs.forEach(obj => obj.update())
}

function bindShaderAttributes(glCtx, shaderProgram) {
    shaderVertexPositionAttribute = glCtx.getAttribLocation(shaderProgram, "vertexPos");
    glCtx.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderVertexColorAttribute = glCtx.getAttribLocation(shaderProgram, "vertexColor");
    glCtx.enableVertexAttribArray(shaderVertexColorAttribute);

    shaderProjectionMatrixUniform = glCtx.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = glCtx.getUniformLocation(shaderProgram, "modelViewMatrix");
}

function main() {
    let canvas = document.getElementById("pyramidCanvas");
    let glCtx = initWebGL(canvas);

    initViewport(glCtx, canvas);
    initGL(glCtx, canvas);
    let pyramid = createPyramid(glCtx, [0, 0, -5], [0, 1, 0]);

    shaderProgram = initShader(glCtx, vertexShaderSource, fragmentShaderSource);
    bindShaderAttributes(glCtx, shaderProgram);

    update(glCtx, [pyramid]);
}

main();