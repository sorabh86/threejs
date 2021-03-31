var scene, camera, renderer, control;
var car_model_path = '../../assets/models/car/car.glb';

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDDDDDD);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
	// camera.rotation.y = 45/180*Math.PI;
	camera.position.x = 8;
	camera.position.y = 1;
	camera.position.z = 5;


	var hlight = new THREE.AmbientLight(0x404040, 100);
	scene.add(hlight);

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	control = new THREE.OrbitControls(camera, renderer.domElement);
	control.update();

	// var geometry = new THREE.BoxGeometry(1, 1, 1);
	// var texture = new THREE.TextureLoader().load('car-model/textures/alloy_metallicRoughness.png');
	// var material = new THREE.MeshBasicMaterial({
	// 	// color:0xff0000
	// 	map:texture
	// });
	// var cube = new THREE.Mesh(geometry, material);
	// scene.add(cube);

	const dl1 = new THREE.DirectionalLight( 0xffffff, 10 );
	scene.add( dl1 );
	dl1.position.set(1,4,1);
	const dl2 = new THREE.DirectionalLight( 0xffffff, 1 );
	scene.add( dl2 );
	dl2.position.set(1,3,5);
	const dl3 = new THREE.DirectionalLight( 0xffffff, 5 );
	scene.add( dl3 );
	dl3.position.set(1,3,5);
	const dl4 = new THREE.DirectionalLight( 0xffffff, 1 );
	dl4.position.y = 3;
	scene.add( dl4 );

	document.getElementById('scene').appendChild(renderer.domElement);

	var loader = new THREE.GLTFLoader();
	loader.load(car_model_path, function(gltf) {
		var car = gltf.scene.children[0];
		car.scale.set(2,2,2);
		// gltf.scene.children.forEach( function(element, index) {
		// 	ele
		// });
		console.log(gltf.scene.children);

		scene.add(gltf.scene);
		renderer.render(scene, camera);
	});

	animate();
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

init();