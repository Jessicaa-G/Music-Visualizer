var cur_effect = 1;
var e1 = document.getElementById('e1');
var e2 = document.getElementById('e2');
var e3 = document.getElementById('e3');
var e4 = document.getElementById('e4');

effect1.onclick = function() {
	if(cur_effect != 1){
		updateColor();
		e1.style.backgroundColor = "floralwhite";
		document.body.removeChild(renderer.domElement);
		init();
		cur_effect = 1;
		
	}
}

effect2.onclick = function() {
	if(cur_effect != 2){
		updateColor();
		e2.style.backgroundColor = "floralwhite";
		document.body.removeChild(renderer.domElement);
		init2();
		cur_effect = 2;
	}
}

effect3.onclick = function() {
	if(cur_effect != 3){
		updateColor();
		e3.style.backgroundColor = "floralwhite";
		document.body.removeChild(renderer.domElement);
		init3();
		cur_effect = 3;
	}
}

effect4.onclick = function() {
	if(cur_effect != 4){
		updateColor();
		e4.style.backgroundColor = "floralwhite";
		document.body.removeChild(renderer.domElement);
		init4();
		cur_effect = 4;
	}
}

function updateColor() {
	e1.style.backgroundColor = 'transparent';
	e2.style.backgroundColor = 'transparent';
	e3.style.backgroundColor = 'transparent';
	e4.style.backgroundColor = 'transparent';
}