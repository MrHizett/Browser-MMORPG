import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
const loader = new GLTFLoader();
const keysDown = {};
const timer = new THREE.Timer();

let character;

camera.position.set(0, 2.5, 6);
camera.lookAt(0,1,0);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(light);

window.addEventListener('keydown', (e) => keysDown[e.key.toLowerCase()] = true);
window.addEventListener('keyup', (e) => keysDown[e.key.toLowerCase()] = false);
window.addEventListener('keydown', (e) => console.log('Key:',e.key));

//Temp scene setup

scene.add(new THREE.GridHelper(200,40));

loader.load('assets/Characters/Superhero_Male_FullBody.gltf', (gltf) =>{
    character = gltf.scene
    scene.add(character);
    console.log('animations:', gltf.animations);
}, undefined, (error) => console.log(error));

function animate(){
    requestAnimationFrame(animate);
    timer.update();
    const delta = timer.getDelta();
    if(character){
        const speed = 50;
        if(keysDown['w']) character.position.z -= speed * delta;
        if(keysDown['s']) character.position.z += speed * delta;
        if(keysDown['a']) character.position.x -= speed * delta;
        if(keysDown['d']) character.position.x += speed * delta;

        camera.position.set(character.position.x, character.position.y + 2.5, character.position.z + 6);
        camera.lookAt(character.position);
    }
    renderer.render(scene, camera);
}

animate();