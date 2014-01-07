var path = require('path'),
		glob = require('glob'),
    common = require('./common');

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

function loadSpec(file){
	var spec = require(path.resolve(process.cwd(),file))
	if(!spec || !Array.isArray(spec)){
		throw new Error('Invalid spec file');
	}
	spec.forEach(function(element){
		parseElement(element);
	});
	return spec;
};





module.exports.load = function(specPath){
	var ret = {},
			specs = glob.sync(specPath + "/**/*.tpl.js");

	specs.forEach(function (file) {
	  var name  = common.toCamelCase(path.basename(file).replace('.tpl.js',''));

	  console.log(file);

	  if (~file.indexOf('-')) {
	    name = file
	    .split('-').map(function (part) {
	      return capitalize(part);
	    }).join('');
	  }

	  ret[name] = loadSpec(file);
  });  
	return ret;
};