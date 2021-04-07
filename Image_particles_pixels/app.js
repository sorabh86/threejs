"use strict";

import * as THREE from '../../three.js-master-r122/build/three.module.js';
import { OrbitControls } from '../../three.js-master-r122/examples/jsm/controls/OrbitControls.js';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import mario from './images/mario.png';
import duckmario from './images/duckmario.png';
import mask from './images/mask.jpg';


export default class Sorabh86 {
	constructor() {
		this.time = 0;
		this.scene = new THREE.Scene();

		this.textures = [
			new THREE.TextureLoader().load(mario),
			new THREE.TextureLoader().load(duckmario)
		];
		this.mask = new THREE.TextureLoader().load(mask);

		this.camera = new THREE.PerspectiveCamera( 
			45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.z = 800;
		this.camera.lookAt(0,0,0);
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.addMesh();

		document.getElementById('sorabh86')
			.appendChild(this.renderer.domElement);
		
		// this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.move = 10;
		
		this.mouseEffect();
		this.draw();
	}

	mouseEffect() {
		window.addEventListener('wheel', (e) => {
			console.log('wheel', e.wheelDeltaY);
			this.move += e.wheelDeltaY/1000;
		});
	}

	addMesh() {
		let geometry = new THREE.BufferGeometry();
		// geometry = new THREE.PlaneBufferGeometry(2,2);
		let vertex_count = 512; //2,62,144
		let positions = new THREE.BufferAttribute(new Float32Array((vertex_count*vertex_count)*3), 3);
		let coordinates = new THREE.BufferAttribute(new Float32Array((vertex_count*vertex_count)*3), 3);
		let speeds = new THREE.BufferAttribute(new Float32Array((vertex_count*vertex_count)), 1);
		let offset = new THREE.BufferAttribute(new Float32Array((vertex_count*vertex_count)), 1);
		// console.log(positions);

		const rand = (a,b) => a + (b-a) * Math.random();
		let index = 0;
		for (let i = 0; i < vertex_count; i++) {
			let posX = i - (vertex_count/2);
			for (let j = 0; j < vertex_count; j++) {
				let posY = j - (vertex_count/2);
				positions.setXYZ(index, posX, posY, 0);
				coordinates.setXYZ(index,i,j,0);
				offset.setX(index, rand(-1000, 1000));
				speeds.setX(index, rand(0.4, 1));
				index++;
			}
		}
		// console.log(offset, speeds);
		geometry.setAttribute('position', positions);
		geometry.setAttribute('aCoordinates', coordinates);
		geometry.setAttribute('aOffset', offset);
		geometry.setAttribute('aSpeed', speeds);

		this.material = new THREE.ShaderMaterial({
			fragmentShader:fragment,
			vertexShader:vertex,
			uniforms: {
				progress: {type: "f", value: 0},
				mario: {type: "t", value: this.textures[0]},
				duckmario: {type: "t", value: this.textures[1]},
				mask: {type: "t", value: this.mask},
				move: {type: "f", value: 0},
				time: {type: "f", value: 0},
			},
			side:THREE.DoubleSide,
			transparent: true,
			depthTest: false,
			depthWrite:false,

		});
		const material = new THREE.MeshBasicMaterial({color:0xff0000});

		this.mesh = new THREE.Points( 
			geometry,
			// material,
			this.material 
		);

		this.scene.add( this.mesh );
	}

	draw() {
		this.time++;
		// this.mesh.rotation.x += 0.01;
		// this.mesh.rotation.y += 0.02;
		this.material.uniforms.time.value = this.time;
		this.material.uniforms.move.value = this.move;
	
		// this.controls.update();
		this.renderer.render( this.scene, this.camera );
		window.requestAnimationFrame(this.draw.bind(this));
	}

	camera_update(time) {
		if(this.time == 360) this.time=0;

		let angle = (this.time * Math.PI/180);
		
		this.camera.position.x = Math.sin(angle) * 1000;
		this.camera.position.y = 0.5;
		this.camera.position.z = Math.cos(angle) * 1000;
		this.camera.lookAt(0,0);
	}
}

window.sos = new Sorabh86();


