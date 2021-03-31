init();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color:0x0f00f0});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);