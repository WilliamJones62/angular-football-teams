(function() {
    'use strict'

    angular
      	.module('app')
        .controller('FootballDataController',['FootballDataService', '$stateParams', function(FootballDataService, $stateParams) {
           	var vm = this;
            vm.competitions = [];
            vm.fixture = { date: null, opponent: '', home: '', for: 0, against: 0, status: ''};
            vm.teams = [];
            vm.games = [];
            vm.name = $stateParams.name;
            vm.league = $stateParams.league;
            var i = 0;
            var href = 'http://api.football-data.org/v1/competitions/';
            var competitionId = 0;
            var competitionFound = false;
            var teamFound = false;

            FootballDataService
              .getData(href)
              .then(function (res) {
                vm.competitions = res.data;
                debugger
                for (i = 0; i < vm.competitions.length; i++) {
                 if (vm.competitions[i].league == vm.league) {
                   competitionId = vm.competitions[i].id;
                   competitionFound = true;
                   i = vm.competitions.length ++;
                   debugger
                 };
               }

              });

            if (competitionFound){
              href = 'http://api.football-data.org/v1/competitions/' + competitionId  + '/teams'
              FootballDataService
                .getData(href)
                .then(function (res) {
                  vm.teams = res;
                });

              for (i = 0; i < vm.teams.length; i++) {
                if (vm.teams[i].name == vm.name) {
                  href = vm.teams[i].fixtures.href;
                  teamFound = true;
                  i = vm.teams.length ++;
                };
              }
              if (teamFound){
                FootballDataService
                  .getData(href)
                  .then(function (res) {
                    vm.fixtures = res;
                  });

                for (i = 0; i < vm.fixtures.length; i++) {
                  vm.fixture.date = vm.fixtures[i].date.toDateString;
                  vm.fixture.status = vm.fixtures[i].status;
                  if (vm.fixtures.homeTeamName[i] == vm.team.name){
                    vm.fixture.home = 'Home';
                    vm.fixture.for = vm.fixtures[i].result.goalsHomeTeam;
                    vm.fixture.against = vm.fixtures[i].result.goalsAwayTeam;
                    vm.fixture.opponent = vm.fixtures[i].awayTeamName;
                  } else {
                    vm.fixture.home = 'Away';
                    vm.fixture.for = vm.fixtures[i].result.goalsAwayTeam;
                    vm.fixture.against = vm.fixtures[i].result.goalsHomeTeam;
                    vm.fixture.opponent = vm.fixtures[i].homeTeamName;
                  }
                  vm.games << vm.fixture;
                }
              }
            }

          }])
  }())
