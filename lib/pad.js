function clip(str, len){
	return str.substring(0, len);
}

module.exports.right = function(str, fill, length){
	return (new Array(length+1).join(fill)+clip(str, length)).slice(-length);
};

module.exports.left = function(str, fill, length){
	return (clip(str, length) + new Array(length+1).join(fill)).slice(0,length);
};