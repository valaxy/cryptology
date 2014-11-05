define(function (require) {

	var gcd = require('./gcd')
	var eea = require('./eea')
	var crt = require('./crt')
	var mr = require('./prime/miller-rabin')
	var Chance = require('../../bower_components/chance/chance')


	var RSA = function () {
		this.random = new Chance
	}


	RSA.prototype._pickPrime = function (except) {
		except ? 0 : except = -1
		this.random = new Chance
		while (true) {
			var p = this.random.integer({
				min: 2,
				max: 1000
			})
			if (p != except && mr(p)) {
				return p
			}
		}
	}

	RSA.prototype._pickPrimes = function () {
		this.p = this._pickPrime()
		this.q = this._pickPrime(this.p)
	}

	RSA.prototype._pickE = function () {
		while (true) {
			var e = this.random.integer({
				min: 1,
				max: this.r - 1
			})
			if (gcd(e, this.r) == 1) {
				break
			}
		}
		return e
	}

	RSA.prototype._calcD = function () {
		var result = eea(this.e, this.r)
		var s = result[1]
		if (s < 0) {
			var n = Math.ceil(-s / this.r)
			s += n * this.r
		} else {
			var n = Math.floor(s / this.r)
			s -= n * this.r
		}
		return s
	}


	RSA.prototype.generateKeys = function () {
		this._pickPrimes() // 计算素数
		this.n = this.p * this.q
		this.r = (this.p - 1) * (this.q - 1)
		this.e = this._pickE() // 选择公钥
		this.d = this._calcD() // 计算私钥
	}

	RSA.prototype.encrypt = function (x) {
		return crt(x, this.e, this.n)
	}

	RSA.prototype.decrypt = function (y) {
		return crt(y, this.d, this.n)
	}

	if (QUnit) {
		QUnit.module('rsa')

		QUnit.test('example', function (assert) {
			var rsa = new RSA
			var rsa2 = new RSA
			rsa.generateKeys()
			rsa2.generateKeys()
			var x = 9
			var y = rsa.encrypt(x)
			assert.equal(rsa.decrypt(y), x)
			assert.notEqual(rsa2.decrypt(y), x)
		})
	}

	return RSA

})