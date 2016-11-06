var TrustAsResourceUrl = function($sce){
	return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
};

TrustAsResourceUrl.$inject = ["$sce"];

module.exports = TrustAsResourceUrl;