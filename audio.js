var file;
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
var fileName;
var playing = false;

audio_file.onchange = function() {
	if (playing){
		stop();
		reset();
	}

	var reader = new FileReader();
	file = this.files[0];

	if (!file) return;

	context = new (window.AudioContext || window.webkitAudioContext)();

	reader.onload = function() {
		context.decodeAudioData(reader.result, function(buffer) {
			duration = buffer.duration;
			prepare(buffer);
		});
	};

	reader.readAsArrayBuffer(file);
};

pause_playback.onclick = function() {
	if (playing) {
		stop();
	}
}

stop_playback.onclick = function() {
	if (playing) {
		stop();
		reset();
	}
};

play_playback.onclick = function() {
	if (!playing && source)
		play(source.buffer);
}

function updateAll(buffer) {
	file_name.innerHTML = `
		${file.name}
		<hr color="white" align="center" size="1px" width="10%" noshade>
	`;

	play(buffer);
}

function play(buffer) {
	s = context.createBufferSource(buffer);
	s.buffer = buffer;
	s.loop = false;

	s.start(0, totalPlayTime);
	startTime = context.currentTime;
	playing = true;
	
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
	if (!playing || totalPlayTime + curPlayTime > duration) {
		// stop();
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

	offlineContext.oncomplete = function(e) {
		process(e);
	};

	updateAll(buffer);
}

function process(e) {
	var filteredBuffer = e.renderedBuffer;
	//If you want to analyze both channels, use the other channel later
	var data = filteredBuffer.getChannelData(0);
	var max = arrayMax(data);
	var min = arrayMin(data);

	var threshold = min + (max - min) * 0.5;
	var peaks = getPeaksAtThreshold(data, threshold);
	var intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
	var tempoCounts = groupNeighborsByTempo(intervalCounts);
	
	tempoCounts.sort(function(a, b) {
		return b.count - a.count;
	});
	
	if (tempoCounts.length) {
		output.innerHTML = tempoCounts[0].tempo;
	}
}

// http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/
function getPeaksAtThreshold(data, threshold) {
	var peaksArray = [];
	var length = data.length;
	
	for (var i = 0; i < length;) {
		if (data[i] > threshold) {
			peaksArray.push(i);
			// Skip forward ~ 1/4s to get past this peak.
			i += 10000;
		}
		
		i++;
	
	}

	return peaksArray;
}

function countIntervalsBetweenNearbyPeaks(peaks) {
	var intervalCounts = [];
	
	peaks.forEach(function(peak, index) {
		for (var i = 0; i < 10; i++) {
			var interval = peaks[index + i] - peak;
			var foundInterval = intervalCounts.some(function(intervalCount) {
			
			if (intervalCount.interval === interval)
				return intervalCount.count++;
			});

			//Additional checks to avoid infinite loops in later processing
			if (!isNaN(interval) && interval !== 0 && !foundInterval) {
				intervalCounts.push({
					interval: interval,
					count: 1
				});
			}
		}
	});
	
	return intervalCounts;
}

function groupNeighborsByTempo(intervalCounts) {
	var tempoCounts = [];
	
	intervalCounts.forEach(function(intervalCount) {
		//Convert an interval to tempo
		var theoreticalTempo = 60 / (intervalCount.interval / 44100);
		theoreticalTempo = Math.round(theoreticalTempo);
		
		if (theoreticalTempo === 0) {
			return;
		}
		
		// Adjust the tempo to fit within the 90-180 BPM range
		while (theoreticalTempo < 90) theoreticalTempo *= 2;
		while (theoreticalTempo > 180) theoreticalTempo /= 2;

		var foundTempo = tempoCounts.some(function(tempoCount) {
			if (tempoCount.tempo === theoreticalTempo)
				return tempoCount.count += intervalCount.count;
		});

		if (!foundTempo) {
			tempoCounts.push({
				tempo: theoreticalTempo,
				count: intervalCount.count
			});
		}
	});

	return tempoCounts;
}

function arrayMin(arr) {
	var len = arr.length,
		min = Infinity;

	while (len--) {
		if (arr[len] < min) {
			min = arr[len];
	}
  }
  return min;
}

function arrayMax(arr) {
	var len = arr.length,
		max = -Infinity;
	
	while (len--) {
		if (arr[len] > max) {
			max = arr[len];
		}
	}

	return max;
}