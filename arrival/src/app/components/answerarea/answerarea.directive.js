(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('answerarea', answerarea);

  /** @ngInject */
  function answerarea() {
    return {
      templateUrl: 'app/components/answerarea/answerarea.html',
      controller: function ($scope, $http) {
        $scope.sendSubmitter = function () {
          if ($scope.email && $scope.email.length > 0) {
            var data = {
              email: $scope.email,
              selection: $scope.selection
            };
            $http.post('/mailer', data);
          }
        }
      }
    };
  }

})();


