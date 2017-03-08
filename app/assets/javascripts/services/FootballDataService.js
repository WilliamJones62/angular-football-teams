function FootballDataService($http) {
	this.getData = function (href) {
		return $http.get(href, {
			headers: {'x-auth-token': 'd11d358be1d046c5b973b8a36e53a66c'}
		})
	};
}

angular
	.module('app')
	.service('FootballDataService', FootballDataService);
