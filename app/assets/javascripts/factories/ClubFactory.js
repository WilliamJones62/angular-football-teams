(function() {
    'use strict'

    angular
        .module('app')
        .factory('ClubFactory', ['$http', function($http) {
            return {
              getTeam: getTeam,
              createPlayer: createPlayer,
              deletePlayer: deletePlayer,
              editPlayer: editPlayer
            }

            function getTeam(id) {
                return $http.get('/teams/' + id)
                            .then(handleResponse)
                            .catch(handleError)
            }

            function createPlayer(teamId, player) {
              return $http.post('/teams/' + teamId + '/players/', player)
                          .then(handleResponse)
                          .catch(handleError)
            }

            function editPlayer(teamId, player, Id) {
              return $http.put('/teams/' + teamId + '/players/' + Id, player)
                          .then(handleResponse)
                          .catch(handleError)
            }

            function deletePlayer(teamId, Id) {
              return $http.delete('/teams/' + teamId + '/players/' + Id)
                          .then(handleResponse)
                          .catch(handleError)
            }


            function handleResponse(response) {
                if (response.status === 200) return response.data

            }

            function handleError(error) {
                console.log("There was an error this http request: ", error)
            }
        }])
}())
