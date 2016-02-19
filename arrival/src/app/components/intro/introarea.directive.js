(function() {
  'use strict';

  angular
    .module('arrival')
    .directive('introarea', introarea);

  /** @ngInject */
  function introarea() {
    return {
      templateUrl: 'app/components/introarea/introarea.html'
    };
  }

})();


