var width = window.innerWidth;
var height = window.innerHeight;

var scene, camera, renderer, cubes;

function init2() {
	var geometry, material;
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(10, width / height, 1, 1000);
	// 开启背景通道
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	cubes = new Array();

	renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
	renderer.setSize(width, height);

	document.body.appendChild(renderer.domElement);

	var i = 0;
	for (var x = -10; x < 10; x += 2) {
		var j = 0;
		cubes[i] = new Array();
		for (var y = -10; y < 10; y += 2) {
			var geometry = new THREE.CubeGeometry(.25, .25, .25);
			var material = new THREE.MeshPhongMaterial({
				color: randomFairColor(),
				specular: 0xffffff,
				shininess: 10,
				reflectivity: 1.5
			});
			cubes[i][j] = new THREE.Mesh(geometry, material);

			cubes[i][j].position.x = x / 4 - 0.7;
			cubes[i][j].position.y = y / 4 - 1.7;
			cubes[i][j].position.z = 20;
			scene.add(cubes[i][j])
			j++;
		}
		i++;
	}

	//Need to test all that to see what it does.
	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);


	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(0, -1, -1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
	directionalLight.position.set(-1, -1, 0);
	scene.add(directionalLight);

	camera.position.z = 70;
	camera.position.x = -1
	camera.position.y = -2

	render2();
	renderer.setSize(width, height);

	window.addEventListener('resize', onWindowResize, false);
}

function render2() {
	if (typeof array === 'object' && array.length > 0) {
		var k = 0;
		for (var i = 0; i < cubes.length; i++) {
			for (var j = 0; j < cubes[i].length; j++) {
				var scale = (array[k] + boost) / 20; 
				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				k += (k < array.length ? 1 : 0);
			}
		}
	}
	requestAnimationFrame(render2);
	// controls.update();
	renderer.render(scene, camera);
}

function randomFairColor() {
	var Rmin = 0;
	var Rmax = 30;
	var Gmin = 200;
	var Gmax = 250;
	var Bmin = 150;
	var Bmax = 250;
	var r = (Math.floor(Math.random() * (Rmax - Rmin + 1)) + Rmin) * 65536;
	var g = (Math.floor(Math.random() * (Gmax - Gmin + 1)) + Gmin) * 256;
	var b = (Math.floor(Math.random() * (Bmax - Bmin + 1)) + Bmin);
	return r + g + b;
}

