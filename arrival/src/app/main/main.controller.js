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
  function MainController($rootScope, $log, $timeout, introService, questionsService, answersService, disclaimerService) {
    var vm = this;

    vm.inProgress = false;
    vm.showQuestion = false;
    vm.showAnswers = false;
    vm.showInfo = false;
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
    vm.showEmailModal = false;
    vm.toggleEmailModal = function() {
      vm.showEmailModal = !vm.showEmailModal;
    }

    start();

    function start() {
      countQuestions();
      vm.qid = 1;
      getIntro();
      getAnswerIntro();
      getQuestion();
      getDisclaimer();
    }

    function next(i) {
      vm.showQuestion = false;
      vm.showInfo = false;
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
      /*vm.selection = '';
      vm.hideQuestion = '';
      vm.answers = '';
      vm.showAnswers = false;
      start();*/
      location.reload();
    }

    function countQuestions() {
      questionsService.getQuestion('all').then(function(data) {
        vm.questionCount = data.length;
        //$log.debug('Number of questions: ' + vm.questionCount);
      });
    }

    function getQuestion() {
      questionsService.getQuestion(vm.qid).then(function(data) {
        if (data[0].hide != '' && vm.selection != '') { //check if there might be something to hide
          vm.hideQuestion = data[0].hide.split('||');
          for (var i = 0; i < vm.hideQuestion.length; i++) {
            if (vm.selection.split(',').indexOf(vm.hideQuestion[i]) > -1) { //if the question needs to be hidden...
              next(0); //...move to next question and set answer value to 0
            }
          }
        }
        $timeout(function() {
          displayQuestion();
        }, 500);
        vm.options = data[0].options.split('||');
        vm.optionIds = data[0].option_ids.split('||');
        vm.question = data[0].question;
        vm.info = data[0].info;
      });
    }

    function displayQuestion() {
      vm.showQuestion = true;
    }

    function getAnswer() {
      vm.showAnswers = true;
      $rootScope.selection = vm.selection;
      answersService.getAnswer(vm.selection).then(function(data) {
        vm.answers = data;
      });
    }

    function getAnswerIntro() {
      answersService.getAnswerIntro().then(function(data) {
        vm.answerintro = data[0];
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
