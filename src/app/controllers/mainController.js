var MainController = function($sce, TwitchListService){
	var vm = this;
	var seconds = 1000;

	vm.addChannel = addChannel;
	vm.changeStream = changeStream;
	vm.removeChannel = removeChannel;
	vm.toggleOnline = toggleOnline;
	vm.toggleOffline = toggleOffline;
	vm.toggleRemove = toggleRemove;

	vm.userNames = [];
	vm.testNames = ["zai", "sheevergaming", "freecodecamp", "wagamamatv", "alohadanceTV", "sing_sing", "test_channel", "404nochannel", "oroboro"];
	vm.users = [];
	vm.field = "";
	vm.currentStream = $sce.trustAsResourceUrl("http://player.twitch.tv/");
	vm.showOnline = true;
	vm.showOffline = true;
	vm.removeEnabled = false;

	angular.forEach(vm.testNames, function(str){
		vm.addChannel(str);
	})

	function addChannel(str){
		if(!vm.userNames.indexOf(str)) return;
		vm.userNames.push(str);
		vm.users.push(TwitchListService.requestStream(str));
		vm.field = "";
	}

	function removeChannel(obj){
		var i = vm.users.indexOf(obj);
		if(i >= 0) vm.users.splice(i, 1);
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

	function changeStream(url){
		vm.currentStream = $sce.trustAsResourceUrl(url);
	}
};

MainController.$inject = ["$sce", "twitchListService"];

module.exports = MainController;
