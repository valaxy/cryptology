define(function (require) {

	return function () {
		require('../src/basic/unicode')
		require('../src/basic/uint32')

		// des
		require('../src/alg/des/bit')
		require('../src/alg/des/des')

		require('../src/alg/gcd')
		require('../src/alg/eea')
		require('../src/alg/caesar')
		require('../src/alg/prime/fermat')
		require('../src/alg/prime/miller-rabin')
		require('../src/alg/bhd')
		require('../src/alg/rsa')

//		require('../src/alg/sha1')

	}

})