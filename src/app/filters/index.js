var filters = angular.module("twitchList.filters", []);

filters.filter("filterStatus", require("./filterStatus"));
filters.filter("trustAsResourceUrl", require("./trustAsResourceUrl"));