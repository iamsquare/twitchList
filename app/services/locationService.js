var LocationService = function($window){
	var search = $window.location.search;
	var hash = $window.location.hash;
	var path = $window.location.pathname;

	this.getPath = function(){
		return path;
	};

	this.appendSearch = appendSearch;

	this.appendHash = appendHash;

	this.getSearchSplit = function(separator){ return uniqueSplit(search, separator); };

	this.getHashSplit = function(separator){ return uniqueSplit(hash, separator); };

	function appendSearch(value){
		$window.location.search += value;
	}

	function appendHash(value){
		$window.location.hash += value;
	}

	function unique(array) {
		var seen = {};
		return array.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}

	function uniqueSplit(string, separator){
		if(string === "") return [];
		return unique(string.substr(1, string.length).split(separator));
	}
};

LocationService.$inject = ["$window"];

module.exports = LocationService;