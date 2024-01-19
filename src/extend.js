import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js';

import {
  OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import {
  GLTFLoader
} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import {
  RGBELoader
} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/RGBELoader.js';

import mitt from 'mitt';

var container, stats, controls;
var camera, scene, renderer;

var raycaster, mouse;
var rect = {width:400, height:300};

init();
render();

function init() {

  container = document.getElementById('three');
  
  // document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.25, 20);
  camera.position.set(-1.8, 0.9, 2.7);

  scene = new THREE.Scene();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2()

  new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .setPath('https://threejs.org/examples/textures/equirectangular/')
    .load('royal_esplanade_1k.hdr', function(texture) {

      var envMap = pmremGenerator.fromEquirectangular(texture).texture;

      scene.background = envMap;
      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();

      // model

      var loader = new GLTFLoader().setPath('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/');
      loader.load('DamagedHelmet.gltf', function(gltf) {

        gltf.scene.traverse(function(child) {

          if (child.isMesh) {

            child.material.envMap = envMap;

          }

        });

        scene.add(gltf.scene);
        
        render();

      });

    });

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(rect.width, rect.height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  var pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener('resize', onWindowResize, false);

  renderer.domElement.addEventListener('click', onClick, false);

}

function onClick(event) {
  event.preventDefault();

  mouse.x = (event.offsetX / rect.width) * 2 - 1;
  mouse.y = -(event.offsetY / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObject(scene, true);

  if (intersects.length > 0) {
	
		var object = intersects[0].object;

    object.material.color.set( Math.random() * 0xffffff );
    window.EventBus_.emit('TOPIC2', {mouseX: mouse.x, mouseY: mouse.y});

  }
	
	render();

}

function onWindowResize() {

  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();

  renderer.setSize(rect.width, rect.height);
  
  render();

}


function render() {

  renderer.render(scene, camera);

}


(
  window.EventBus_ = mitt(),
  window.testForCustomer = function greet(greeting, name, surname) {
    console.log(this);
    console.log(`${greeting}, ${name}, ${surname}!`);
  }
)
(
  window.EventBus_.on('TOPIC', (e)=>{
    console.log('extend.js ');
  })
)