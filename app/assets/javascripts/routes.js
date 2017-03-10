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
            controller: 'TeamController as vm'
          })

          .state('club', {
              url: '/teams/:id',
              templateUrl: 'club.html',
              controller: 'ClubController as vm'
          })

          .state('football-data', {
              url: 'api.football-data.org/v1/competitions/',
              templateUrl: 'football-data.html',
              controller: 'FootballDataController as vm',
              params: {
                name: null,
                league: null
              }
            })

        $urlRouterProvider.otherwise('/')
      })
}());
