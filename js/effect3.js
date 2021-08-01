var width = window.innerWidth;
var height = window.innerHeight;

var scene, camera, renderer, cubes1;

function init3() {
	var geometry, material;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(12, width / height, 1, 1000);
	// 开启背景通道
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	cubes1 = new Array();

	renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
	renderer.setSize(width, height);

	document.body.appendChild(renderer.domElement);

	var n = 100;

	var cWidth = width / 30;
	var dist = (cWidth - 2) / n * 1.3;
	var startPos = (n - 1) * dist / 2;
	for(var i = 0; i < n; i++) {
		var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
		var material = new THREE.MeshPhongMaterial({
				color: randomFairColor(),
				ambient: 0x808080,
				specular: 0xffffff
		});

		cubes1[i] = new THREE.Mesh(geometry, material);
		cubes1[i].position.setX((-1 * startPos) + (i*dist));
		cubes1[i].rotation.x = 0.5;
		cubes1[i].rotation.y = 0.5;
		scene.add(cubes1[i]);
	}


	camera.position.z = 150;

	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100, 200, 100);
	scene.add(light);

	render3();
	renderer.setSize( width, height );

	window.addEventListener('resize', onWindowResize, false);
}

function render3() {
	if(typeof array === 'object' && array.length > 0) {
		var step = Math.round(array.length / 100);

		for (var i = 0; i < 100; i++) {
				var value = array[i * step] / 4;
				value = value < 1 ? 1 : value;
				cubes1[i].scale.z = value;
		}
	}
	requestAnimationFrame(render3);
	renderer.render(scene, camera);
}
