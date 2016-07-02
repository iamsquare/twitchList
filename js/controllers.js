var app = angular.module("twitchList");

var MainController = function(TwitchListFactory){

	var channels = TwitchListFactory.splitAddressSearch(",").sort();

	var results = this.results = [];

	angular.forEach(channels, function(value){
		results.push(TwitchListFactory.requestStream(value));
	});
};

MainController.$inject = ["TwitchListFactory"];

app.controller("MainController", MainController);
