export default class Transposer {
	static get CHORD_ROOTS() { 
		return ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];
	}

	static get REPLACEMENTS() {
		return {
			'A#': 'Bb',
			'Db': 'C#',
			'D#': 'Eb',
			'Gb': 'F#',
			'G#': 'Ab'
		}
	}

	constructor() {
		this.currentOffset = 0;
	}

	init(config = {}) {
		if('transpose' in conf && conf.transpose instanceof Function) {
			this.transpose = config.transpose;
		}
		else {
			this.transpose = (offset, selector = "span.chord") => {
				if(offset === 0) { // reset existing transpose
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
		}
	}

	transposeChord(chord, offset) {
		if(offset < 0) {
			offset = 12 + offset;
		}

		let modifier = '';

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

		let [chordRoot, replaced] = this.normalizeChord(chord.replace(modifier, ''));

		let srcIndex = Transposer.CHORD_ROOTS.indexOf(chordRoot);

		if (srcIndex >= 0) {
			let tgtIndex = (srcIndex + offset) % 12;
			return Transposer.CHORD_ROOTS[tgtIndex] + modifier;
		}

		console.error("Invalid chord:", chord);
	}

	normalizeChord(chord) {
		let replacement = Transposer.REPLACEMENTS[chord];
		return replacement ? [replacement, true] : [chord, false];
	}
}
