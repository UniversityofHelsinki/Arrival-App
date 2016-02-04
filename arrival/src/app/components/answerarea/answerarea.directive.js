(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('answerarea', answerarea);

  /** @ngInject */
  function answerarea() {
    return {
      templateUrl: 'app/components/answerarea/answerarea.html'
    };
  }

})();


