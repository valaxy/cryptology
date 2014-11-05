define(function (require, exports) {

	var bhd = require('../alg/bhd')

	function normalizeHex(hex) {
		var pad = ''
		for (var i = 0; i < 4 - hex.length; i++) {
			pad += '0'
		}
		return pad + hex
	}

	exports.encodeToHex = function (str) {
		var hex = ''
		for (var i = 0; i < str.length; i++) {
			hex += normalizeHex(bhd.numberToHex(str.charCodeAt(i)))
		}
		return hex
	}

	exports.decodeFromHex = function (hex) {
		var s = ''
		for (var i = 0; i < hex.length / 4; i++) {
			var code = bhd.hexToNumber(hex.slice(i * 4, i * 4 + 4))
			var ch = String.fromCharCode(code)
			s += ch
		}
		return s
	}


	if (QUnit) {
		QUnit.module('unicode')

		QUnit.test('normalizeHex', function (assert) {
			assert.equal(normalizeHex('d'), '000d')
		})

		QUnit.test('encodeToHex', function (assert) {
			assert.equal(exports.encodeToHex('w挖'), '00776316')
		})

		QUnit.test('decodeFromHex', function (assert) {
			assert.equal(exports.decodeFromHex('00776316'), 'w挖')
		})
	}


})