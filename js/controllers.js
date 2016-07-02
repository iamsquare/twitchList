var app = angular.module("twitchList");

var MainController = function(TwitchListFactory){

	var self = this;
	var channels = TwitchListFactory.splitAddressSearch(",").sort();

	self.results = [];

	angular.forEach(channels, function(value){
		self.results.push(TwitchListFactory.requestStream(value));
	});
};

MainController.$inject = ["TwitchListFactory"];

app.controller("MainController", MainController);
