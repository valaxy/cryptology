define(function (require) {

	var Chance = require('../../../bower_components/chance/chance')
	var eea = require('../eea')
	var crt = require('../crt')

	var random = new Chance

	// p - 1 = 2^u × r, return r
	function decompose(p) {
		p--
		var u = 0
		while (true) {
			if (p % 2) {
				p = p / 2
				u++
			} else {
				break
			}
		}
		return [u, p]
	}


	// if true, p is a prime possibly
	function primeTest(p, u, r) {
		var a = random.integer({
			min: 2,
			max: p - 2
		})

		var result = crt(a, r, p)
		if (result != 1 && result != p - 1) {
			for (var j = 1; j < u; j++) {
				result = result * result % p
				if (result == 1) {
					return false
				}
			}

			if (result != p - 1) {
				return false
			}
		}

		return true
	}


	/**
	 * Miller-Rabin prime test
	 * @returns {Boolean} true if it's prime
	 */
	var mr = function (p) {
		if (p == 2 || p == 3) {
			return true
		}

		var s = 100 // 执行100次测试
		var result = decompose(p)
		for (var i = 0; i < s; i++) {
			if (!primeTest(p, result[0], result[1])) {
				return false
			}
		}

		return true
	}

	if (QUnit) {
		QUnit.module('mr')

		QUnit.test('miller-rabin', function (assert) {
			assert.equal(mr(2), true)
			assert.equal(mr(7), true)
			assert.equal(mr(44), false)
			assert.equal(mr(341), false)
		})
	}

	return mr
})