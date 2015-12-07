import angular from 'angular';
import bootbox from 'bootbox';

class API {
  constructor($http) {
    this.rootUrl = 'http://localhost:8181'
    this.rootQuestionUrl = this.rootUrl + '/Questions'
    this.rootExamUrl = this.rootUrl + '/Examinations'
    this.http = $http;
  }
  
  createQuestion(question) {
    return this.http.post(this.rootQuestionUrl,question)
       .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            bootbox.alert('There was an issue creating the question');  
        });
  }

  getQuestions() {
    return this.http.get(this.rootQuestionUrl)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            bootbox.alert('There was an issue retrieving the questions');        
        });
  }
}

API.$inject = ['$http'];

export default angular.module('services.api', [])
  .service('api', API)
  .name;