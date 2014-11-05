define(function (require) {

	var bit = require('./bit')

	var IP = [-1,
		58, 50, 42, 34, 26, 18, 10, 2,
		60, 52, 44, 36, 28, 20, 12, 4,
		62, 54, 46, 38, 30, 22, 14, 6,
		64, 56, 48, 40, 32, 24, 16, 8,
		57, 49, 41, 33, 25, 17, 9, 1,
		59, 51, 43, 35, 27, 19, 11, 3,
		61, 53, 45, 37, 29, 21, 13, 5,
		63, 55, 47, 39, 31, 23, 15, 7];

	var FP = [-1,
		40, 8, 48, 16, 56, 24, 64, 32,
		39, 7, 47, 15, 55, 23, 63, 31,
		38, 6, 46, 14, 54, 22, 62, 30,
		37, 5, 45, 13, 53, 21, 61, 29,
		36, 4, 44, 12, 52, 20, 60, 28,
		35, 3, 43, 11, 51, 19, 59, 27,
		34, 2, 42, 10, 50, 18, 58, 26,
		33, 1, 41, 9, 49, 17, 57, 25];

	var E = [-1,
		32, 1, 2, 3, 4, 5,
		4, 5, 6, 7, 8, 9,
		8, 9, 10, 11, 12, 13,
		12, 13, 14, 15, 16, 17,
		16, 17, 18, 19, 20, 21,
		20, 21, 22, 23, 24, 25,
		24, 25, 26, 27, 28, 29,
		28, 29, 30, 31, 32, 1]

	var P = [-1,
		16, 7, 20, 21, 29, 12, 28, 17,
		1, 15, 23, 26, 5, 18, 31, 10,
		2, 8, 24, 14, 32, 27, 3, 9,
		19, 13, 30, 6, 22, 11, 4, 25];

	var S1 = [
		14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
		0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
		4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
		15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13];

	var S2 = [
		15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
		3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
		0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
		13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9];

	var S3 = [
		10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
		13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
		13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
		1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12];

	var S4 = [
		7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
		13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
		10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
		3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]

	var S5 = [
		2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
		14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
		4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
		11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]

	var S6 = [
		12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
		10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
		9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
		4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]

	var S7 = [
		4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
		13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
		1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
		6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]

	var S8 = [
		13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
		1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
		7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
		2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]

	var PC1 = [-1,
		// C
		57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,
		10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
		// D
		63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
		14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]

	var PC2 = [-1,
		14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
		23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
		41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
		44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]

	function remove_spaces(instr) {
		var i;
		var outstr = "";

		for (i = 0; i < instr.length; i++)
			if (instr.charAt(i) != " ")
				outstr += instr.charAt(i);
		return outstr;
	}


	function split_int(ary, start, bitc, val) {
		for (var j = bitc - 1; j >= 0; j--) {
			ary[start + j] = val & 1;
			val >>= 1;
		}
	}

	function encodeKey(str, ASCII_flag) {
		var bitArray = new Array(65)
		var i = 0, val = 0;
		bitArray[0] = -1;
		if (ASCII_flag) {
			if (str.length != 8) {
				throw 'key must be 8-len'
			}
			for (i = 0; i < 8; i++) {
				split_int(bitArray, i * 8 + 1, 8, str.charCodeAt(i));
			}
		}
		else {
			//Удаляем пробелы
			str = remove_spaces(str);
			if (str.length != 16) {
				throw 'key must be 16-len'
			}
			for (i = 0; i < 16; i++) {
				//Выбираем очередной символ для проверки
				val = str.charCodeAt(i);

				if (val >= 48 && val <= 57)
				//Число 0-9
					val -= 48;
				else if (val >= 65 && val <= 70)
				//Буква A-F (ЗАГЛАВНАЯ)
					val -= 55;
				else if (val >= 97 && val <= 102)
				//Буква A-F
					val -= 87;
				else {
					window.alert(str.charAt(i) + " - некорректный символ!");
					return false
				}
				split_int(bitArray, i * 4 + 1, 4, val);
			}
		}
		return bitArray
	}


	function encode(in_str, ASCII_flag) {
		str = in_str.slice(0);
		var i = 0, j = 0;
		var inData;
		var val = 0;
		var s = 0;
		var n = 0;

		if (ASCII_flag) {
			if ((str.length % 8) != 0) {
				if (str.length < 8) {
					s = 8 - str.length;
					n = 1;
				}
				else {
					n = Math.ceil(str.length / 8);
					s = 8 - ( str.length - ( 8 * Math.floor(str.length / 8) ) );
				}
				for (i = 0; i < s; i++)
					str += "\0";
			}
			else {
				n = str.length / 8;
			}
			inData = new Array(n);
			for (j = 0; j < n; j++) {
				inData[j] = new Array(65);
				for (i = 0; i < 8; i++)
					split_int(inData[j], i * 8 + 1, 8, str.charCodeAt(i + 8 * j));
			}
		}
		else {
			str = remove_spaces(str);

			if ((str.length % 16) != 0) {
				if (str.length < 16) {
					s = 16 - str.length;
					n = 1;
				}
				else {
					n = Math.ceil(str.length / 16);
					s = 16 - ( str.length - ( 16 * Math.floor(str.length / 16) ) );
				}
				var s0 = "";
				for (i = 0; i < s; i++)
					s0 += "0";
				str = s0 + str;
			}
			else {
				n = str.length / 16;
			}
			inData = new Array(n);
			for (j = 0; j < n; j++) {
				inData[j] = new Array(65);
				for (i = 0; i < 16; i++) {
					val = str.charCodeAt(i + 16 * j);
					if (val >= 48 && val <= 57)
					//Число 0-9
						val -= 48;
					else if (val >= 65 && val <= 70)
					//Буква A-F (ЗАГЛАВНАЯ)
						val -= 55;
					else if (val >= 97 && val <= 102)
					//Буква A-F
						val -= 87;
					else {
						window.alert(str.charAt(i) + " - некорректный символ!");
						return;
					}
					split_int(inData[j], i * 4 + 1, 4, val);
				}
			}
		}
		return inData;
	}


	function decode(DES_output) {
		var bits;
		var str = ''

		//1 = ASCII
		//0 = hex
		if (true) {
			for (var j = 0; j < DES_output.length; j++) {
				for (var i = 1; i <= 64; i += 8) {
					str += String.fromCharCode(
							DES_output[j][i  ] * 128 + DES_output[j][i + 1] * 64 +
							DES_output[j][i + 2] * 32 + DES_output[j][i + 3] * 16 +
							DES_output[j][i + 4] * 8 + DES_output[j][i + 5] * 4 +
							DES_output[j][i + 6] * 2 + DES_output[j][i + 7]);
				}
			}
		}
		else {
			for (j = 0; j < DES_output.length; j++) {
				for (i = 1; i <= 64; i += 4) {
					bits = DES_output[j][i  ] * 8 + DES_output[j][i + 1] * 4 +
						DES_output[j][i + 2] * 2 + DES_output[j][i + 3];

					//0-9 or A-F
					if (bits <= 9)
						str += String.fromCharCode(bits + 48);
					else
						str += String.fromCharCode(bits + 87);
				}
			}
		}

		return str
	}

	// s: in
	// input: in
	function sbox(s, input) {
		var sindex = input[0] * 32
			+ input[5] * 16
			+ input[1] * 8
			+ input[2] * 4
			+ input[3] * 2
			+ input[4];
		return s[sindex]
	}


	// r: in-out
	function f(r, subKey) {
		var sout = new Array(33)

		var eResult = bit.getPermute(r, E)
		eResult.xor(subKey)

		sout.fillInt4(1, sbox(S1, eResult.slice(1, 7)))
		sout.fillInt4(5, sbox(S2, eResult.slice(7, 13)))
		sout.fillInt4(9, sbox(S3, eResult.slice(13, 19)))
		sout.fillInt4(13, sbox(S4, eResult.slice(19, 25)))
		sout.fillInt4(17, sbox(S5, eResult.slice(25, 31)))
		sout.fillInt4(21, sbox(S6, eResult.slice(31, 37)))
		sout.fillInt4(25, sbox(S7, eResult.slice(37, 43)))
		sout.fillInt4(25, sbox(S7, eResult.slice(37, 43)))
		sout.fillInt4(29, sbox(S8, eResult.slice(43, 49)))

		r.permute(sout, P)
	}


	// l: inout
	// r: inout
	function desRound(l, r, subKey) {
		var oldL = bit.getCopy(l)

		l.fill(r, 0, 0, l.length)

		f(r, subKey)

		r.xor(oldL);
	}


	var Des = function (key) {
		this.asciiFlag = true
		this.key = encodeKey(key, this.asciiFlag)
	}


	// 密钥编排
	Des.prototype._generateKeys = function () {
		var cd = this.key.getPermute(PC1)
		var subKeys = new Array(16)
		for (var i = 1; i <= 16; i++) {
			if (i == 1 || i == 2 || i == 9 || i == 16) {
				cd.shiftCD1()
			}
			else {
				cd.shiftCD2()
			}
			subKeys[i] = cd.getPermute(PC2)
		}
		return subKeys
	}

	// feistel网络
	Des.prototype._feistel = function (subKeys, data64, isEncrypt) {
		var tempData = data64.getPermute(IP)
		var l = tempData.slice(0, 33)
		var r = tempData.slice(32, 65)

		if (isEncrypt) {
			for (var i = 1; i <= 16; i++) {
				desRound(l, r, subKeys[i])
			}
		}
		else {
			for (var i = 16; i >= 1; i--) {
				desRound(l, r, subKeys[i]);
			}
		}

		tempData.fill(r, 1, 1, 32)
		tempData.fill(l, 33, 1, 32)

		return tempData.getPermute(FP)
	}

	// DES 加解密核心流程
	Des.prototype._core = function (data, isEncrypt) {
		var subKeys = this._generateKeys()        // 密钥编排
		var result = new Array(data.length);      // 为每个加密段保存结果
		for (var i = 0; i < result.length; i++) {
			result[i] = this._feistel(subKeys, data[i], isEncrypt)
		}
		return result;
	}

	Des.prototype._des = function (encrypt_flag, text) {
		var inData = encode(text, this.asciiFlag)
		var outData = this._core(inData, encrypt_flag)
		var output = decode(outData)
		return output
	}


	Des.prototype.encrypt = function (text) {
		return this._des(true, text)
	}


	Des.prototype.decrypt = function (cipherText) {
		return this._des(false, cipherText)
	}


	if (QUnit) {
		QUnit.module('Des')

		QUnit.test('example', function (assert) {
			var des = new Des('abcdefgh')
			var des2 = new Des('ijklmnop')
			var text = '1234567890123456'
			var cipherText = des.encrypt(text)

			assert.ok(des.decrypt(cipherText) == text)
			assert.ok(des2.decrypt(cipherText) != text)
		})
	}

	return Des
})