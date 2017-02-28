(function() {
    'use strict'

    angular
        .module('app')
        .controller('ClubController',['ClubFactory', '$stateParams', function(ClubFactory, $stateParams) {
            var selectedId = -1;
            var vm = this
            var teamId = $stateParams.id;
            vm.player = { id: null, name: '', team_id: teamId, };
            vm.startEdit = startEdit;
            vm.isInReadMode = isInReadMode;
            vm.isInEditMode = isInEditMode;

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
                         });
            };


            vm.editPlayer = function (teamId, player, Id) {
              ClubFactory.editPlayer(teamId, player, Id)
                         .then(function success(response){
                           vm.getTeam(teamId);
                          });
            };

            vm.deletePlayer = function (teamId, Id) {
              ClubFactory.deletePlayer(teamId, Id)
                         .then(function success(response){
                           vm.getTeam(teamId);
                          });
            };


            vm.team = vm.getTeam(teamId)

            function setTeam(data) {
              vm.team = data;
              vm.player = { id: null, name: '', team_id: teamId, };
              selectedId = -1;
            }

            vm.handleCreate = function(){
              vm.createPlayer(teamId, vm.player);
            }
            vm.handleEdit = function(id){
              debugger
              vm.editPlayer(teamId, vm.player, id);
            }
            vm.handleDelete = function(id){
              vm.deletePlayer(teamId, id);
            }

            vm.handleCancel = function(id){
              vm.getTeam();
            }

            function isInReadMode(id){
              return id != selectedId;
            }

            function isInEditMode(id){
              return id == selectedId;
            }

            function startEdit(id, name){
              selectedId = id;
              vm.player.id = id;
              vm.player.name = name;
            }

        }])
}())
