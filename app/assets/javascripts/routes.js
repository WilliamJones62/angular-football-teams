(function () {
  'use strict';

  angular
      .module('app')
      .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'home.html',
          })

          .state('teams', {
            url: '/teams',
            templateUrl: 'team.html',
            controller: 'TeamsController as vm'
          })

        $urlRouterProvider.otherwise('/')
      })
}());
