var text = "LOADING...";
var e = document.getElementById('loading_screen').children[0];
var count = 0;
var ready = false;

window.onload = function() {
	// init();
	// ready = true;
	// console.log("ready");
	// setTimeout(function() {loading_screen.style.display = "none"}, 5000)
	loading_screen.style.display = "none";
}

var open = false;
menu_btn.onclick = function() {
	if (!open) openMenu();
}

// var document.getElementById('menu_container');
function openMenu() {
	menu_container.style.right = 0;
	menu_btn.style.opacity = 0;
}