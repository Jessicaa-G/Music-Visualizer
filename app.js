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


// var loading = (function () {
// 	var index = 0;
// 	while (!ready) {
// 		console.log(index);

// 		setTimeout(function(){
// 			console.log(index);
// 			e.innerHTML += text[count];
// 			count++;
// 		}, 500);

// 		if (count >= text.length) count = 0;
// 	}
// })();
