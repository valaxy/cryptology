define(function (require, exports) {
	exports.init = function () {
		var Chance = require('../../bower_components/chance/chance')
		var random = new Chance

		console.log(random.string({
			length: 10,
			pool: '0123456789'
		}))

	}
})