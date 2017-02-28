(function() {
    'use strict'

    angular
        .module('app')
        .controller('TeamController',['TeamFactory', '$stateParams', function(TeamFactory, $stateParams) {
            var selectedId = -1;
            var vm = this;
            vm.team = { id: null, name: '', league: '' };
            vm.startEdit = startEdit;
            vm.isInReadMode = isInReadMode;
            vm.isInEditMode = isInEditMode;

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
                           vm.team = { id: null, name: '', league: '' }
                         });
            };

            vm.editTeam = function (teamId, team) {
              TeamFactory.editTeam(teamId, team)
                         .then(function success(response){
                           vm.getTeams();
                          });
            };

            vm.deleteTeam = function (teamId) {
              TeamFactory.deleteTeam(teamId)
                         .then(function success(response){
                           vm.getTeams();
                          });
            };

            vm.teams = vm.getTeams()

            function setTeams(data) {
              vm.teams = data;
              selectedId = -1;
              vm.team = { id: null, name: '', league: '' };
            }

            vm.handleCreate = function(){
              vm.createTeam(vm.team);
            }

            vm.handleEdit = function(id){
              vm.editTeam(id, vm.team);
            }

            vm.handleDelete = function(id){
              vm.deleteTeam(id);
            }

            vm.handleCancel = function(){
              vm.getTeams();
            }

            function isInReadMode(id){
              return id != selectedId;
            }

            function isInEditMode(id){
              return id == selectedId;
            }

            function startEdit(id, name, league){
              selectedId = id;
              vm.team.name = name;
              vm.team.league = league;
            }

        }])
}())
