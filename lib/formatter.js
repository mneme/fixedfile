var pad = require('./pad'),
		_ = require('lodash');

module.exports.formatRow = function(data, spec){
	return  _.reduce(spec, function(acc, el){
		var raw;
		// Choose property or default value;
		if(el.property && data.hasOwnProperty(el.property)){
			raw = data[el.property];
		}
		else{
			raw =  el.value || "";
		}
		if(el.format && typeof el.format == 'function'){
			raw = el.format(raw);
		}
		return acc + pad[el.adjust](String(raw), el.fill, el.length);
	}, '') + '\n';
};

module.exports.parseRow = function(row, spec){
	var obj = {}
	spec.forEach(function(el){
		var raw = row.splice(0, el.length);
		if(el.property){
			obj[el.property] = raw;
		}
	});
	return obj;
}

module.exports.getProperties = function(spec){
	return _.reduce(spec, function(acc, el){
		if(el.property){
			acc = acc +  el.name + " : "+ "[" + el.property + "]" + "\n";
		} 
		else if(el.value){
			acc = acc + el.name + " : " + "\"" + el.value + "\"" + "\n";
		}
		return acc;
	}, '');
}

module.exports.getDefinition = function(spec){
	return _.reduce(spec, function(acc, el){
		var raw = el.name + ":" + el.length;
		return acc + pad.left(raw, " ", el.length-1) + '|';
	}, '');
}