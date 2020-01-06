var playlist = new Array();
var pLength = playlist.length;
var curIndex = -1;
var container = document.getElementById('playlist');

function addPlaylist(source) {
	playlist[pLength++] = source;
	updatePlaylist();
}

function updatePlaylist() {
	var string = '';

	for (var i = 0; i < pLength; i++) {
		string += '<p class="title';

		(curIndex == i) ? string += ' current">' : string += '">';

		string += `${playlist[i].name} </p>`;
	}

	container.innerHTML = string;
}

function nextSong() {
	console.log(curIndex);

	if (curIndex + 1 < pLength) {
		curIndex++;
		read(playlist[curIndex]);
		updatePlaylist();
		
		file_name.innerHTML = `
			${playlist[curIndex].name}
			<hr color="white" align="center" size="1px" width="10%" noshade>
		`;
	}
}

function prevSong() {
	console.log(curIndex);

	if (curIndex - 1 >= 0) {
		curIndex--;
		read(playlist[curIndex]);
		updatePlaylist();
		
		file_name.innerHTML = `
			${playlist[curIndex].name}
			<hr color="white" align="center" size="1px" width="10%" noshade>
		`;
	}
}