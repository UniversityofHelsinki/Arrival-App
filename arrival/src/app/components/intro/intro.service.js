(function() {
  'use strict';

  angular
    .module('arrival')
    .factory('introService', introService);

  /** @ngInject */
  function introService($log, $http) {
    var apiHost = '/api/intro';

    var service = {
      apiHost: apiHost,
      getIntro: getIntro
    };

    return service;

    function getIntro() {
      return $http.get(apiHost)
        .then(getIntroComplete)
        .catch(getIntroFailed);

      function getIntroComplete(response) {
        return response.data;
      }

      function getIntroFailed(error) {
        $log.error('XHR Failed for getIntro.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();