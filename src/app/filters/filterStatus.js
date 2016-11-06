var FilterStatus = function(){
	return function(v, on, off){
		var out = [];
		angular.forEach(v, function(user){
			if(user.status === "online" ? on : off){
				out.push(user);
			}
		});
		return out;
	}
};

module.exports = FilterStatus;
