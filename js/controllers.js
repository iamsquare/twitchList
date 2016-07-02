var app = angular.module("twitchList");

var MainController = function(TwitchListFactory){

	var channels = ["freecodecamp", "sing_sing", "sheevergaming", "comster404", "zai"].sort(); //.concat(TwitchListFactory.splitAddressSearch());

	var results = this.results = [];

	angular.forEach(channels, function(value){
		results.push(TwitchListFactory.requestStream(value));
	});
};

MainController.$inject = ["TwitchListFactory"];

app.controller("MainController", MainController);
