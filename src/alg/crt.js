define(function () {
	/**
	 * x^p mod n
	 */
	return function (x, p, n) {
		var tot = x = x % n
		for (var i = 1; i < p; i++) {
			tot = tot * x % n
		}
		return tot
	}
})