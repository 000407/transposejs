(function(window){
	function Transposer(){
		var _this = this;

		const chordRoots =  ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];

		var currentOffset = 0;

		_this.transpose = function(offset, selector = "span.chord") {
			if(offset === 0) {
				offset = currentOffset * -1;
				currentOffset = 0;
			}
			else {
				currentOffset = (currentOffset + offset) % 12;
			}
			
			for(var c of document.querySelectorAll(selector)) {
				c.innerHTML = _this.transposeChord(c.innerHTML, offset);
			}
		};

		_this.transposeChord = function(chord, offset) {
			if(offset < 0) {
				offset = 12 + offset;
			}

			var modifier = '';

			if (m = chord.match(/dim([\d]{1})?$/)) {
				modifier = m[0];
			}
			else if (m = chord.match(/m$/)) {
				modifier = m[0];
			}
			else if (m = chord.match(/maj7$/)) {
				modifier = m[0];
			}
			else if (m = chord.match(/7$/)) {
				modifier = m[0];
			}
			else if (m = chord.match(/aug([\d]{1})?$/)) {
				modifier = m[0];
			}
			else if (m = chord.match(/sus([\d]{1})?$/)) {
				modifier = m[0];
			}

			var [chordRoot, replaced] = _this.normalizeChord(chord.replace(modifier, ''));

			var srcIndex = chordRoots.indexOf(chordRoot);

			if (srcIndex >= 0) {
				var tgtIndex = (srcIndex + offset) % 12;
				return chordRoots[tgtIndex] + modifier;
			}

			console.error("Invalid chord:", chord);
		};

		_this.normalizeChord = function(chord) {
			const replacements = {
				'A#': 'Bb',
				'Db': 'C#',
				'D#': 'Eb',
				'Gb': 'F#',
				'G#': 'Ab'
			};

			var replacement = replacements[chord];
			return replacement ? [replacement, true] : [chord, false];
		}

		return _this;
	}

	if(typeof(window.transposer) === 'undefined'){
		window.transposer = Transposer();
	}
})(window);
