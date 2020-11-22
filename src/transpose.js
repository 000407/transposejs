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
		if(config.transpose) {
			this.transpose = config.transpose;
		}
	}

	transpose(offset, selector = "span.chord") {
		if(offset === 0) {
			offset = this.currentOffset * -1;
			this.currentOffset = 0;
		}
		else {
			this.currentOffset = (this.currentOffset + offset) % 12;
		}
		
		for(let c of document.querySelectorAll(selector)) {
			c.innerHTML = this.transposeChord(c.innerHTML, offset);
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
