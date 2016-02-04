(function() {
  'use strict';

  angular
    .module('arrival')
    .factory('questionsService', questionsService);

  /** @ngInject */
  function questionsService($log, $http) {
    var apiHost = '/api/question';

    var service = {
      apiHost: apiHost,
      getQuestion: getQuestion
    };

    return service;

    function getQuestion(qid) {
      return $http.get(apiHost + '/' + qid)
        .then(getQuestionComplete)
        .catch(getQuestionFailed);

      function getQuestionComplete(response) {
        return response.data;
      }

      function getQuestionFailed(error) {
        $log.error('XHR Failed for getQuestions.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();