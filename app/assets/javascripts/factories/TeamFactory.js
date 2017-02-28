(function() {
    'use strict'

    angular
        .module('app')
        .factory('TeamFactory', ['$http', function($http) {
            return {
                getTeams: getTeams,
                createTeam: createTeam,
                editTeam: editTeam,
                deleteTeam: deleteTeam
            }

            function getTeams() {
              return $http.get('/teams')
                          .then(handleResponse)
                          .catch(handleError)
            }

            function createTeam(team) {
              return $http.post('/teams/', team)
                          .then(handleResponse)
                          .catch(handleError)
            }

            function editTeam(teamId, team) {
              return $http.put('/teams/' + teamId, team)
                          .then(handleResponse)
                          .catch(handleError)
            }

            function deleteTeam(teamId) {
              return $http.delete('/teams/' + teamId)
                          .then(handleResponse)
                          .catch(handleError)
            }

            function handleResponse(response) {
                if (response.status === 200) return response.data

            }

            function handleError(error) {
                console.log("There was an error with this http request: ", error)
            }
        }])
}())
