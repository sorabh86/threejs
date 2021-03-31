# Basic Scene
- Make Three.js work the simplest possible way
- No bundle, no modules, no depedencies
- A JavaScript and a HTML file

## Base Files
- Create a plain `index.html` file
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Scene</title>
</head>
<body>
    <script src="./script.js"></script>
</body>
</html>
```
- Create a simple `script.js` file
```js
    console.log('Hello World');
```

## Load Three.js
- Go to [three.js](https://threejs.org)
- Click on the download button
- Unzip (My current is r122)
- copy /build/three.min.js and include using `script` tag.

## First Scene
- Scene that holds objects
- Objects add to Scene
- One Camera
- One Renderer

### Scene
- It is like a container.
- We put objects, models, lights, etc. in it.
- At some point we asked Three.js to render that scene.
```js
const scene = new THREE.Scene();
```

### Objects
- It can be many things
- Primitive geometries
- Imported models
- Particles
- Lights, etc.

### 1. Geometry
[BoxGeometry](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry) 
```js
// @param (x-size, y-size, z-size)
const geometry = new THREE.BoxGeometry(1,1,1);
```

### 2. Material
[MeshBasicMaterial](https://threejs.org/docs/?q=mesh#api/en/materials/MeshBasicMaterial), [Color](https://threejs.org/docs/?q=color#api/en/math/Color)
```js
// color 0xff0000, '#ff0000', 'red'
const material = new THREE.MeshBasicMaterial({color:0xff0000});
```
### 3. Mesh
We need to create a [Mesh](https://threejs.org/docs/#api/en/objects/Mesh) Combination of a geometry (the shape) and a material.   
```js
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```
### 4. Camera
- It will not visible
- It serve as point of view, when doing render.
- You can have multiple camera's in single scene only one can be active at a time of render.
- There are many type of camera ([PerspectiveCamera](https://threejs.org/docs/?q=camera#api/en/cameras/PerspectiveCamera), [OrthographicCamera](https://threejs.org/docs/?q=camera#api/en/cameras/OrthographicCamera), etc)
```js
// @ arguments
// 1. The Field of view : fov : in degrees : Vertical vision angle : 75
// 2. The Aspect Ratio : width/height : 
const camera = new THREE.PerspectiveCamera(75, width/height);
scene.add(camera);
```

### 5. Renderer
- Render the scene from the view of camera.
- Three.js uses canvas to draw stuff.
- WebGL can be used to draw on canvas, not supported by all web browsers. Three.js use WebGL.
- There are may types of Renderer, we are using [WebGLRenderer](https://threejs.org/docs/?q=renderer#api/en/renderers/WebGLRenderer)
```html
<canvas class="webgl"></canvas>
<script>
    const canvas = document.querySelector('canvas.webgl');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    // update size of renderer
    renderer.setSize(width, height);

    // render your scene
    renderer.render(scene, camera);
</script>
```

### 6. Transform Objects
we can use following properties:
- position  : x, y, z ...ex : obj.position.x = 2;
- rotation  : x, y, z ...ex : obj.rotation.y = 20;
- scale     : x, y, z ...ex : obj.scale.z = 2;



