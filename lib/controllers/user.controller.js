import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';
import questionService from './../services/api.service';

export default class UserController {
constructor($timeout, api, notifications) {  
    this.api = api;
    this.dobOpen = false;
    this.timeout = $timeout;
    this.users = [];
    this.isEditing = false;
    this.nationalities = [];
    this.user = null;
    this.usersLoading = true;
    this.userProcessing = false;
    this.notify = notifications;
    this.searchText = null;
    this.unfilteredUsers = [];
  }
  
  userSelect(selectedUser) {
      this.user = selectedUser;
  }
  
  addUser() {
      let newUser = {
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          email: null,
          password: null,
          passwordConfirmation: null,
          gender: null,
          nationalityId: null,
          addresses: [],
          telephones: [],
          id: null
      }
      
      this.users.splice(0,0,newUser);
      this.user = newUser;
  }
  
  delete() {
      this.userProcessing = true;
      let instance = this;
      
      this.api.deleteUser(this.user.id)
        .then(function (response) {
          instance.users.splice(instance.users.indexOf(this.user), 1);
          instance.user = null;  
          instance._deleteSuccessful();
          instance.unfilteredUsers = angular.copy(instance.users);
        });
  }
  
  cancel() {
      this.users.splice(0,1);
      this.unfilteredUsers = angular.copy(this.users);
      this.user = null;
  }
  
  save() {
    if (this.user.firstName == null || this.user.firstName.length == 0) {
      this.notify.showWarning('First Name is required');
      return;
    }
    
    if (this.user.lastName == null || this.user.lastName.length == 0) {
      this.notify.showWarning('Last Name is required');
      return;
    }
    
    if (this.user.email == null || this.user.email.length == 0) {
      this.notify.showWarning('Last Name is required');
      return;
    }
    
    this.userProcessing = true;
       
    let instance = this;
    //send user object to server
    
    if (this.user.id === null) {
      this.api.createUser(this.user)
        .then(function (response) {
          //Set the ids from the server
          instance.user.id = response.id;   
          instance._saveSuccessful();
          instance.unfilteredUsers = angular.copy(instance.users);
        });
    } else {
      this.api.updateUser(this.user)
        .then(function (response) {
          instance._saveSuccessful();
        });
    }
  }
  
  userSearch() {
      let instance = this;
      this.user = null;
      if (this.searchText === null || this.searchText.length == 0) {
            this.users = angular.copy(this.unfilteredUsers);
        return;
      }
      
      let firstNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.firstName.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
      let lastNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.lastName.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      this.users = _.sortBy(_.uniqBy(_.union(firstNameMatches, lastNameMatches),'id',['firstName']));
  }
  
  init() {
    let instance = this;
    this.api.getUsers().then(function(collection) {
        instance.timeout(function() {
          instance.users = _.sortBy(collection, ['firstName']);
          instance.unfilteredUsers = angular.copy(instance.users);
          instance.usersLoading = false;
        });
      });
      
    this.api.getNationalities().then(function(collection) {
        instance.nationalities = collection;
    });   
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('User saved successfully');
    this.userProcessing = false;
  }
  
  _deleteSuccessful() {
      this.notify.showSuccess('User deleted');
      this.userProcessing = false;
  }
}

UserController.$inject = ['$timeout','api','notifications'];