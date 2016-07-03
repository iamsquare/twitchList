var app = angular.module("TwitchList.controllers", []);

var MainController = function(TwitchListService, LocationService){

	var self = this;
	var channels = TwitchListService.splitAddressSearch(",");
	var results = [];

	angular.forEach(channels, function(value){
		this.push(TwitchListService.requestStream(value));
	}, results);

	if(results.length === 0) self.disableTutorial = true;

	self.active = "All";
	self.results = [];
	self.path = LocationService.getPath();

	self.displayAll = function(){
		angular.forEach(results, function(value){
			this.push(value);
		}, self.results = []);
		self.active = "All";
	};

	self.displayOnline = function(){
		angular.forEach(results, function(value){
			if(value.status === "online") this.push(value);
		}, self.results = []);
		self.active = "Online";
	};

	self.displayOffline = function(){
		angular.forEach(results, function(value){
			if(value.status !== "online") this.push(value);
		}, self.results = []);
		self.active = "Offline";
	};

	/*var sortResults = function(compareFn){
		self.results.sort(compareFn);
	};*/

	self.displayAll();
};

MainController.$inject = ["TwitchListService", "LocationService"];

app.controller("MainController", MainController);
