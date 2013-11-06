var FlatFile = require('./lib/fixedfile.js')

var ff = new FlatFile()

ff
	.loadConfig('./test/spec')
	//.printDefinition('row')
	.printProperties('row')
	.setWriteStream('./testing')
	.write(
		{amount: 10000,
		customerNo: 1,
		article : 1,
		article_code : 1,
		batchId : '20130101-2000',
		confirmDate: '20140101', 
		deliveryDate : '20150101',
		mission : '12',
		lineNumber : 1,
		orderDate : '20160101',
		orderId: 2,
		period : '20170101',
		rowNo : 1,
		orderText : 'Apa'}
	, 'row');






	/*.write({name:'test', value:'2000000000000'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')
	.write({name:'test', value:'20'}, 'header')*/
	