(function() {
  'use strict';

  describe('service answers', function() {
    var answers;
    var $httpBackend;
    var $log;

    beforeEach(module('arrival'));
    beforeEach(inject(function(_answers_, _$httpBackend_, _$log_) {
      answers = _answers_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;
    }));

    it('should be registered', function() {
      expect(answers).not.toEqual(null);
    });

    describe('apiHost variable', function() {
      it('should exist', function() {
        expect(answers.apiHost).not.toEqual(null);
      });
    });

    describe('getanswers function', function() {
      it('should exist', function() {
        expect(answers.getanswers).not.toEqual(null);
      });

      it('should return data', function() {
        $httpBackend.when('GET',  answers.apiHost + '/all').respond(200, [{pprt: 'value'}]);
        var data;
        answers.getanswers(1).then(function(fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      it('should log a error', function() {
        $httpBackend.when('GET',  answers.apiHost + '/all').respond(500);
        answers.getanswers(1);
        $httpBackend.flush();
        expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
      });
    });
  });
})();