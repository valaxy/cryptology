seajs.config({
	base: './'
})

seajs.use([
	'index'
], function (index) {
	index.init()
})