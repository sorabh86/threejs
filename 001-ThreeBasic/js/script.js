import * as THREE from "../../node_modules/three/build/three.module.js";
import {OrbitControls} from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import {TRI} from "./trigonometry.js";

class World {
    constructor() {
        this._Initialize();
    }

    _Initialize () {
        this._renderer = new THREE.WebGLRenderer({antialias:true});
        this._renderer.shadowMap.enabled = true;
        // this._renderer.shadowMap.type = THREE.BasicShadowMap;
        // this._renderer.shadowMap.type = THREE.PCFShadowMap; (default)
        // this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this._renderer.shadowMap.type = THREE.VSMShadowMap;
        // this._renderer.toneMappingExposure = 0.5;
        // this._renderer.toneMapping = THREE.LinearToneMapping;
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);

        this._camera = new THREE.PerspectiveCamera(60, 
            window.innerWidth/window.innerHeight, 1, 1000);
        this._camera.position.set(0, 20, 40);
        this._camera.lookAt(0, 0, 0);
            
        this._scene = new THREE.Scene();
        this._AddLights();
        this._CreateSkybox();
        this._AddOrbitControl();
        this._AddMeshObjects();



        this._RAF()
    }

    _AddOrbitControl() {
        const controls = new OrbitControls(this._camera, this._renderer.domElement);
    }

    _CreateSkybox () {
        const loader = new THREE.CubeTextureLoader(); THREE.TextureLo
        const texture = loader.load([
            './res/skybox/Citadella2/posx.jpg',
            './res/skybox/Citadella2/negx.jpg',
            './res/skybox/Citadella2/posy.jpg',
            './res/skybox/Citadella2/negy.jpg',
            './res/skybox/Citadella2/posz.jpg',
            './res/skybox/Citadella2/negz.jpg',
        ]);
        this._scene.background = texture;
    }

    _AddMeshObjects() {
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100),
            new THREE.MeshStandardMaterial({color:0xEEEEEE})
        );
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI/2;
        this._scene.add(plane);
        
        const box = new THREE.Mesh(
            new THREE.CubeGeometry(4,4,4),
            new THREE.MeshStandardMaterial({color:0xCCCCCC})
        );
        box.position.set(0, 2, 0);
        box.castShadow = true;
        box.receiveShadow = true;
        // box.material.wireframe = true;
        this._scene.add(box);
    

        for (let x = -8; x < 8; x++) {
            for (let y = -8; y < 8; y++) {
              const box = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({
                    color: 0x808080,
                }));
              box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
              box.castShadow = true;
              box.receiveShadow = true;
              this._scene.add(box);
            }
          }
    }

    _AddLights() {
        const sun = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        sun.position.set(10, 30, 20);
        // sun.target.position.set(0, 0, 0);
        sun.type
        sun.castShadow = true;
        sun.shadow.bias = -0.001;
        sun.shadow.mapSize.width = 1000;
        sun.shadow.mapSize.height = 1000;
        sun.shadow.camera.near = 0.1;
        sun.shadow.camera.far = 500;
        sun.shadow.camera.left = sun.shadow.camera.top =  50;
        sun.shadow.camera.right = sun.shadow.camera.bottom = -50;
        this._scene.add(sun);

        const light = new THREE.AmbientLight(0xCCCCCC, 0.5);
        // light.position.set(-10,10,10)
        this._scene.add(light);
    }

    /** // this._rotateAround(new THREE.Vector3(0,0,0), 60);
     * call from request animationframe
     */
    angle = 0;
    _rotateAround(origin3, radius) {
        const rad_angle = TRI.degree2radian(this.angle);
        const x = Math.cos(rad_angle) * radius;
        const z = Math.sin(rad_angle) * radius;
        this._camera.position.x = x;
        this._camera.position.z = z;
        this._camera.lookAt(origin3);
        this.angle+= 1;
        if(this.angle >= 360) this.angle = 0;
        console.log(this._camera.rotation.y, TRI.radian2degree(this._camera.rotation.y));
    }

    _RAF() {
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(this._RAF.bind(this));
    }
}

const world = new World();