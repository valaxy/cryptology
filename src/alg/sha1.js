define(function (require) {
	var bhd = require('./bhd')
	var unicode = require('../basic/unicode')

	require('../basic/uint32')

	var TWO_32 = 4294967296

	function cycleLeftMove(number, n) {
		return ((number << n) | (number >>> (32 - n))) >>> 0
	}

	function repeat(str, count) {
		var s = ''
		for (var i = 0; i < count; i++) {
			s += str
		}
		return s
	}

	function fillBitsToArray(value, array, offset) {
		for (var i = 0; i < value.length; i++) {
			array[offset + i] = value[i] == 1 ? 1 : 0
		}
	}

	function zeroPadSize(binary) {
		var k = 512 - 64 - 1 - binary.length % 512
		if (k >= 0) {
			return k
		} else {
			return 512 + k
		}
	}


	function createArray(size, value) {
		var a = [ ]
		for (var i = 0; i < size; i++) {
			a.push(value)
		}
		return a
	}


	var K = [
		0x5a827999,
		0x6ed9eba1,
		0x8f1bbcdc,
		0xca62c1d6
	]

	var F = [
		function (b, c, d) {
			return ((b & c) | (~b & d)) >>> 0
		},
		function (b, c, d) {
			return (b ^ c ^ d) >>> 0
		},
		function (b, c, d) {
			return ((b & c) | (b & d) | (c & d)) >>> 0
		},
		function (b, c, d) {
			return (b ^ c ^ d) >>> 0
		}
	]

	function calculateW(segment) {
		var w = []
		for (var i = 0; i < 16; i++) {
			w.push(bhd.binaryToNumber(segment.slice(i * 32, i * 32 + 16)))
		}
		for (var i = 16; i < 80; i++) {
			var next = (w[i - 16] ^ w[i - 14] ^ w[i - 8] ^ w[i - 3]).rotateLeft(1)
			w.push(next)
		}

		return w
	}

	function depack(pack) {
		var s = ''
		for (var i = 0; i < pack.length; i++) {
			s += bhd.numberToHex(pack[i])
		}
		return s
	}

	function calculate(segment, a, b, c, d, e) {
		var w = calculateW(segment)

		var olda = a
		var oldb = b
		var oldc = c
		var oldd = d
		var olde = e

		for (var i = 0; i < 80; i++) {
			var turn = Math.floor(i / 20)
			var k = K[turn]
			var f = F[turn]

			var a2 = 0xffffffff & (e + f(b, c, d) + cycleLeftMove(a, 5) + w[i] + k)
			var b2 = a
			var c2 = cycleLeftMove(b, 30)
			var d2 = c
			var e2 = d

			a = a2
			b = b2
			c = c2
			d = d2
			e = e2
		}

		a = a.add(olda)
		b = b.add(oldb)
		c = c.add(oldc)
		d = d.add(oldd)
		e = e.add(olde)

		return [a, b, c, d, e]
	}


	function pad(binary) {
		var k = zeroPadSize(binary)
		var bitArray = createArray(binary.length + 1 + k + 64, 0)
		var lenBinary = bhd.numberToBinary(binary.length)

		fillBitsToArray(binary, bitArray, 0) // 填充数组
		bitArray[binary.length] = 1
		fillBitsToArray(lenBinary, bitArray, binary.length + 1 + k + 64 - lenBinary.length)

		return bitArray.join('')
	}

	function divide(binary, exec) {
		var pack = [
			0x67452301, // a
			0xefcdab89, // b
			0x98badcfe, // c
			0x10325476, // d
			0xc3d2e1f0  // e
		]

		for (var stage = 0; stage < binary.length / 512; stage++) {
			var segment = binary.slice(stage * 512, stage * 512 + 512)
			pack = exec(segment, pack[0], pack[1], pack[2], pack[3], pack[4])
		}

		return pack
	}


	function sha1(str) {
		var encodedHex = unicode.encodeToHex(str)       // 将明文按unicode编码为十六进制字符串
		var encodedBinary = bhd.hexToBinary(encodedHex) // 十六进制转换为二进制
		var paddedBinary = pad(encodedBinary)           // 填充位
		var pack = divide(paddedBinary, calculate)      // 按512位分组, 并依此计算每个分组的值
		return depack(pack)                            // 将abcde的封装转换为最终的哈希值
	}


	if (QUnit) {
		QUnit.module('sha1')

		QUnit.test('zeroPadSize', function (assert) {
			assert.equal(zeroPadSize(bhd.hexToBinary('a')), 443)
			assert.equal(zeroPadSize(bhd.hexToBinary('abc')), 435)
			assert.equal(zeroPadSize(bhd.hexToBinary(repeat('a', 111))), 3)
			assert.equal(zeroPadSize(bhd.hexToBinary(repeat('b', 112))), 511)
		})

		QUnit.test('pad', function (assert) {
			assert.equal(pad(bhd.hexToBinary('a')).length % 512, 0)
			//console.log(pad(bhd.hexToBinary('a'))) // it's too long to check
		})

		QUnit.test('sha1', function (assert) {
			assert.equal(sha1('abc'), 'a9993e364706816aba3e25717850c26c9cd0d89d')
			assert.equal(sha1('中文'), '7be2d2d20c106eee0836c9bc2b939890a78e8fb3')
		})
	}

	return sha1
})