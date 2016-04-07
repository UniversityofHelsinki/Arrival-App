(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('progressarea', progressarea);

  /** @ngInject */
  function progressarea() {
    return {
      templateUrl: 'app/components/progressarea/progressarea.html'
    };
  }

})();


