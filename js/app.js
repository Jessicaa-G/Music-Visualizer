
window.onload = function() {
	init();

	loading_screen.style.display = "none";
}

// 监听展开菜单点击事件
open_menu.onclick = function() {
	openMenu();
}

// 监听关闭菜单点击事件
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