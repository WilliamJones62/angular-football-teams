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

        $urlRouterProvider.otherwise('/')
      })
}());
