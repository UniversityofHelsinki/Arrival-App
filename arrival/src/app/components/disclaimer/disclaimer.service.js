(function() {
  'use strict';

  angular
    .module('arrival')
    .factory('disclaimerService', disclaimerService);

  /** @ngInject */
  function disclaimerService($log, $http) {
    var apiHost = '/api/disclaimer';

    var service = {
      apiHost: apiHost,
      getDisclaimer: getDisclaimer
    };

    return service;

    function getDisclaimer() {
      return $http.get(apiHost)
        .then(getDisclaimerComplete)
        .catch(getDisclaimerFailed);

      function getDisclaimerComplete(response) {
        return response.data;
      }

      function getDisclaimerFailed(error) {
        $log.error('XHR Failed for getDisclaimer.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();