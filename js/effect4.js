var width = window.innerWidth;
var height = window.innerHeight;

var scene, camera, renderer, cubes2;

function init4() {
	var geometry, material;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(10, width / height, 1, 1000);
	// 开启背景通道
	renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true } );

	cubes2 = new Array();

	renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
	renderer.setSize(width, height);

	document.body.appendChild(renderer.domElement);

	var n = 100;
	var R = 7.5;
	
	var cWidth = width / 30;
	var dist = (cWidth - 2) / n;
	var startPos = (n - 1) * dist / 2;
	for(var i = 0; i < n; i++) {
		geometry = new THREE.CubeGeometry(0.1, 0.1, 0.1);
		
		material = new THREE.MeshBasicMaterial({
			color:0xffffff, 
			wireframe:true
		});

		cubes2[i] = new THREE.Mesh(geometry, material);
		cubes2[i].position.setX(R * Math.cos(2*Math.PI/n * i));
		cubes2[i].position.setY(R * Math.sin(2*Math.PI/n * i));
		cubes2[i].rotation.z = 0.5;
		scene.add(cubes2[i]);
	}

	camera.position.z = 150;
	render4();
	renderer.setSize( width, height );

	window.addEventListener('resize', onWindowResize, false);
}

function render4() {
	if(typeof array === 'object' && array.length > 0) {
		var k = 0;
		for(var i = 0; i < cubes2.length; i++) {
			var scale = Math.pow(array[k] + boost, 1.55) / 50;

			cubes2[i].scale.z = (scale < 1 ? 1 : scale);
			k += (k < array.length ? 1 : 0);
		}
	}
	requestAnimationFrame(render4);
	renderer.render(scene, camera);
}
