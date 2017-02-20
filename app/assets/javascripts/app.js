(function () {
  'use strict'

  angular
      .module('footballteamsApp', ['ui.router', 'templates', 'ngSanitize'])
      .config([
          "$httpProvider", function($httpProvider) {
              $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
          }
      ])
      .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'home.html',
          })

        $urlRouterProvider.otherwise('/');
      });
}())
