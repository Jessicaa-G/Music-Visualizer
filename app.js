var text = "LOADING...";
var e = document.getElementById('loading_screen').children[0];
var count = 0;
var ready = false;

window.onload = function() {
	init();

	loading_screen.style.display = "none";
}

var open = false;
open_menu.onclick = function() {
	openMenu();
}

close_menu.onclick = function() {
	closeMenu();
}

function openMenu() {
	menu_container.style.right = 0;
	open_menu.style.opacity = 0;
}

function closeMenu() {
	menu_container.style.right = '-' + menu_container.clientWidth + 'px';
	open_menu.style.opacity = 1;
}