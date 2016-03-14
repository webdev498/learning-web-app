import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';
import questionService from './../services/api.service';

export default class UserController {
constructor($timeout, api, notifications) {  
    this.api = api;
    this.timeout = $timeout;
    this.users = [];
    this.isEditing = false;
    this.user = null;
    this.usersLoading = true;
    this.notify = notifications;
    this.searchText = null;
    this.unfilteredUsers = [];
  }
  
  choiceSelect(selectedChoice) {
      this.choice = selectedChoice;
  }
  
  addUser() {
      let newUser = {
          first_name: null,
          last_name: null,
          email: null,
          active: true,
          id: null
      }
      
      this.users.splice(0,0,newUser);
      this.user = newUser;
  }
  
  cancel() {
      this.users.splice(0,1);
      this.unfilteredUsers = angular.copy(this.users);
      this.user = null;
  }
  
  save() {
    if (this.user.first_name.length == 0) {
      this.notify.showWarning('First Name is required');
      return;
    }
    
    if (this.user.last_name.length == 0) {
      this.notify.showWarning('Last Name is required');
      return;
    }
       
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
  
  textSearch() {
      let instance = this;
      this.user = null;
      if (this.searchText === null || this.searchText.length == 0) {
            this.users = angular.copy(this.unfilteredUsers);
        return;
      }
      
      let firstNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.first_name.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
      let lastNameMatches = _.filter(this.unfilteredUsers, function(o) {
                                return _.startsWith(o.last_name.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      this.choices = _.sortBy(_.uniqBy(_.union(firstNameMatches, lastNameMatches),'id',['first_name']));
  }
  
  init() {
    let instance = this;
    this.api.getUsers().then(function(collection) {
        instance.timeout(function() {
          instance.users = _.sortBy(collection, ['first_name']);
          instance.unfilteredUsers = angular.copy(instance.users);
          instance.usersLoading = false;
        });
      });
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('User saved successfully');
  }
}

UserController.$inject = ['$timeout','api','notifications'];