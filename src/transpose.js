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

	constructor(config = {}) {
		this.currentOffset = 0;
		this.selector = "span.chords";

		this.init(config);
	}

	init(config = {}) {
		if(typeof config.render === 'function') {
			this.renderTransposition = config.render;
		}

		if(typeof config.selector === 'string') {
			this.selector = config.selector;
		}
	}

	renderTransposition(offset) {
		for(var c of document.querySelectorAll(this.selector)) {
			c.innerHTML = this.transposeChord(c.innerHTML, offset);
		}
	}

	transpose(offset) {
		if(offset === 0) { // reset existing transpose
			offset = this.currentOffset * -1;
			this.currentOffset = 0;
		}
		else {
			this.currentOffset = (this.currentOffset + offset) % 12;
		}

		this.renderTransposition(offset);
	}

	transposeChord(chord, offset) {
		if(offset < 0) {
			offset = 12 + offset;
		}

		let modifier = '';

		if (chord.match(/dim([\d]{1})?$/)) {
			modifier = chord.match(/dim([\d]{1})?$/);
		}
		else if (chord.match(/m$/)) {
			modifier = chord.match(/m$/);
		}
		else if (chord.match(/maj7$/)) {
			modifier = chord.match(/maj7$/);
		}
		else if (chord.match(/7$/)) {
			modifier = chord.match(/7$/);
		}
		else if (chord.match(/aug([\d]{1})?$/)) {
			modifier = chord.match(/aug([\d]{1})?$/);
		}
		else if (chord.match(/sus([\d]{1})?$/)) {
			modifier = chord.match(/sus([\d]{1})?$/);
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
