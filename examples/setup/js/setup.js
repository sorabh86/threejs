var scene, camera, renderer;

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		75, // angle for view 
		window.innerWidth/window.innerHeight, // ratio 
		0.1, // near clipping start 
		1000 // far clip ends
	);

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
}