import * as THREE from './libs/three.js/r131/three.module.js';
import { OrbitControls } from './libs/three.js/r131/controls/OrbitControls.js';
import { OBJLoader } from './libs/three.js/r131/loaders/OBJLoader.js';
import { MTLLoader } from './libs/three.js/r131/loaders/MTLLoader.js';

let renderer = null, scene = null, camera = null, objectList = [],
    sun = null,
    mercury = null, merGroup = null,
    venus = null, venGroup = null,
    earth = null, earGroup = null, earMGroup = null, moon = null,
    mars = null, marGroup = null, marMGroup = null, phobos = null, deimos = null,
    asGroup = null,
    jupiter = null, jupGroup = null, jupMGroup = null, jupMoon = null, jupMoons = [],
    saturn = null, satGroup = null, satMGroup = null, satRGroup = null, satMoon = null, satMoons = [],
    uranus = null, uraGroup = null, uraMGroup = null, uraMoon = null, uraMoons = [],
    neptune = null, nepGroup = null, nepMGroup = null, nepMoon = null, nepMoons = [],
    pluto = null, pluGroup = null, pluMGroup = null, pluMoon = null, pluMoons = [],
    orbitControls = null;

let objMtlModelUrl = { obj: './models/10464_Asteroid_v1_Iterations-2.obj', mtl: './models/10464_Asteroid_v1_Iterations-2.mtl' };

let duration = 10000; // ms
let currentTime = Date.now();

function animate() {
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
//se dibuja el sol
    sun.rotation.z += angle / 10;
//se dibujan los planetas uno por 1
    merGroup.rotation.z += angle / 2;
    mercury.rotation.z += angle * 10;

    venGroup.rotation.z += angle / 3.7;
    venus.rotation.z += angle * 3;

    earth.rotation.y += angle;
    moon.rotation.z += angle * 10;
    earMGroup.rotation.z += angle * 3;
    earGroup.rotation.z += angle / 4;

    mars.rotation.y += angle;
    phobos.rotation.z += angle * 10;
    deimos.rotation.z += angle * 10;
    marMGroup.rotation.z += angle * 3;
    marGroup.rotation.z += angle / 6;

    asGroup.rotation.z += 0.001;
    for (const object of objectList)
        if (object)
            object.rotation.y += angle * 2;

    jupiter.rotation.y += angle / 2;
    for (const object of jupMoons)
        if (object)
            object.rotation.z += angle * 10;
    jupMGroup.rotation.z += angle * 3;
    jupGroup.rotation.z += angle / 8;

    saturn.rotation.y += angle / 2;
    for (const object of satMoons)
        if (object)
            object.rotation.z += angle * 10;
    satMGroup.rotation.z += angle * 3;
    satGroup.rotation.z += angle /13;

    uranus.rotation.y += angle / 2;
    for (const object of uraMoons)
        if (object)
            object.rotation.z += angle * 10;
    uraMGroup.rotation.z += angle * 3;
    uraGroup.rotation.z += 0.0002;

    neptune.rotation.y += angle / 2;
    for (const object of nepMoons)
        if (object)
            object.rotation.z += angle * 10;
    nepMGroup.rotation.z += angle * 3;
    nepGroup.rotation.z += 0.00015;

    pluto.rotation.y += angle / 2;
    for (const object of pluMoons)
        if (object)
            object.rotation.z += angle * 10;
    pluMGroup.rotation.z += angle * 3;
    pluGroup.rotation.z += 0.0001;
}

function update() {
    requestAnimationFrame(() => update());

    // Render the scene
    renderer.render(scene, camera);

    // Spin the cube for next frame
    animate();

    orbitControls.update();
}

function createScene(canvas) {
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    renderer.shadowMap.enabled = true;

    // Create a new Three.js scene
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0, 0, 0);

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.y -= 90;
    camera.position.z += 90;
    orbitControls = new OrbitControls(camera, renderer.domElement);

    // Add light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 0);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xaaccbb, 0.3);
    scene.add(light);
    light.castShadow = true;
    scene.add(ambientLight);

    // Sun and sunlight group
    const sunGroup = new THREE.Object3D;

    // Sun
    const sunTextureUrl = './imgs/sunmap.jpg';
    const sunTexture = new THREE.TextureLoader().load(sunTextureUrl);
    const sunMaterial = new THREE.MeshPhongMaterial({ map: sunTexture, emissive: 0xfbe800, emissiveIntensity: .8 });
    var geometry = new THREE.SphereGeometry(5, 40, 40);

    sun = new THREE.Mesh(geometry, sunMaterial);
    sunGroup.add(sun);
    scene.add(sunGroup);

    //Mercury orbit
    geometry = new THREE.RingGeometry(8.1, 8.15, 100);
    const ringMerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const mercuryRing = new THREE.Mesh(geometry, ringMerMaterial);
    scene.add(mercuryRing);

    // Mercury group
    merGroup = new THREE.Object3D;

    // Mercury
    const merTextureUrl = './imgs/mercurymap.jpg';
    const merBumpUrl = './imgs/mercurymap.jpg';
    const mercuryTexture = new THREE.TextureLoader().load(merTextureUrl);
    const mercuryBump = new THREE.TextureLoader().load(merBumpUrl);
    const merMaterial = new THREE.MeshPhongMaterial({ map: mercuryTexture, bumpMap: mercuryBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(.1, 40, 40);

    mercury = new THREE.Mesh(geometry, merMaterial);
    merGroup.add(mercury);
    mercury.position.y = 8.1;
    scene.add(merGroup);

    // Venus orbit
    geometry = new THREE.RingGeometry(10.7, 10.75, 100);
    const ringVenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const venusRing = new THREE.Mesh(geometry, ringVenMaterial);
    scene.add(venusRing);

    // Venus group
    venGroup = new THREE.Object3D;

    // Venus
    const venTextureUrl = './imgs/venusmap.jpg';
    const venBumpUrl = './imgs/venusmap.jpg';
    const venNormalUrl = './imgs/VenusNormal2k.png'
    const venusTexture = new THREE.TextureLoader().load(venTextureUrl);
    const venusBump = new THREE.TextureLoader().load(venBumpUrl);
    const venusNormal = new THREE.TextureLoader().load(venNormalUrl);
    const venMaterial = new THREE.MeshPhongMaterial({ map: venusTexture, bumpMap: venusBump, bumpScale: 0.2, normalMap: venusNormal});
    geometry = new THREE.SphereGeometry(.15, 40, 40);

    venus = new THREE.Mesh(geometry, venMaterial);
    venGroup.add(venus);
    venus.position.y = 10.7;
    scene.add(venGroup);

    // Earth orbit
    geometry = new THREE.RingGeometry(13.1, 13.15, 100);
    const ringEarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const earthRing = new THREE.Mesh(geometry, ringEarMaterial);
    scene.add(earthRing);

    // Earth groups
    earGroup = new THREE.Object3D;
    earMGroup = new THREE.Object3D;
    earGroup.add(earMGroup);

    // Earth
    const earthTextureUrl = './imgs/earthmap1k.jpg';
    const earthBumpUrl = './imgs/earthmap1k.jpg';
    const earthNormalUrl = './imgs/8k_earth_normal_map.png'
    const earthTexture = new THREE.TextureLoader().load(earthTextureUrl);
    const earthBump = new THREE.TextureLoader().load(earthBumpUrl);
    const earthNormal = new THREE.TextureLoader().load(earthNormalUrl);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture, bumpMap: earthBump, bumpScale: 0.2, normalMap: earthNormal});
    geometry = new THREE.SphereGeometry(.15, 40, 40);

    earth = new THREE.Mesh(geometry, earthMaterial);
    earth.position.y -= 13.1
    earth.rotation.x += Math.PI / 2;
    earGroup.add(earth);
    scene.add(earGroup);

    // Moon
    const moonTextureUrl = './imgs/moonmap1k.jpg';
    const moonBumpUrl = './imgs/moonmap1k.jpg';
    const moonTexture = new THREE.TextureLoader().load(moonTextureUrl);
    const moonBump = new THREE.TextureLoader().load(moonBumpUrl);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture, bumpMap: moonBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(.02, 40, 40);

    moon = new THREE.Mesh(geometry, moonMaterial);
    earMGroup.add(moon);
    earMGroup.position.set(0, -13.1, 0)
    moon.position.y = 0.2;
    moon.position.x = 0.2;
    moon.position.z = 0.1;

    // Mars orbit
    geometry = new THREE.RingGeometry(15.6, 15.65, 100);
    const ringMarsMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const marsRing = new THREE.Mesh(geometry, ringMarsMaterial);
    scene.add(marsRing);

    // Mars groups
    marGroup = new THREE.Object3D;
    marMGroup = new THREE.Object3D;
    marGroup.add(marMGroup);

    // Mars
    const marsTextureUrl = './imgs/mars_1k_color.jpg';
    const marsBumpUrl = './imgs/marsbump1k.jpg';
    const marsNormalUrl = './imgs/mars_1k_normal.jpg';
    const marsTexture = new THREE.TextureLoader().load(marsTextureUrl);
    const marsBump = new THREE.TextureLoader().load(marsBumpUrl);
    const marsNormal = new THREE.TextureLoader().load(marsNormalUrl);
    const marsMaterial = new THREE.MeshPhongMaterial({ map: marsTexture, bumpMap: marsBump, bumpScale: 0.2, normalMap: marsNormal});
    geometry = new THREE.SphereGeometry(.13, 40, 40);

    mars = new THREE.Mesh(geometry, marsMaterial);
    mars.position.y -= 15.6;
    mars.rotation.x += Math.PI / 2;
    marGroup.add(mars);
    scene.add(marGroup);

    // Phobos
    const phobosTextureUrl = './imgs/phobosbump.jpg';
    const phobosBumpUrl = './imgs/phobosbump.jpg';
    const phobosTexture = new THREE.TextureLoader().load(phobosTextureUrl);
    const phobosBump = new THREE.TextureLoader().load(phobosBumpUrl);
    const phobosMaterial = new THREE.MeshPhongMaterial({ map: phobosTexture, bumpMap: phobosBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(.02, 40, 40);

    phobos = new THREE.Mesh(geometry, phobosMaterial);
    marMGroup.add(phobos);
    marMGroup.position.set(0, -15.6, 0)
    phobos.position.y = 0.15;
    phobos.position.x = 0.15;
    phobos.position.z = 0.08;

    // Deimos
    const deimosTextureUrl = './imgs/deimosbump.jpg';
    const deimosBumpUrl = './imgs/deimosbump.jpg';
    const deimosTexture = new THREE.TextureLoader().load(deimosTextureUrl);
    const deimosBump = new THREE.TextureLoader().load(deimosBumpUrl);
    const deimosMaterial = new THREE.MeshPhongMaterial({ map: deimosTexture, bumpMap: deimosBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(.02, 40, 40);

    deimos = new THREE.Mesh(geometry, deimosMaterial);
    marMGroup.add(deimos);
    deimos.position.y = -0.15;
    deimos.position.x = -0.15;
    deimos.position.z = 0.08;

    // Asteroid orbit
    geometry = new THREE.RingGeometry(18.1, 18.15, 100);
    const ringAsMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const AsRing = new THREE.Mesh(geometry, ringAsMaterial);
    scene.add(AsRing);

    // Asteroid field
    asGroup = new THREE.Object3D;
    loadObjMtl(objMtlModelUrl, objectList);
    scene.add(asGroup);

    // Jupiter orbit
    geometry = new THREE.RingGeometry(23.1, 23.15, 100);
    const ringJupiterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const jupiterRing = new THREE.Mesh(geometry, ringJupiterMaterial);
    scene.add(jupiterRing);

    // Jupiter groups
    jupGroup = new THREE.Object3D;
    jupMGroup = new THREE.Object3D;
    jupGroup.add(jupMGroup);

    // Jupiter
    const jupiterTextureUrl = './imgs/jupitermap.jpg';
    const jupiterTexture = new THREE.TextureLoader().load(jupiterTextureUrl);
    const jupiterMaterial = new THREE.MeshPhongMaterial({ map: jupiterTexture });
    geometry = new THREE.SphereGeometry(2.5, 40, 40);

    jupiter = new THREE.Mesh(geometry, jupiterMaterial);
    jupiter.position.y -= 23.1;
    jupiter.rotation.x += Math.PI / 2;
    jupGroup.add(jupiter);
    scene.add(jupGroup);

    // Jupiter Moons (53 confirmadas)
    const jupiterMTextureUrl = './imgs/phobosbump.jpg';
    const jupiterMBumpUrl = './imgs/phobosbump.jpg';
    const jupiterMTexture = new THREE.TextureLoader().load(jupiterMTextureUrl);
    const jupiterMBump = new THREE.TextureLoader().load(jupiterMBumpUrl);
    const jupiterMMaterial = new THREE.MeshPhongMaterial({ map: jupiterMTexture, bumpMap: jupiterMBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(0.02, 40, 40);

    jupMGroup.position.set(0, -23.1, 0);
    for (var i = 0; i < 53; i++) {
        jupMoon = new THREE.Mesh(geometry, jupiterMMaterial);
        jupMGroup.add(jupMoon);
        jupMoons.push(jupMoon);
        var s = Math.acos(2*Math.random()-1)-Math.PI/2;
        var t = 2*Math.PI*Math.random();
        jupMoon.position.z = 3.5 * Math.cos(s) * Math.sin(t);
        jupMoon.position.x = 3.5 * Math.sin(s) * Math.sin(t);
        jupMoon.position.y = 3.5 * Math.cos(t);
    }

    // Saturn orbit
    geometry = new THREE.RingGeometry(32.1, 32.15, 100);
    const ringSaturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const SaturnRing = new THREE.Mesh(geometry, ringSaturnMaterial);
    scene.add(SaturnRing);

    // Saturn groups
    satGroup = new THREE.Object3D;
    satMGroup = new THREE.Object3D;
    satRGroup = new THREE.Object3D;
    satGroup.add(satMGroup);
    satGroup.add(satRGroup);

    // Saturn
    const saturnTextureUrl = './imgs/saturnmap.jpg';
    const saturnTexture = new THREE.TextureLoader().load(saturnTextureUrl);
    const saturnMaterial = new THREE.MeshPhongMaterial({ map: saturnTexture });
    geometry = new THREE.SphereGeometry(1.5, 40, 40);

    saturn = new THREE.Mesh(geometry, saturnMaterial);
    saturn.position.y -= 32.1;
    saturn.rotation.x += Math.PI / 2;
    satGroup.add(saturn);
    scene.add(satGroup);

    // Saturn ring
    satMGroup.position.set(0, -32.1, 0);
    geometry = new THREE.RingBufferGeometry(3, 4.5, 64);
    var pos = geometry.attributes.position;
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
    }
    const saturnRTextureUrl = './imgs/saturnringcolor.jpg';
    const saturnRTexture = new THREE.TextureLoader().load(saturnRTextureUrl);
    const saturnRMaterial = new THREE.MeshLambertMaterial({ map: saturnRTexture });
    const saturnRRing = new THREE.Mesh(geometry, saturnRMaterial);
    saturnRRing.material.side = THREE.DoubleSide;
    saturnRRing.rotation.x -= 0.5;
    satRGroup.add(saturnRRing);
    satRGroup.position.set(0, -32.1, 0);

    // Saturn Moons (53 confirmadas)
    const saturnMTextureUrl = './imgs/phobosbump.jpg';
    const saturnMBumpUrl = './imgs/phobosbump.jpg';
    const saturnMTexture = new THREE.TextureLoader().load(saturnMTextureUrl);
    const saturnMBump = new THREE.TextureLoader().load(saturnMBumpUrl);
    const saturnMMaterial = new THREE.MeshPhongMaterial({ map: saturnMTexture, bumpMap: saturnMBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(0.02, 40, 40);

    for (var i = 0; i < 53; i++) {
        satMoon = new THREE.Mesh(geometry, saturnMMaterial);
        satMGroup.add(satMoon);
        satMoons.push(satMoon);
        var s = Math.acos(2*Math.random()-1)-Math.PI/2;
        var t = 2*Math.PI*Math.random();
        satMoon.position.z = 2 * Math.cos(s) * Math.sin(t);
        satMoon.position.x = 2 * Math.sin(s) * Math.sin(t);
        satMoon.position.y = 2 * Math.cos(t);
    }

    // Uranus orbit
    geometry = new THREE.RingGeometry(37.1, 37.15, 100);
    const ringUranusMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const UranusRing = new THREE.Mesh(geometry, ringUranusMaterial);
    scene.add(UranusRing);

    // Uranus groups
    uraGroup = new THREE.Object3D;
    uraMGroup = new THREE.Object3D;
    uraGroup.add(uraMGroup);
    
    // Uranus
    const uranusTextureUrl = './imgs/uranusmap.jpg';
    const uranusTexture = new THREE.TextureLoader().load(uranusTextureUrl);
    const uranusMaterial = new THREE.MeshPhongMaterial({ map: uranusTexture });
    geometry = new THREE.SphereGeometry(.8, 40, 40);

    uranus = new THREE.Mesh(geometry, uranusMaterial);
    uranus.position.y -= 37.1;
    uranus.rotation.x += Math.PI / 2;
    uraGroup.add(uranus);
    scene.add(uraGroup);

    // Uranus Moons (27 confirmadas)
    const uranusMTextureUrl = './imgs/phobosbump.jpg';
    const uranusMBumpUrl = './imgs/phobosbump.jpg';
    const uranusMTexture = new THREE.TextureLoader().load(uranusMTextureUrl);
    const uranusMBump = new THREE.TextureLoader().load(uranusMBumpUrl);
    const uranusMMaterial = new THREE.MeshPhongMaterial({ map: uranusMTexture, bumpMap: uranusMBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(0.02, 40, 40);

    uraMGroup.position.set(0, -37.1, 0);
    for (var i = 0; i < 27; i++) {
        uraMoon = new THREE.Mesh(geometry, uranusMMaterial);
        uraMGroup.add(uraMoon);
        uraMoons.push(uraMoon);
        var s = Math.acos(2*Math.random()-1)-Math.PI/2;
        var t = 2*Math.PI*Math.random();
        uraMoon.position.z = 1.3 * Math.cos(s) * Math.sin(t);
        uraMoon.position.x = 1.3 * Math.sin(s) * Math.sin(t);
        uraMoon.position.y = 1.3 * Math.cos(t);
    }

    // Neptune orbit
    geometry = new THREE.RingGeometry(41.1, 41.15, 100);
    const ringNeptuneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const NeptuneRing = new THREE.Mesh(geometry, ringNeptuneMaterial);
    scene.add(NeptuneRing);

    // Neptune groups
    nepGroup = new THREE.Object3D;
    nepMGroup = new THREE.Object3D;
    nepGroup.add(nepMGroup);

    // Neptune
    const neptuneTextureUrl = './imgs/neptunemap.jpg';
    const neptuneTexture = new THREE.TextureLoader().load(neptuneTextureUrl);
    const neptuneMaterial = new THREE.MeshPhongMaterial({ map: neptuneTexture });
    geometry = new THREE.SphereGeometry(.6, 40, 40);

    neptune = new THREE.Mesh(geometry, neptuneMaterial);
    neptune.position.y -= 41.1;
    neptune.rotation.x += Math.PI / 2;
    nepGroup.add(neptune);
    scene.add(nepGroup);

    // Neptune Moons (14 confirmadas)
    const neptuneMTextureUrl = './imgs/phobosbump.jpg';
    const neptuneMBumpUrl = './imgs/phobosbump.jpg';
    const neptuneMTexture = new THREE.TextureLoader().load(neptuneMTextureUrl);
    const neptuneMBump = new THREE.TextureLoader().load(neptuneMBumpUrl);
    const neptuneMMaterial = new THREE.MeshPhongMaterial({ map: neptuneMTexture, bumpMap: neptuneMBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(0.02, 40, 40);

    nepMGroup.position.set(0, -41.1, 0);
    for (var i = 0; i < 14; i++) {
        nepMoon = new THREE.Mesh(geometry, neptuneMMaterial);
        nepMGroup.add(nepMoon);
        nepMoons.push(nepMoon);
        var s = Math.acos(2*Math.random()-1)-Math.PI/2;
        var t = 2*Math.PI*Math.random();
        nepMoon.position.z = 0.9 * Math.cos(s) * Math.sin(t);
        nepMoon.position.x = 0.9 * Math.sin(s) * Math.sin(t);
        nepMoon.position.y = 0.9 * Math.cos(t);
    }

    // Pluto orbit
    geometry = new THREE.RingGeometry(45.1, 45.15, 100);
    const ringPlutoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const PlutoRing = new THREE.Mesh(geometry, ringPlutoMaterial);
    scene.add(PlutoRing);

    // Pluto groups
    pluGroup = new THREE.Object3D;
    pluMGroup = new THREE.Object3D;
    pluGroup.add(pluMGroup);

    // Pluto
    const plutoTextureUrl = './imgs/plutomap1k.jpg';
    const plutoBumpUrl = './imgs/plutobump1k.jpg';
    const plutoTexture = new THREE.TextureLoader().load(plutoTextureUrl);
    const plutoBump = new THREE.TextureLoader().load(plutoBumpUrl);
    const plutoMaterial = new THREE.MeshPhongMaterial({ map: plutoTexture, bumpMap: plutoBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(.2, 40, 40);

    pluto = new THREE.Mesh(geometry, plutoMaterial);
    pluto.position.y -= 45.1;
    pluto.rotation.x += Math.PI / 2;
    pluGroup.add(pluto);
    scene.add(pluGroup);

    // Pluto Moons (5 confirmadas)
    const plutoMTextureUrl = './imgs/phobosbump.jpg';
    const plutoMBumpUrl = './imgs/phobosbump.jpg';
    const plutoMTexture = new THREE.TextureLoader().load(plutoMTextureUrl);
    const plutoMBump = new THREE.TextureLoader().load(plutoMBumpUrl);
    const plutoMMaterial = new THREE.MeshPhongMaterial({ map: plutoMTexture, bumpMap: plutoMBump, bumpScale: 0.2 });
    geometry = new THREE.SphereGeometry(0.02, 40, 40);

    pluMGroup.position.set(0, -45.1, 0);
    for (var i = 0; i < 5; i++) {
        pluMoon = new THREE.Mesh(geometry, plutoMMaterial);
        pluMGroup.add(pluMoon);
        pluMoons.push(pluMoon);
        var s = Math.acos(2*Math.random()-1)-Math.PI/2;
        var t = 2*Math.PI*Math.random();
        pluMoon.position.z = 0.4 * Math.cos(s) * Math.sin(t);
        pluMoon.position.x = 0.4 * Math.sin(s) * Math.sin(t);
        pluMoon.position.y = 0.4 * Math.cos(t);
    }
}

async function loadObjMtl(objModelUrl, objectList) {
    try {
        const mtlLoader = new MTLLoader();

        const materials = await mtlLoader.loadAsync(objModelUrl.mtl, onProgress, onError);

        materials.preload();

        const objLoader = new OBJLoader();

        objLoader.setMaterials(materials);

        for (var i = 0; i < 500; i++) {
            const object = await objLoader.loadAsync(objModelUrl.obj, onProgress, onError);

            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            object.rotation.x += Math.random() * Math.PI * 2;
            object.rotation.y += Math.random() * Math.PI * 2;
            object.rotation.z += Math.random() * Math.PI * 2;
            object.position.y -= 18 * Math.cos(i) + Math.random() * 2 - 1;
            object.position.x -= 18 * Math.sin(i) + Math.random() * 2 - 1;
            object.position.z = Math.random() * 2 - 1;
            object.scale.set(0.00015, 0.00015, 0.00015);

            objectList.push(object);
            asGroup.add(object);
        }
    }
    catch (err) {
        onError(err);
    }
}

function onError(err) { console.error(err); };

function onProgress(xhr) {
    if (xhr.lengthComputable) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(xhr.target.responseURL, Math.round(percentComplete, 2) + '% downloaded');
    }
}

function main() {
    let canvas = document.getElementById("webglcanvas");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    // create the scene
    createScene(canvas);

    // update the update loop
    update();
}

main();