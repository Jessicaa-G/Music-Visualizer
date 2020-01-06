var width = window.innerWidth;
var height = window.innerHeight;

var scene, camera, renderer, cubes;

function init() {
	var geometry, material;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(10, width / height, 1, 1000);
	renderer = new THREE.WebGLRenderer();

	cubes = new Array();

	renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
	renderer.setSize(width, height);

	document.body.appendChild(renderer.domElement);

	var n = 100;

	var cWidth = width / 30;
	var dist = (cWidth - 2) / n;
	var startPos = (n - 1) * dist / 2;
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
		cubes[i].position.setX((-1 * startPos) + (i*dist));
		cubes[i].rotation.x = 0.5;
		cubes[i].rotation.y = 0.5;
		scene.add(cubes[i]);
	}

	material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5 } );
	geometry = new THREE.Geometry();

	geometry.vertices.push(new THREE.Vector3( -(cWidth / 2 - 0.5), 0, 0) );
	geometry.vertices.push(new THREE.Vector3( cWidth / 2 - 0.5, 0, 0) );

	var line = new THREE.Line( geometry, material );

	scene.add( line );

	camera.position.z = 150;

	render();
	renderer.setSize( width, height );

	window.addEventListener('resize', onWindowResize, false);
}

function render() {
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
}

function onWindowResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

