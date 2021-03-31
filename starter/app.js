"use strict";

import * as THREE from '../three.js-master-r122/build/three.module.js';

export default class Sorabh86 {
	constructor() {
		this.time = 0;
		this.camera = new THREE.PerspectiveCamera( 
			70, window.innerWidth / window.innerHeight, 0.01, 10 );
		this.camera.position.z = 1;

		this.scene = new THREE.Scene();
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.addMesh();

		document.getElementById('sorabh86')
			.appendChild(this.renderer.domElement);

		this.draw();
	}

	addMesh() {
		let geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
		let material = new THREE.MeshNormalMaterial();

		let mesh = new THREE.Mesh( geometry, material );
		this.camera.lookAt(0,0,0);
		this.scene.add( mesh );
	}

	draw() {
		this.time++;
		if(this.time == 360) this.time=0;

		let angle = (this.time * Math.PI/180);
		console.log(this.time, angle);

		this.camera.position.x = Math.cos(angle);
		this.camera.position.y = Math.sin(angle);
		this.camera.position.z = Math.sin(angle) * 1;
		this.camera.lookAt(0,0);

		this.renderer.render( this.scene, this.camera );
		window.requestAnimationFrame(this.draw.bind(this));
	}
}

window.sos = new Sorabh86();

