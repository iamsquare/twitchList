var LocationService = function($window){
	var hash = $window.location.hash;
	var path = $window.location.pathname;

	this.getPath = function(){
		return path;
	};

	this.appendHash = appendHash;

	this.getHashSplit = function(separator){ return uniqueSplit(hash, separator); };

	function appendHash(value){
		$window.location.hash += value;
	}

	function isUnique(array) {
		var seen = {};
		return array.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}

	function uniqueSplit(string, separator){
		if(string === "") return [];
		return isUnique(string.substr(1, string.length).split(separator));
	}
};

LocationService.$inject = ["$window"];

module.exports = LocationService;
