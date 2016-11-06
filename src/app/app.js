var twitchList = angular.module("twitchList", ["twitchList.controllers", "twitchList.services", "twitchList.filters"]);

var ConfigFunction = function($locationProvider){
	$locationProvider.hashPrefix("!");
}

ConfigFunction.$inject = ["$locationProvider"];

twitchList.config(ConfigFunction);

require("./controllers");
require("./services");
require("./filters");
