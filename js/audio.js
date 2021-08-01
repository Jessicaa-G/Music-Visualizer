var file; //待播放文件
var source;
var context;
var s;
var array = new Array();
var boost;
var analyser;

var startTime;
var curPlayTime = 0;
var totalPlayTime = 0;
var duration;

var playing = false; //播放状态
var isDone = true; 

var dropContainer = document.getElementById('audio_file');;
//上传id是audio_file
audio_file.onchange = function() {
	file = this.files[0];
	addPlaylist(file); //加入播放列表

	if ((curIndex  == pLength - 2 && isDone))
		nextSong();
};
//拖进
dropContainer.addEventListener("dragenter", function() {
	file = e.dataTransfer.files;
	addPlaylist(file); //加入播放列表
}, false);
//拖后放开
dropContainer.addEventListener("dragleave", function() {
	if ((curIndex  == pLength - 2 && isDone))
		nextSong();
}, false);

//点击暂停事件
pause_playback.onclick = function() {
	if (playing) {
		stop();
	}
}

//点击播放事件
play_playback.onclick = function() {
	if (!playing && source)
		play(source.buffer);
}

//点击下一曲事件
skip_playback.onclick = function() {
	if (curIndex < pLength - 1) {
		reset();
		nextSong();
	}
}

//点击上一曲
back_playback.onclick = function() {
	if (totalPlayTime + curPlayTime > 2 || curIndex == 0) {
		timeBarWidth(0);
		totalPlayTime = 0;
		curPlayTime = 0;

		if(playing) {
			stop();
			play(source.buffer);
		}
	} else {
		reset();
		prevSong();
	}
}

function read(f) {
	if (!f) return;

	var reader = new FileReader();

	context = new (window.AudioContext || window.webkitAudioContext)();
	reader.onload = function() {
		context.decodeAudioData(reader.result, function(buffer) {
			duration = buffer.duration;
			prepare(buffer);
		});
	};

	reader.readAsArrayBuffer(f);
}

//播放事件
function play(buffer) {
	s = context.createBufferSource(buffer);
	s.buffer = buffer;
	s.loop = false;

	s.start(0, totalPlayTime);
	startTime = context.currentTime;
	playing = true;
	isDone = false;

	var sourceJs = context.createScriptProcessor(2048);
	sourceJs.buffer = buffer;
	sourceJs.connect(context.destination);

	analyser = context.createAnalyser();
	analyser.smoothingTimeConstant = 0.6;
	analyser.fftSize = 512;

	s.connect(analyser);
	analyser.connect(sourceJs);
	s.connect(context.destination);

	sourceJs.onaudioprocess = function(e) {
		array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(array);
		boost = 0;

		for (var i = 0; i < array.length; i++) {
			boost += array[i];
		}

		boost = boost / array.length;

		updateTime();
	};
	console.log("finished");
}

function updateTime() {
	if (!playing)
		return;

	if (totalPlayTime + curPlayTime >= duration) {
		reset();
		nextSong();
		playing = false;
		isDone = true;
		return;
	}

	curPlayTime = context.currentTime - startTime;

	var w = (totalPlayTime + curPlayTime) / duration * 100;

	timeBarWidth(w);
}

function stop() {
	s.disconnect();
	s.stop(1);
	s = null;
	playing = false;

	totalPlayTime += curPlayTime;
	curPlayTime = 0;
}

function reset() {
	stop();

	audio_file.value = '';

	file_name.innerHTML = "";
	timeBarWidth(0);

	totalPlayTime = 0;
	curPlayTime = 0;

	source.disconnect();
	source.stop(1);
	source = null;
}

function timeBarWidth(w) {
	var e = document.getElementById("inner-time");
	e.style.width = w + "%";
}

function prepare(buffer) {
	var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
	source = offlineContext.createBufferSource();

	source.buffer = buffer;

	var filter = offlineContext.createBiquadFilter();

	filter.type = "lowpass";
	source.connect(filter);
	filter.connect(offlineContext.destination);
	source.start(0);

	offlineContext.startRendering();

	play(buffer);
}
