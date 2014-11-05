/**
 * number system about decimal, binary, hex
 */
define(function (require, exports) {

	var NUMBER_TO_HEX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

	var HEX_TO_BINARY = [
		'0000', // 0
		'0001', // 1
		'0010', // 2
		'0011', // 3
		'0100', // 4
		'0101', // 5
		'0110', // 6
		'0111', // 7
		'1000', // 8
		'1001', // 9
		'1010', // a
		'1011', // b
		'1100', // c
		'1101', // d
		'1110', // e
		'1111'  // f
	]

	var CODE_0 = '0'.charCodeAt(0) // 48
	var CODE_a = 'a'.charCodeAt(0) // 97

	exports.hexToBinary = function (hex) {
		var str = ''
		for (var i = 0; i < hex.length; i++) {
			var code = hex.charCodeAt(i)
			var number = code >= CODE_a ? code - CODE_a + 10 : code - CODE_0
			str += HEX_TO_BINARY[number]
		}
		return str
	}

	exports.hexToDecimal = function (hex) {
		throw 'cannot implement'
	}


	exports.decimalToBinary = function (decimal) {
		throw 'cannot implement'
	}


	exports.hexToNumber = function (hex) {
		var tot = 0
		var weight = 1
		for (var i = hex.length - 1; i >= 0; i--) {
			var code = hex.charCodeAt(i)
			var number = code >= CODE_a ? code - CODE_a + 10 : code - CODE_0
			tot += number * weight
			weight *= 16
		}
		return tot
	}

	exports.binaryToNumber = function (binary) {
		var tot = 0
		var weight = 1
		for (var i = binary.length - 1; i >= 0; i--) {
			if (binary[i] == '1') {
				tot += weight
			}
			weight *= 2
		}
		return tot
	}

	exports.numberToHex = function (number) {
		var hex = ''
		while (true) {
			hex = NUMBER_TO_HEX[number % 16] + hex
			if ((number = Math.floor(number / 16)) == 0) {
				break
			}
		}

		return hex
	}

	exports.numberToBinary = function (number) {
		var bin = ''
		while (true) {
			if (number % 2 == 0) {
				bin = '0' + bin
				number = number / 2
			} else {
				bin = '1' + bin
				number = (number - 1) / 2
			}

			if (number == 0) {
				break
			}
		}
		return bin
	}


	if (QUnit) {
		QUnit.module('bhd')

		QUnit.test('hexToBinary', function (assert) {
			assert.equal(exports.hexToBinary('abc123'), '101010111100000100100011')
		})

		QUnit.test('hexToNumber', function (assert) {
			assert.equal(exports.hexToNumber('f'), 15)
			assert.equal(exports.hexToNumber('abc123'), 11256099)
		})

		QUnit.test('binaryToNumber', function (assert) {
			assert.equal(exports.binaryToNumber('110110110'), 438)
		})

		QUnit.test('numberToHex', function (assert) {
			assert.equal(exports.numberToHex(123456), '1e240')
		})

		QUnit.test('numberToBinary', function (assert) {
			assert.equal(exports.numberToBinary(1234), '10011010010')
		})


	}
})