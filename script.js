const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const edgeGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, -0.5, -0.5),
    new THREE.Vector3(-0.5, 0.5, -0.5)
]);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);
cube.add(edge);

// Создание геометрии и материала для точки
const pointGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.5, 0.5, 0.5)
]);
const pointMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.1 });
const point = new THREE.Points(pointGeometry, pointMaterial);
cube.add(point);

camera.position.z = 5;

cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 4;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();
