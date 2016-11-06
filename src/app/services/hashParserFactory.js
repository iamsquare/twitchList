//this hash parsing factory it's extremely unstable
//it will eventually break if used outside the scope of this application
var hashParserFactory = function($location){
	return {
		get: function(){
			return $location.hash();
		},
		parse: function(separator){
			if($location.hash()){
				var res = {};
				angular.forEach($location.hash().split("&"), function(item){
					var split = item.split("=");
					if(split[0] !== ""){
						if(split[1] !== "") res[split[0]] = split[1].split(separator);
						else res[split[0]] = [];
					}
				});
				return res;
			}
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

hashParserFactory.$inject = ["$location"];

module.exports = hashParserFactory;