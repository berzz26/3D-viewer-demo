// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000); // Adjust for window size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(600, 400); // Set the size to match the container
document.getElementById('viewer').appendChild(renderer.domElement);

// Load the GLTF model
const loader = new THREE.GLTFLoader();
loader.load('models/holybasil.glb', function (gltf) {
  scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

// Add lights
const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.AmbientLight(0x404040);
scene.add(light2);

// Set up orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 2);  // Adjusted closer zoom level
controls.update();


// Handle window resize (optional in this case, because the window size is fixed)
window.addEventListener('resize', () => {
  const aspect = 600 / 400;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(600, 400);
});

// Light control sliders
document.getElementById('lightX').addEventListener('input', (event) => {
  light1.position.x = event.target.value;
});
document.getElementById('lightY').addEventListener('input', (event) => {
  light1.position.y = event.target.value;
});
document.getElementById('lightZ').addEventListener('input', (event) => {
  light1.position.z = event.target.value;
});

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
