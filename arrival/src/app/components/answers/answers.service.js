(function() {
  'use strict';

  angular
    .module('arrival')
    .factory('answersService', answersService);

  /** @ngInject */
  function answersService($log, $http) {
    var apiHost = '/api/answer';

    var service = {
      apiHost: apiHost,
      getAnswer: getAnswer
    };

    return service;

    function getAnswer(selection) {
      return $http.get(apiHost + '/' + selection)
        .then(getAnswerComplete)
        .catch(getAnswerFailed);

      function getAnswerComplete(response) {
        return response.data;
      }

      function getAnswerFailed(error) {
        $log.error('XHR Failed for getanswers.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();