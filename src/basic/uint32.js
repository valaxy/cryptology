define(function () {

	Number.prototype.convertToInt32 = function () {
		return this >>> 0
	}

	Number.prototype.rotateLeft = function (n) {
		return ((this << n) | (this >>> (32 - n))).convertToInt32()
	}

	Number.prototype.rotateRight = function (n) {
		return ((this >>> n) | (this << (32 - n))).convertToInt32()
	}

	Number.prototype.add = function (num) {
		return (this + num).convertToInt32()
	}


	if (QUnit) {
		QUnit.module('uint32')

		QUnit.test('convertToInt32', function (assert) {
			assert.equal(Number(-1).convertToInt32(), 4294967295)
			assert.equal(Number(0x98712345678).convertToInt32(), 0x12345678)
		})

		QUnit.test('rotateLeft', function (assert) {
			assert.equal(Number(0xffffffff).rotateLeft(13), 0xffffffff)
			assert.equal(Number(0x7fffffff).rotateLeft(1), 0xfffffffe)
			assert.equal(Number(0x98712345678).rotateLeft(4), 0x23456781)
			assert.equal(Number(-1).rotateLeft(5), 0xffffffff)
		})

		QUnit.test('rotateRight', function (assert) {
			assert.equal(Number(0xffffffff).rotateRight(15), 0xffffffff)
			assert.equal(Number(0x7fffffff).rotateRight(4), 0xf7ffffff)
			assert.equal(Number(0x98712345678).rotateRight(8), 0x78123456)
		})

		QUnit.test('add', function (assert) {
			assert.equal(Number(0xffffffff).add(2), 1)
			assert.equal(Number(0x11fffffffe).add(1), 0xffffffff)
		})
	}

})