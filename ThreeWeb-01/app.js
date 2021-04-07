'use strict';
import * as THREE from '../node_modules/three/build/three.module.js';


let scene = new THREE.Scene();
THREE.Mesh(THREE.BoxGeometry)









let speed = 0;
let position = 0;
const block = document.querySelector('#block');
const elems = [...document.querySelectorAll('.flexbox div')];
let objs = Array(5).fill({dist:0});

window.addEventListener('wheel', (e)=>{
	speed += e.deltaY*0.003;
});

function animate() {
	position += speed;
	speed *= 0.8;

	objs.forEach((o,i) => {
		o.dist = Math.min(Math.abs(position - i),1);
		o.dist = 1 - o.dist ** 2;
		elems[i].style.transform = `scaleX(${1+0.4*o.dist})`;
	});


	let diff = (Math.round(position) - position);

	position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015;

	block.style.transform = `translate(0, ${Math.round(position*100)}px)`;

	requestAnimationFrame(animate);
}
animate();
