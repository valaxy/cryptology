define(function () {

	var Caesar = function (k) {
		this.k = k
		this.pool = 'abcdefghijklmnopqrstuvwxyz,.ABCDEFGHIJKLMNOPQRSTUVWXYZ '
		this.n = this.pool.length

		this.map = { }
		for (var i = 0; i < this.pool.length; i++) {
			this.map[this.pool[i]] = i
		}
	}

	// 加密单个字符
	Caesar.prototype._encryptChar = function (ch) {
		var x = this.map[ch]
		var y = (x + this.k) % this.n
		return this.pool[y]
	}


	/**
	 * 依次加密每个字符
	 * @param {String} text 明文字符串
	 * @returns {String} 密文字符串
	 */
	Caesar.prototype.encrypt = function (text) {
		return  _.map(text, function (ch) {
			return this._encryptChar(ch)
		}, this).join('')
	}


	// 解密单个字符
	Caesar.prototype._decryptChar = function (ch) {
		var y = this.map[ch]
		var x = (y - this.k + this.n) % this.n
		return this.pool[x]
	}

	/**
	 * 依此解密每个字符
	 * @param {String} cipherText 密文字符串
	 * @returns {String} 明文字符串
	 */
	Caesar.prototype.decrypt = function (cipherText) {
		return _.map(cipherText, function (ch) {
			return this._decryptChar(ch)
		}, this).join('')
	}


	if (QUnit) {
		QUnit.module('Caesar')

		QUnit.test('encrypt', function (assert) {
			var caesar = new Caesar(10)
			assert.equal(caesar.encrypt('a'), 'k')
			assert.equal(caesar.encrypt('X'), 'g')

		})

		QUnit.test('decrypt', function (assert) {
			var caesar = new Caesar(10)
			assert.equal(caesar.decrypt('k'), 'a')
			assert.equal(caesar.decrypt('g'), 'X')
		})

		QUnit.test('case', function (assert) {
			var caesar = new Caesar(15)
			assert.equal(
				caesar.encrypt('Caesar is a title of imperial character.'),
				'RptFpEoxFopoGxG,toBuox.CtExp,orwpEprGtEO')
			assert.equal(
				caesar.decrypt('RptFpEoxFopoGxG,toBuox.CtExp,orwpEprGtEO'),
				'Caesar is a title of imperial character.')
		})
	}


	return Caesar
})