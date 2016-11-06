var twitchList = angular.module("twitchList", ["twitchList.controllers", "twitchList.services", "twitchList.filters"]);

twitchList.config(require("./config"));

require("./controllers");
require("./services");
require("./filters");
