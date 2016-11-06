var hashParserService = function($location){
	return {
		get: function(){
			return $location.hash();
		},
		parse: function(){
			var res;
			if($location.hash()){
				res = {};
				angular.forEach($location.hash().split("&"), function(item){
					var split = item.split("=");
					if(split[0] !== ""){
						if(split[1] !== undefined) res[split[0]] = split[1].split(",");
						else res[split[0]] = split[0];
					}
				});
			}
			return res;
		},
		set: function(obj){
			var res = "";
			if(obj){
				angular.forEach(obj, function(value, key){
					if(value instanceof Array) res += key + "=" + value.join(",") + "&";
					else res += key + "=" + value + "&";
				});
			}
			$location.hash(res);
		}
	}
};

hashParserService.$inject = ["$location"];

module.exports = hashParserService;