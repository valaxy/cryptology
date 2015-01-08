var HUNGRY = 1
var THINKING = 0

var tableLock = { }
var state = [ ]
var s = []

function down() {

}

function up() {

}

function test(i) {

}

function left(i) {

}

function right(i) {

}

function takeFork(i) {
	down(tableLock)
	state[i] = HUNGRY
	test(i)
	up(tableLock)

	down(s[i])
}


// 放下叉子时执行
function putFork(i) {
	down(tableLock)
	think(i)
	putLeft(i)
	putRight(i)
	up(tableLock)
}

function think() {
	state[i] = THINKING // 哲学家已经就餐完毕

}

function putLeft(i) {

}

function putRight(i) {

}