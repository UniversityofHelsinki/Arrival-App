(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('disclaimerarea', disclaimerarea);

  /** @ngInject */
  function disclaimerarea() {
    return {
      templateUrl: 'app/components/disclaimerarea/disclaimerarea.html'
    };
  }

})();


