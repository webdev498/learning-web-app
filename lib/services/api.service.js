import angular from 'angular';
import bootbox from 'bootbox';

class API {
  constructor($http, notifications) {
    this.rootUrl = 'http://localhost:8181'
    this.rootQuestionUrl = this.rootUrl + '/Questions'
    this.rootExamUrl = this.rootUrl + '/Examinations'
    this.http = $http;
    this.notify = notifications;
  }
  
  createQuestion(question) {
    let instance = this;
    return this.http.post(this.rootQuestionUrl,question)
       .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue creating the question');  
        });
  }

  getQuestions() {
    let instance = this;
    return this.http.get(this.rootQuestionUrl)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue retrieving the questions');        
        });
  }
  
  updateQuestion(question) {
    let instance = this;
     return this.http.put(this.rootQuestionUrl + '/' + question.id)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the question');        
        });
  }
}

API.$inject = ['$http','notifications'];

export default angular.module('services.api', [])
  .service('api', API)
  .name;