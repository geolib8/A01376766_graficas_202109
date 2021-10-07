import * as THREE from "./three.js/build/three.module.js";
import { GUI } from "./dat.gui/build/dat.gui.module.js";

let renderer = null, scene = null, camera = null;
//funcion main, canvas
function main() {
    const canvas = document.getElementById("webglcanvas");
    createScene(canvas);
    update();
}
//update que contiene el renderer
function update() {
    requestAnimationFrame(function () { update(); });
    renderer.render(scene, camera);
}
//se crea la escena donde se dibuja todo
function createScene(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    scene = new THREE.Scene();
    //color de le escena
    scene.background = new THREE.Color(0, 0, 0);
    //se agrega la camara
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.z = 10;
    camera.position.y = -1;
    scene.add(camera);
    //se crea el segundo grupo
    const armG = new THREE.Object3D;
    const shoulderG = new THREE.Object3D;
    armG.add(shoulderG);
    let geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshNormalMaterial();
    const shoulder =new THREE.Mesh(geometry,material);
    shoulderG.add(shoulder);
    //se agrega el brazo al grupo del hombro
    geometry = new THREE.BoxGeometry(.5, 1, .5);
    const arm = new THREE.Mesh(geometry,material);
    arm.position.y = -0.8;
    shoulderG.add(arm);

    const elbowG = new THREE.Object3D;
    shoulderG.add(elbowG);
    elbowG.position.set(0,-1.45,0);
    //se agrega el codo 
    geometry = new THREE.BoxGeometry(.2, .2, .2);
    const elbow =new THREE.Mesh(geometry,material);
    elbowG.add(elbow);

    const forearmG = new THREE.Object3D;
    elbowG.add(forearmG);
    forearmG.position.set(0,-.55,0);

    geometry = new THREE.BoxGeometry(.5, .8, .5);
    const forearm =new THREE.Mesh(geometry,material);
    forearmG.add(forearm);
    //se agrega la muñeca al grupo del antebrazo
    const wristG = new THREE.Object3D;
    forearmG.add(wristG);
    wristG.position.set(0, -0.55, 0);

    geometry = new THREE.BoxGeometry(.2, .2, .2);
    const wrist =new THREE.Mesh(geometry,material);
    wristG.add(wrist);

    const handG = new THREE.Object3D;
    wristG.add(handG);
    handG.position.set(0,-.3,0);

    geometry = new THREE.BoxGeometry(.3, .3, .3);
    const hand =new THREE.Mesh(geometry,material);
    handG.add(hand);

    scene.add(armG);
    //gui con los parametros de movimiento para los grupos
    const gui = new GUI();
    gui.add(shoulderG.rotation, 'x', -3, 1).name("Shoulder x:");
    gui.add(shoulderG.rotation, 'z', 0, 3).name("Shoulder z:");
    gui.add(elbowG.rotation, 'x', -2, 0).name("Elbow z:");
    gui.add(forearmG.rotation, 'y', -1, 1).name("Forearm y:");
    gui.add(wristG.rotation, 'x', -0.5, 0.5).name("Wrist x:");
    gui.add(handG.rotation, 'x', -0.5, 0.5).name("Hand x:");
    gui.add(handG.rotation, 'z', -0.5, 0.5).name("Hand z:");
}
main();