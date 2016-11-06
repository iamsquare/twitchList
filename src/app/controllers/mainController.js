var MainController = function($sce, TwitchListService){
	var vm = this;

	vm.hash = TwitchListService.getHash() || { "users" : [] };
	vm.addChannel = addChannel;
	vm.changeStream = changeStream;
	vm.removeChannel = removeChannel;
	vm.toggleOnline = toggleOnline;
	vm.toggleOffline = toggleOffline;
	vm.toggleRemove = toggleRemove;
	vm.toggleBoolean = toggleBoolean;

	vm.userNames = [];
	vm.users = [];
	vm.field = "";
	vm.currentStream = $sce.trustAsResourceUrl("http://player.twitch.tv/");
	vm.showOnline = true;
	vm.showOffline = true;
	vm.showRemove = false;

	angular.forEach(vm.hash["users"], function(str){
		vm.users.push(TwitchListService.requestStream(str));
	});


	function addChannel(str){
		if(vm.userNames.indexOf(str) >= 0 || vm.field === "") return;
		vm.userNames.push(str);
		vm.hash["users"].push(str);
		TwitchListService.updateHash(vm.hash);
		vm.users.push(TwitchListService.requestStream(str));
		vm.field = "";
	}

	function removeChannel(obj){
		var i = vm.users.indexOf(obj);
		if(i >= 0) vm.users.splice(i, 1);
		i = vm.userNames.indexOf(obj.name);
		if(i >= 0) vm.userNames.splice(i, 1);
		i = vm.hash["users"].indexOf(obj.name);
		if(i >= 0) vm.hash["users"].splice(i, 1);
		TwitchListService.updateHash(vm.hash);
	}

	function toggleOnline(){
		vm.showOnline = !vm.showOnline;
	}

	function toggleOffline(){
		vm.showOffline = !vm.showOffline;
	}

	function toggleRemove(){
		vm.removeEnabled = !vm.removeEnabled;
	}

	function toggleBoolean(va){
		vm[va] = !vm[va];
	}

	function changeStream(url){
		vm.currentStream = $sce.trustAsResourceUrl(url);
	}
};

MainController.$inject = ["$sce", "twitchListService"];

module.exports = MainController;
