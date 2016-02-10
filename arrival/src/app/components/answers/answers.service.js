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
          });
      }

      function getAnswerComplete(response) {
        var i = 0;
        if(listHidden.length > 0) {
          angular.forEach(response.data, function() {
            if (!isHidden(response.data[i].nid)) {
              listGuides.push(response.data[i]);
            }
            i++;
          });
        } else {
          listGuides = response.data;
        }

        i=0;
        angular.forEach(listGuides, function() {
          if(listGuides[i-1] && !isNewCategory(i)) {
            listGuides[i].newcategory = false;
          } else {
            listGuides[i].newcategory = true;
          }
          i++;
        });

        function isHidden(aid) {
          var i = 0;
          var isHidden = false;
          angular.forEach(listHidden, function() {
            if (aid == listHidden[i].nid) {
              isHidden = true;
            }
            i++;
          });
          return isHidden;
        }

        function isNewCategory(ai) {
          var isNew = true;
          if (listGuides[ai-1].header == listGuides[ai].header) {
            isNew = false;
          }
          return isNew;
        }

        return listGuides;
      }

      function getAnswerFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();