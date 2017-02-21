(function() {
    'use strict'

    angular
        .module('app')
        .controller('TeamsController',['TeamFactory', '$stateParams', function(TeamFactory, $stateParams) {
            var vm = this
            vm.team = { id: null, name: '' }


            vm.getTeams = function() {
              TeamFactory.getTeams()
                         .then(function (data){
                           setTeams(data)
              });
            };

            vm.createTeam = function (team) {
              TeamFactory.createTeam(team)
                         .then(function success(response){
                           vm.getTeams();
                           vm.team = { id: null, name: '' }
                         });
            };

            vm.editTeam = function (teamId, team) {
              TeamFactory.editTeam(teamId, team)
                         .then(function success(response){
                           vm.getteams();
                          });
            };

            vm.deleteTeam = function (teamId) {
              teamFactory.deleteTeam(teamId)
                         .then(function success(response){
                           vm.getTeams();
                          });
            };

            vm.teams = vm.getTeams()

            function setTeam(data) {
              vm.teams = data;
            }

            vm.handleCreate = function(){
              vm.createTeam(vm.team);
            }

            vm.handleEdit = function(teamId,team){
              vm.editTeam(teamId, team);
            }

            vm.handleDelete = function(id){
              vm.deleteTeam(id);
            }


        }])
}())
