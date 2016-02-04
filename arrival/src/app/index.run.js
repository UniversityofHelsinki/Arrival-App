(function() {
  'use strict';

  angular
    .module('arrival')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
