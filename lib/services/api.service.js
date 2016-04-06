import angular from 'angular';
import bootbox from 'bootbox';

class API {
  constructor($http, notifications) {
    this.rootUrl = 'http://localhost:3000'
    this.rootExamUrl = this.rootUrl + '/examinations';
    this.rootChoiceUrl = this.rootUrl + '/choices';
    this.rootCategoryUrl = this.rootUrl + '/categories';
    this.rootUserUrl = this.rootUrl + '/users';
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
   
   /* Categories */
   
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
   
   deleteCategory(category) {
       let instance = this;
       return this.http.delete(this.rootCategoryUrl + '/' + category.id)
        .then(function(response) {
            return response;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue deleting the category');
        })
   }
   
   /* Users */
   createUser(user) {
        let instance = this;
        return this.http.post(this.rootUserUrl,user)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue creating the category');  
            });
   }
   
   deleteUser(id) {
        let instance = this;
        return this.http.delete(this.rootUserUrl + '/' + id)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue deleting the user');  
            });
   }
   
   getUsers() {
        let instance = this;
        return this.http.get(this.rootUserUrl)
        .then(function(response) {
            return response.data;
            }, function(error) {
                console.error(error);
                instance.notify.showError('There was an issue retrieving the users');        
            });     
   }
   
   updateUser(user) {
     let instance = this;
     return this.http.put(this.rootUserUrl + '/' + user.id)
      .then(function(response) {
          return response.data;
        }, function(error) {
            console.error(error);
            instance.notify.showError('There was an issue saving the user');        
        });
   }
   
}

API.$inject = ['$http','notifications'];

export default angular.module('services.api', [])
  .service('api', API)
  .name;