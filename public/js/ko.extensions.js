ko.observableArray.fn['filter'] = function(filter){
	var a = this();
	var result = [];
	for(vari=0;i<a.length;i++){
		var v = a[i];
		if(filter(a)){
			result.push(v);
		}
	}
	return result;
};