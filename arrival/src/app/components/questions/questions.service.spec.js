(function() {
  'use strict';

  describe('service questions', function() {
    var questions;
    var $httpBackend;
    var $log;

    beforeEach(module('arrival'));
    beforeEach(inject(function(_questions_, _$httpBackend_, _$log_) {
      questions = _questions_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(questions).not.toEqual(null);
    });

    describe('apiHost variable', function() {
      it('should exist', function() {
        expect(questions.apiHost).not.toEqual(null);
      });
    });

    describe('getQuestions function', function() {
      it('should exist', function() {
        expect(questions.getQuestions).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  questions.apiHost + '/all').respond(200, [{pprt: 'value'}]);
        var data;
        questions.getQuestions(1).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should log a error', function() {
        $httpBackend.when('GET',  questions.apiHost + '/all').respond(500);
        questions.getQuestions(1);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });
})();