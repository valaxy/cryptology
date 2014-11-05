define(function () {
	var gcd = function (x, y) {

		while (true) {
			var t = y
			y = x % y
			x = t

			if (y == 0) {
				break
			}
		}

		return x
	}

	if (QUnit) {
		QUnit.module('gcd')

		QUnit.test('gcd', function (assert) {
			assert.equal(gcd(7, 11), 1)
			assert.equal(gcd(6, 9), 3)
			assert.equal(gcd(22, 11), 11)
		})
	}

	return gcd
})