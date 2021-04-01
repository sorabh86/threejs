"use strict";

import * as THREE from '../../three.js-master-r122/build/three.module.js';
import { OrbitControls } from '../../three.js-master-r122/examples/jsm/controls/OrbitControls.js';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';


export default class Sorabh86 {
	constructor() {
		this.time = 0;
		this.radiusX = 150;
		this.radiusZ = 150;
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 
			45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.z = this.radiusZ;
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.addMesh();

		document.getElementById('sorabh86')
			.appendChild(this.renderer.domElement);
		
		this.control = new OrbitControls(this.camera, this.renderer.domElement);
		this.draw();
	}

	addMesh() {
		let geometry = new THREE.PlaneBufferGeometry( 100,100,100,100 );

		// let geometry = new THREE.BufferGeometry();
		let vertex_count = 512*512; //2,62,144

		
		let shaderMaterial = new THREE.ShaderMaterial({
			fragmentShader:fragment,
			vertexShader:vertex,
			uniforms: {
				progress: {type: "f", value: 0}
			},
			side:THREE.DoubleSide
		})

		this.mesh = new THREE.Points( geometry, shaderMaterial );

		this.scene.add( this.mesh );
	}

	draw() {
		this.control.update();
		this.renderer.render( this.scene, this.camera );
		window.requestAnimationFrame(this.draw.bind(this));
	}

	camera_update(time) {
		if(time == 360) time=0;

		let angle = (time * Math.PI/180);
		
		this.camera.position.x = Math.sin(angle) * this.radiusX;
		this.camera.position.y = 0.5;
		this.camera.position.z = Math.cos(angle) * this.radiusZ;
		this.camera.lookAt(0,0);
	}
}

window.sos = new Sorabh86();


