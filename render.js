var width = window.innerWidth;
var height = window.innerHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(10, width / height, 1, 1000);
var renderer = new THREE.WebGLRenderer();
var cubes = new Array();
var geometry, material;

renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
console.log("why");
var n = 125;
for(var i = 0; i < n; i++) {
	geometry = new THREE.CubeGeometry(0.1, 0.1, 0.1);
	
	material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true
		// color: 0xffffff,
		// ambient: 0x808080,
		// specular: 0xffffff,
		// shininess: 20,
		// reflectivity: 5.5
	});

	cubes[i] = new THREE.Mesh(geometry, material);
	cubes[i].position.setX(0.37*(-n / 2 + i));
	cubes[i].rotation.x = 0.5;
	cubes[i].rotation.y = 0.5;
	scene.add(cubes[i]);
}

material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5 } );
geometry = new THREE.Geometry();

geometry.vertices.push(new THREE.Vector3( -24, 0, 0) );
geometry.vertices.push(new THREE.Vector3( 23.5, 0, 0) );

var line = new THREE.Line( geometry, material );

scene.add( line );

camera.position.z = 150;

var render = function () {
	if(typeof array === 'object' && array.length > 0) {
		var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			var scale = Math.pow(array[k] + boost, 1.55) / 50;

			cubes[i].scale.y = (scale < 1 ? 1 : scale);
			k += (k < array.length ? 1 : 0);
		}
	}
	requestAnimationFrame(render);
	// controls.update();
	renderer.render(scene, camera);
};

render();
renderer.setSize( width, height );

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

