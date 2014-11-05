define(function () {

	Array.prototype.fill = function (source, begin, sourceBegin, offset) {
		for (var i = 0; i < offset; i++) {
			this[begin + i] = source[sourceBegin + i]
		}
		return this
	}


	Array.prototype.getPermute = function (perm) {
		var dest = new Array(this.length)
		dest[0] = -1
		for (var i = 1; i < perm.length; i++) {
			dest[i] = this[perm[i]]
		}
		return dest
	}

	Array.prototype.permute = function (source, perm) {
		for (var i = 1; i < perm.length; i++) {
			this[i] = source[perm[i]]
		}
		return this
	}


	Array.prototype.shiftCD1 = function () {
		for (var i = 0; i <= 55; i++) {
			this[i] = this[i + 1]
		}

		this[56] = this[28];
		this[28] = this[0];
		return this
	}

	Array.prototype.shiftCD2 = function () {
		var temp = this[1]

		for (var i = 0; i <= 54; i++) {
			this[i] = this[i + 2];
		}

		this[55] = this[27];
		this[56] = this[28];
		this[27] = temp;
		this[28] = this[0];
		return this
	}

	Array.prototype.xor = function (a) {
		for (var i = 1; i < this.length; i++) {
			this[i] = this[i] ^ a[i]
		}
	}

	Array.prototype.fillInt4 = function (int4, start) {
		for (var i = 3; i >= 0; i--) {
			this[start + i] = int4 & 1;
			int4 >>= 1;
		}
		return this
	}


	var bit = { }

	bit.getPermute = function (source, perm) {
		var dest = new Array(source.length)
		for (var i = 0; i < perm.length; i++) {
			dest[i] = source[perm[i]]
		}
		return dest
	}

	bit.getCopy = function (source) {
		var dest = new Array(source.length)
		for (var i = 0; i < source.length; i++) {
			dest[i] = source[i]
		}
		return dest
	}

	if (QUnit) {
		QUnit.module('bit-array')

		QUnit.test('getPermute', function (assert) {
			var a = [-1, 1, 2, 3, 4]
			assert.deepEqual(a.getPermute([-1, 4, 2, 1, 3]), [-1, 4, 2, 1, 3])
		})

		QUnit.test('fillInt4', function (assert) {
			assert.deepEqual([0, 0, 0, 0, 0].fillInt4(0xf, 1), [0, 1, 1, 1, 1])
		})


	}

	return bit
})