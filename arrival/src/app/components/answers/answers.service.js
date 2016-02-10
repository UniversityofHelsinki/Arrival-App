(function() {
  'use strict';

  angular
    .module('arrival')
    .factory('answersService', answersService);

  /** @ngInject */
  function answersService($log, $http) {
    var apiHost = '/api/';
    var listHidden = [];
    var listGuides = [];

    var service = {
      apiHost: apiHost,
      getAnswer: getAnswer
    };

    return service;

    function getAnswer(selection) {
      getHidden(selection);
      return $http.get(apiHost + 'answer/' + selection)
        .then(getAnswerComplete)
        .catch(getAnswerFailed);

      function getHidden(selection) {
        return $http.get(apiHost + 'hide/' + selection)
          .success(function(data) {
            listHidden = data;
            $log.debug('1:');
            $log.debug(listHidden);
          });
      }

      function getAnswerComplete(response) {
        var i = 0;
        $log.debug('2:');
        $log.debug(listHidden);
        if(listHidden.length > 0) {
          angular.forEach(response.data, function() {
            if (!isHidden(response.data[i].nid)) {
              $log.debug('response.data: ');
              $log.debug(response.data);
              $log.debug('response.data[i]: ');
              $log.debug(response.data[i]);
              listGuides.push(response.data[i]);
            }
            i++;
          });
        } else {
          listGuides = response.data;
        }

        function isHidden(aid) {
          var i = 0;
          var hidden = false;
          $log.debug('3:');
          $log.debug(listHidden);
          angular.forEach(listHidden, function() {
            $log.debug('check!!')
            if (aid == listHidden[i].nid) {
              $log.debug('hide!!')
              hidden = true;
            }
            i++;
          });
          return hidden;
        }

        $log.debug('listGuides: ' + listGuides);
        return listGuides;
      }

      function getAnswerFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();