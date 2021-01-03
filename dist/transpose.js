(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 857:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/transpose.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transposer = /*#__PURE__*/function () {
  _createClass(Transposer, null, [{
    key: "CHORD_ROOTS",
    get: function get() {
      return ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];
    }
  }, {
    key: "REPLACEMENTS",
    get: function get() {
      return {
        'A#': 'Bb',
        'Db': 'C#',
        'D#': 'Eb',
        'Gb': 'F#',
        'G#': 'Ab'
      };
    }
  }]);

  function Transposer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Transposer);

    this.currentOffset = 0;
    this.selector = "span.chords";
    this.init(config);
  }

  _createClass(Transposer, [{
    key: "init",
    value: function init() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof config.render === 'function') {
        this.renderTransposition = config.render;
      }

      if (typeof config.selector === 'string') {
        this.selector = config.selector;
      }
    }
  }, {
    key: "renderTransposition",
    value: function renderTransposition(offset) {
      var _iterator = _createForOfIteratorHelper(document.querySelectorAll(this.selector)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          c.innerHTML = this.transposeChord(c.innerHTML, offset);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "transpose",
    value: function transpose(offset) {
      if (offset === 0) {
        // reset existing transpose
        offset = this.currentOffset * -1;
        this.currentOffset = 0;
      } else {
        this.currentOffset = (this.currentOffset + offset) % 12;
      }

      this.renderTransposition(offset);
    }
  }, {
    key: "transposeChord",
    value: function transposeChord(chord, offset) {
      if (offset < 0) {
        offset = 12 + offset;
      }

      var modifier = '';

      if (chord.match(/dim([\d]{1})?$/)) {
        modifier = chord.match(/dim([\d]{1})?$/);
      } else if (chord.match(/m$/)) {
        modifier = chord.match(/m$/);
      } else if (chord.match(/maj7$/)) {
        modifier = chord.match(/maj7$/);
      } else if (chord.match(/7$/)) {
        modifier = chord.match(/7$/);
      } else if (chord.match(/aug([\d]{1})?$/)) {
        modifier = chord.match(/aug([\d]{1})?$/);
      } else if (chord.match(/sus([\d]{1})?$/)) {
        modifier = chord.match(/sus([\d]{1})?$/);
      }

      var _this$normalizeChord = this.normalizeChord(chord.replace(modifier, '')),
          _this$normalizeChord2 = _slicedToArray(_this$normalizeChord, 2),
          chordRoot = _this$normalizeChord2[0],
          replaced = _this$normalizeChord2[1];

      var srcIndex = Transposer.CHORD_ROOTS.indexOf(chordRoot);

      if (srcIndex >= 0) {
        var tgtIndex = (srcIndex + offset) % 12;
        return Transposer.CHORD_ROOTS[tgtIndex] + modifier;
      }

      console.error("Invalid chord:", chord);
    }
  }, {
    key: "normalizeChord",
    value: function normalizeChord(chord) {
      var replacement = Transposer.REPLACEMENTS[chord];
      return replacement ? [replacement, true] : [chord, false];
    }
  }]);

  return Transposer;
}();


;// CONCATENATED MODULE: ./src/index.js


(function (window) {
  window.Transposer = new Transposer();
})(window);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(857);
/******/ })()
;
});