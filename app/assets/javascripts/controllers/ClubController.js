(function() {
    'use strict'

    angular
        .module('app')
        .controller('ClubController',['ClubFactory', '$stateParams', function(ClubFactory, $stateParams) {
            var vm = this
            var teamId = $stateParams.id;
            vm.player = { id: null, name: '', team_id: teamId, };


            vm.getTeam = function(teamId) {
              ClubFactory.getTeam(teamId)
                         .then(function (data){
                           setTeam(data)
              });
            };


            vm.createPlayer = function (teamId, player) {
              ClubFactory.createPlayer(teamId, player)
                         .then(function success(response){
                           vm.getTeam(teamId);
                           vm.player = '';
                         });
            };


            vm.editPlayer = function (teamId, player, Id) {
              ClubFactory.editPlayer(teamId, player, Id)
                         .then(function success(response){
                           vm.getTeam(teamId);
                           vm.player = '';
                          });
            };

            vm.deletePlayer = function (teamId, Id) {
              ClubFactory.deletePlayer(teamId, Id)
                         .then(function success(response){
                           vm.getTeam(teamId);
                           vm.player = '';
                          });
            };


            vm.team = vm.getTeam(teamId)

            function setTeam(data) {
              vm.team = data;
            }

            vm.handleCreate = function(){
              vm.createPlayer(teamId, vm.player);
            }
            vm.handleEdit = function(player, Id){
              vm.editPlayer(teamId, player, Id);
            }
            vm.handleDelete = function(id){
              vm.deletePlayer(teamId, id);
            }

        }])
}())
