var services = angular.module("twitchList.services", []);

services.factory("requestFactory", require("./requestFactory"));
services.service("locationService", require("./locationService"));
services.service("twitchListService", require("./twitchListService"));