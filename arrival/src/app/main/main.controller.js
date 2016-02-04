(function() {
  'use strict';

  angular
    .module('arrival')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, questionsService) {
    var vm = this;

    vm.inProgress = false;
    vm.showAnswers = false;
    vm.questionCount;
    vm.start = start;
    vm.next = next;
    vm.reset = reset;
    vm.selection = '';

    start();

    function start() {
      vm.inProgress = true;
      countQuestions();
      vm.qid = 1;
      getQuestion();
    }

    function next(i) {
      vm.selection = vm.selection + vm.qid + ':' + i + ';';
      $log.debug('Selection: ' + vm.selection);
      if(vm.qid<vm.questionCount) {
        vm.qid++;
        getQuestion();
      } else {
        vm.showAnswers = true;
      }
    }

    function reset() {
      // reset
    }

    function countQuestions() {
      questionsService.getQuestion('all').then(function(data) {
        vm.questionCount = data.length;
        $log.debug('Number of questions: ' + vm.questionCount);
      });
    }

    function getQuestion() {
      questionsService.getQuestion(vm.qid).then(function(data) {
        vm.question = data[0].question;
        vm.options = data[0].options.split('||');
      });
    }
  }
})();
