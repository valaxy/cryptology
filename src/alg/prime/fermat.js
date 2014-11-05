define(function (require) {
	var crt = require('../crt')
	var Chance = require('../../../bower_components/chance/chance')

	var fermat = function (p) {
		if (p == 2 || p == 3) {
			return true
		}

		var s = 100
		var random = new Chance
		for (var i = 0; i < s; i++) {
			var a = random.integer({
				min: 2,
				max: p - 2
			})

			if (crt(a, p - 1, p) != 1) {
				return false
			}
		}

		return true
	}

	if (QUnit) {
		QUnit.module('fermat')

		QUnit.test('fermat', function (assert) {
			assert.equal(fermat(2), true)
			assert.equal(fermat(7), true)
			assert.equal(fermat(101), true)
			assert.equal(fermat(44), false)
			assert.equal(fermat(341), false) // ???? 伪素数
		})
	}

	return fermat
})