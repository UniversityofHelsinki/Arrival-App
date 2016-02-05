(function() {
  'use strict';

  angular
    .module('arrival')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, questionsService, answersService) {
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
      if(vm.selection != '') {
        vm.selection = vm.selection + ',';
      }
      vm.selection = vm.selection + i;
      $log.debug('Selection: ' + vm.selection);
      if(vm.qid<vm.questionCount) {
        vm.qid++;
        getQuestion();
      } else {
        getAnswer();
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
        vm.optionIds = data[0].option_ids.split('||');
      });
    }

    function getAnswer() {
      vm.showAnswers = true;
      answersService.getAnswer(vm.selection).then(function(data) {
        vm.header = data[0].header;
        vm.answer = data[0].answer;
      });
    }
  }
})();
