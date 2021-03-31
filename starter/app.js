"use strict";

import * as THREE from '../three.js-master-r122/build/three.module.js';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';


export default class Sorabh86 {
	constructor() {
		this.time = 0;
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 
			45, window.innerWidth / window.innerHeight, 0.01, 100 );
		// this.camera.position.z = 1;
		this.chelper = new THREE.CameraHelper(this.camera);
		// this.scene.add(this.chelper);

		this.camera2 = new THREE.PerspectiveCamera(
			45, window.innerWidth/window.innerHeight,
			0.01, 100);
		this.camera2.position.z = 10;

		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.addMesh();

		document.getElementById('sorabh86')
			.appendChild(this.renderer.domElement);

		this.draw();
	}

	addMesh() {
		let geometry = new THREE.PlaneBufferGeometry( 1,1 );
		let material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});

		let shaderMaterial = new THREE.ShaderMaterial({
			fragmentShader:fragment,
			vertexShader:vertex,
			uniforms: {
				progress: {type: "f", value: 0}
			},
			side:THREE.DoubleSide
		})

		let mesh = new THREE.Mesh( geometry, material );
		let smesh = new THREE.Points( geometry, shaderMaterial );

		this.scene.add( mesh );
		this.scene.add( smesh );
	}

	draw() {
		this.time++;
		if(this.time == 360) this.time=0;

		let angle = (this.time * Math.PI/180);
		const radiusX = 2;
		const radiusZ = 2;

		this.camera.position.x = Math.cos(angle) * radiusX;
		this.camera.position.y = 0.5;
		this.camera.position.z = Math.sin(angle) * radiusZ;
		this.camera.lookAt(0,0);

		this.renderer.render( this.scene, this.camera );
		window.requestAnimationFrame(this.draw.bind(this));
	}
}

window.sos = new Sorabh86();

