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
              templateUrl: 'teams.html',
              controller: 'teamsController as vm'
          })

        $urlRouterProvider.otherwise('/')
      })
}());
