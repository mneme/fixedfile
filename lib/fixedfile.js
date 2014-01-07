var templateLoader = require('./templateloader'),
		formatter = require('./formatter'),
		EventEmitter = require('events').EventEmitter,
		util = require('util'),
		fs = require('fs'),
		path = require('path');

var FixedFile = module.exports = function(){}

util.inherits(FixedFile, EventEmitter);

FixedFile.prototype.loadConfig = function(path) {
	this.templates = templateLoader.load(path);
	return this;
};

FixedFile.prototype.setWriteStream = function(stream) {
	if(typeof stream === 'string'){
		this.writeStream = fs.createWriteStream(stream);
	}
	else{
		this.writeStream = stream;
	}

	var self = this;
	this.writeStream.on('error', function(err){
		self.emit(err);
	});
	return this;
};

FixedFile.prototype.write = function(data, lineType, cb) {
	var template = this.templates[lineType]
	
	if(!template){return cb(new Error('no such template'), false);}

	var data = formatter.formatRow(data, template), //Write a line-type, emit "ready" when writing can start.
			ok = this.writeStream.write(data, cb),
			self = this;
	
	if(!ok){
		this.writeStream.once('drain', function(){
			self.emit('drain');
		});
	}
	else{
		self.emit('ready');
	}
	return ok;
};

FixedFile.prototype.done = function() {
	var self = this;
	this.writeStream.end('', function(){
		self.emit('end')});
	return this;
};

FixedFile.prototype.parse = function(data, lineType) {
	return formatter.parseRow(data, this.getTemplate(lineType));
};

FixedFile.prototype.printHeader = function(lineType){
	console.log(lineType);
	console.log(new Array(lineType.length + 1).join(['=']));
	console.log(formatter.getDefinition(this.getTemplate(lineType)));
	return this;
};


FixedFile.prototype.printProperties = function(lineType) {
	console.log(lineType);
	console.log(new Array(lineType.length + 1).join(['=']));

	console.log(formatter.getProperties(this.getTemplate(lineType)));
	return this;
};

/* 
* Internal
*/

FixedFile.prototype.getTemplate = function(name) {
	if(!this.templates[name]){
		throw new Error('No such template: ' + name);
	}
	return this.templates[name]
};