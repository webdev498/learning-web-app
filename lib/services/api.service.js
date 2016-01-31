import angular from 'angular';
import bootbox from 'bootbox';

class API {
  constructor($http, notifications) {
    this.rootUrl = 'http://localhost:8181'
    this.rootQuestionUrl = this.rootUrl + '/Questions';
    this.rootExamUrl = this.rootUrl + '/Examinations';
    this.rootChoiceUrl = this.rootUrl + '/Choices';
    this.rootCategoryUrl = this.rootUrl + '/Categories';
    this.http = $http;
    this.notify = notifications;
  }
  
    getChoices() {
        let instance = this;
        return this.http.get(this.rootChoiceUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the choices');        
            });
    }
    
    createChoice(choice) {
        let instance = this;
        return this.http.post(this.rootChoiceUrl,choice)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the choice');  
            });
    }
  
  updateChoice(choice) {
    let instance = this;
     return this.http.put(this.rootChoiceUrl + '/' + choice.id)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the choice');        
        });
   }
   
    getCategories() {
        let instance = this;
        return this.http.get(this.rootCategoryUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the categories');        
            });
    }  
    
    createCategory(category) {
        let instance = this;
        return this.http.post(this.rootCategoryUrl,category)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the category');  
            });
    } 
    
   updateCategory(category) {
    let instance = this;
     return this.http.put(this.rootCategoryUrl + '/' + category.id)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the category');        
        });
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