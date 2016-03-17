(function() {
  'use strict';

  angular
    .module('arrival')
    .controller('MainController', MainController)
    .filter('addTargetBlank', function(){
      return function(x) {
        var tree = angular.element('<div>'+x+'</div>');
        tree.find('a').attr('target', '_blank');
        return angular.element('<div>').append(tree).html();
      }
    });

  /** @ngInject */
  function MainController($log, introService, questionsService, answersService, disclaimerService) {
    var vm = this;

    vm.inProgress = false;
    vm.showAnswers = false;
    vm.questionCount;
    vm.start = start;
    vm.next = next;
    vm.reset = reset;
    vm.selection = '';
    vm.hideQuestion = '';
    vm.showDisclaimer = false;
    vm.toggleDisclaimer = function() {
      vm.showDisclaimer = !vm.showDisclaimer;
    }

    start();

    function start() {
      countQuestions();
      vm.qid = 1;
      getIntro();
      getQuestion();
      getDisclaimer();
    }

    function next(i) {
      if(vm.selection != '') {
        vm.selection = vm.selection + ',';
      }
      vm.selection = vm.selection + i;
      //$log.debug('Selection: ' + vm.selection);
      if(vm.qid<vm.questionCount) {
        vm.qid++;
        getQuestion();
        vm.inProgress = true;
      } else {
        getAnswer();
      }
    }

    function reset() {
      vm.inProgress = false;
      vm.showAnswers = false;
      vm.selection = '';
      start();
    }

    function countQuestions() {
      questionsService.getQuestion('all').then(function(data) {
        vm.questionCount = data.length;
        //$log.debug('Number of questions: ' + vm.questionCount);
      });
    }

    function getQuestion() {
      questionsService.getQuestion(vm.qid).then(function(data) {
        vm.question = data[0].question;
        vm.info = data[0].info;
        vm.options = data[0].options.split('||');
        vm.optionIds = data[0].option_ids.split('||');
        if (data[0].hide != '' && vm.selection != '') { //check if there might be something to hide
          vm.hideQuestion = data[0].hide.split(',');
          for (var i = 0; i < vm.hideQuestion.length; i++) {
            if (vm.selection.split(',').indexOf(vm.hideQuestion[i]) > -1) { //if the question needs to be hidden...
              next(0); //...move to next question and set answer value to 0
            }
          }
        }
      });
    }

    function getAnswer() {
      vm.showAnswers = true;
      answersService.getAnswer(vm.selection).then(function(data) {
        vm.answers = data;
      });
    }

    function getDisclaimer() {
      disclaimerService.getDisclaimer().then(function(data) {
        vm.disclaimer = data[0].body;
      });
    }

    function getIntro() {
      introService.getIntro().then(function(data) {
        vm.intro = data[0];
      });
    }
  }
})();
