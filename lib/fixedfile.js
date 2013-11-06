var specLoader = require('./specloader'),
		formatter = require('./formatter'),
		EventEmitter = require('events').EventEmitter,
		util = require('util'),

		fs = require('fs'),
		path = require('path');

var FixedFile = module.exports = function(){}

util.inherits(FixedFile, EventEmitter);

FixedFile.prototype.loadConfig = function(path) {
	this.specs = specLoader.load(path);
	return this;
};

FixedFile.prototype.setWriteStream = function(stream) {
	if(typeof stream === 'string'){
		this.writeStream = fs.createWriteStream(stream)
	}
	else{
		this.writeStream = stream;
	}
	return this;
};

FixedFile.prototype.write = function(data, lineType, cb) {
	var data = formatter.formatRow(data, this.specs[lineType]);//Write a line-type, emit "ready" when writing can start.
	var ok = true;
	ok = this.writeStream.write(data, cb)
	if(!ok){
		this.writeStream.once('drain', function(){
			this.emit('ready');
		});
	}
	else{
		this.emit('ready');
	}
	return this;
}

FixedFile.prototype.done = function() {
	var self = this;
	this.writeStream.end('', function(){
		self.emit('end')});
	return this;
};

FixedFile.prototype.parse = function(data, lineType) {
	return formatter.parseRow(data, this.getSpec(lineType));
};

FixedFile.prototype.printHeader = function(lineType){
	console.log(lineType);
	console.log(new Array(lineType.length + 1).join(['=']));
	console.log(formatter.getDefinition(this.getSpec(lineType)));
	return this;
}


FixedFile.prototype.printProperties = function(lineType) {
	console.log(lineType);
	console.log(new Array(lineType.length + 1).join(['=']));

	console.log(formatter.getProperties(this.getSpec(lineType)));
	return this;
};

/* 
* Internal
*/

FixedFile.prototype.getSpec = function(name) {
	if(!this.specs[name]){
		throw new Error('No such spec: ' + name);
	}
	return this.specs[name]
};