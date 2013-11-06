var path = require('path'),
    common = require('./common'),
    glob = require('glob');

function parseElement(el){	
	el.fill = el.fill || " ";
	el.adjust = el.adjust || "left";
	if(!el.length){
		throw new Error("required: length");
	}
	if(!(el.adjust === "left" || el.adjust === "right")){
		throw new Error("unsupported direction: " + el.direction)
	}
	if(!el.property){
		el.value = el.value || "";
	}
}

function parseSpec(spec){
	spec.forEach(function(element){
		parseElement(element);
	});
	return spec;
}

module.exports.load = function(specPath){
	var ret = {},
			specs = glob.sync(path.join(specPath,"*.spec.js"));

	specs.forEach(function (file) {
	  var name  = common.toCamelCase(path.basename(file).replace('.spec.js',''));

	  if (~file.indexOf('-')) {
	    name = file
	    .split('-').map(function (part) {
	      return capitalize(part);
	    }).join('');
	  }
	  ret[name] = parseSpec(require(path.join(process.cwd(),file)));
  });  
	return ret;
};