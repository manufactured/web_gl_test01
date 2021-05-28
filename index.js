import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(35, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({
const material = new THREE.MeshStandardMaterial({
  // color: 0xff6347,
  color: 0x154360,
  // normalMap: normalTexture,
  opacity: 0.8,
  transparent: true,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 20, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(60, 5, 5);
scene.add(pointLight, ambientLight);
// scene.add(pointLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.006;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.002;

  controls.update();

  renderer.render(scene, camera);
}

// Avatar

const RMTexture = new THREE.TextureLoader().load('./images/RM.png');

const RM = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: RMTexture })
);

scene.add(RM);

// Mars/moon
// const marsTexture = new THREE.TextureLoader().load('./images/mars_1k_color.jpg');
const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');

// const mars = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: marsTexture,
//     normalMap: normalTexture,
//   })
// );

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

// scene.add(mars);
scene.add(moon);

// mars.position.z = 30;
// mars.position.setX(-10);
moon.position.z = 9;
moon.position.setX(-9);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // mars.rotation.x += 0.005;
  // mars.rotation.y += 0.045;
  // mars.rotation.z += 0.005;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.045;
  moon.rotation.z += 0.0;

  RM.rotation.y += 0.01;
  RM.rotation.z += 0.01;
  RM.opacity -= 5;

  camera.position.z = t * -0.03;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

animate();
