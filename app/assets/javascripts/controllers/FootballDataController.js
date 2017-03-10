(function() {
    'use strict'

    angular
      	.module('app')
        .controller('FootballDataController',['FootballDataService', '$stateParams', function(FootballDataService, $stateParams) {
           	var vm = this;
            var competitions = [];
            var fixtures = [];
            var teams = [];
            vm.games = [];
            var name = $stateParams.name;
            var league = $stateParams.league;
            var i = 0;
            var href = 'http://api.football-data.org/v1/competitions/';
            var competitionId = 0;
            var competitionFound = false;
            var teamFound = false;
            var commonHeadersToClear = {};

            FootballDataService
              .getData(href)
              .then(function (res) {
                competitions = res.data;
                for (i = 0; i < competitions.length; i++) {
                  if (competitions[i].league == league) {
                    competitionId = competitions[i].id;
                    competitionFound = true;
                    i = competitions.length ++;
                  };
                }
                if (competitionFound){
                  href = 'http://api.football-data.org/v1/competitions/' + competitionId  + '/teams'
                  FootballDataService
                    .getData(href)
                    .then(function (res) {
                      teams = res.data.teams;
                      for (i = 0; i < teams.length; i++) {
                        if (teams[i].name == name) {
                          href = teams[i]._links.fixtures.href;
                          teamFound = true;
                          i = teams.length ++;
                        };
                      }
                      if (teamFound){
                        FootballDataService
                          .getData(href)
                          .then(function (res) {
                            fixtures = res.data.fixtures;
                            for (i = 0; i < fixtures.length; i++) {
                              if (fixtures[i].homeTeamName == name){
                                vm.games.push({date: fixtures[i].date, status: fixtures[i].status, home: 'Home', for: fixtures[i].result.goalsHomeTeam, against: fixtures[i].result.goalsAwayTeam, opponent: fixtures[i].awayTeamName});
                              } else {
                                vm.games.push({date: fixtures[i].date, status: fixtures[i].status, home: 'Away', for: fixtures[i].result.goalsAwayTeam, against: fixtures[i].result.goalsHomeTeam, opponent: fixtures[i].homeTeamName});
                              }
                            }
                          });
                        }
                      });
                    }
                  });
                }])
              }())
