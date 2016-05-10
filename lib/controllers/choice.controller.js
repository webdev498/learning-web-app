import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';
import questionService from './../services/api.service';
import authService from './../services/auth.service';

export default class ChoiceController {
  constructor($timeout, api, notifications) {  
    this.api = api;
    this.timeout = $timeout;
    this.choices = [];
    this.isEditing = false;
    this.choice = null;
    this.choicesLoading = true;
    this.phases = [{number: 1}, {number: 2}, {number: 3}];
    this.notify = notifications;
    this.searchText = null;
    this.unfilteredChoices = [];
  }
  
  choiceSelect(selectedChoice) {
      this.choice = selectedChoice;
  }
  
  addChoice() {
      let newChoice = {
          text: 'New Choice',
          translation: 'translation',
          phase: 1,
          active: true,
          id: null
      }
      
      this.choices.splice(0,0,newChoice);
      this.choice = newChoice;
  }
  
  cancel() {
      this.choices.splice(0,1);
      this.unfilteredChoices = angular.copy(this.choices);
      this.choice = null;
  }
  
  save() {
    if (this.choice.text.length == 0) {
      this.notify.showWarning('Choice is required');
      return;
    }
    
    if (this.choice.translation.length == 0) {
      this.notify.showWarning('Translation is required');
      return;
    }
       
    let instance = this;
    //send choice object to server
    
    if (this.choice.id === null) {
      this.api.createChoice(this.choice)
        .then(function (response) {
          //Set the ids from the server
          instance.choice.id = response.id;   
          instance._saveSuccessful();
          instance.unfilteredChoices = angular.copy(instance.choices);
        });
    } else {
      this.api.updateChoice(this.choice)
        .then(function (response) {
          instance._saveSuccessful();
        });
    }
  }
  
  textSearch() {
      let instance = this;
      this.choice = null;
      if (this.searchText === null || this.searchText.length == 0) {
            this.choices = angular.copy(this.unfilteredChoices);
        return;
      }
      
      let textMatches = _.filter(this.unfilteredChoices, function(o) {
                                return _.startsWith(o.text.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
      let translationMatches = _.filter(this.unfilteredChoices, function(o) {
                                return _.startsWith(o.translation.toLowerCase(), 
                                    instance.searchText.toLowerCase());
                            });
                            
      this.choices = _.sortBy(_.uniqBy(_.union(textMatches, translationMatches),'id',['text']));
  }
  
  init() {
      if (!authService.loggedIn)
        return;
        
    let instance = this;
    this.api.getChoices().then(function(collection) {
        instance.timeout(function() {
          instance.choices = _.sortBy(collection, ['text']);
          instance.unfilteredChoices = angular.copy(instance.choices);
          instance.choicesLoading = false;
        });
      });
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Choice saved successfully');
  }
}

ChoiceController.$inject = ['$timeout','api','notifications'];