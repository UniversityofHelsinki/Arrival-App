(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('selectarea', selectarea);

  /** @ngInject */
  function selectarea() {
    return {
      templateUrl: 'app/components/selectarea/selectarea.html'
    };
  }

})();


