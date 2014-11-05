define(function (require) {
	var eea = function (r0, r1) {
		var s0 = 1, t0 = 0,
			s1 = 0, t1 = 1

		while (true) {
			var q = Math.floor(r0 / r1)
			var s2 = s0 - q * s1
			var t2 = t0 - q * t1

			s0 = s1
			t0 = t1
			s1 = s2
			t1 = t2

			var r2 = r0 % r1
			r0 = r1
			r1 = r2

			if (r2 == 0) {
				break
			}
		}

		return [r0, s0, t0]
	}

	if (QUnit) {
		QUnit.module('eea')

		QUnit.test('eea', function (assert) {

			var gcd = require('./gcd')

			function testEqual(x, y) {
				var result = eea(x, y)
				assert.equal(result[0], gcd(x, y), 'gcd ok')
				assert.equal(result[1] * x + result[2] * y, gcd(x, y))
			}

			testEqual(3, 2)
			testEqual(9, 42)
		})

	}


	return eea
})