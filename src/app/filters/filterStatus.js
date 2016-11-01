var FilterStatus = function(){
	return function(v, on, off){
		var out = [];
		angular.forEach(v, function(u){
			if(u.status === "online" ? on : off){
				out.push(u);
			}
		});
		return out;
	}
};

module.exports = FilterStatus;
