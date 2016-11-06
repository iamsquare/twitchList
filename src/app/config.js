var ConfigFunction = function($locationProvider){
	$locationProvider.hashPrefix("!");
}

ConfigFunction.$inject = ["$locationProvider"];

module.exports = ConfigFunction;