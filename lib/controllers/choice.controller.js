import bootbox from 'bootbox';
import angular from 'angular';
import _ from 'lodash';
import questionService from './../services/api.service';

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
        });
    } else {
      this.api.updateChoice(this.choice)
        .then(function (response) {
          instance._saveSuccessful();
        });
    }
  }
  
  init() {
    let instance = this;
    this.api.getChoices().then(function(collection) {
        instance.timeout(function() {
          instance.choices = collection;
          instance.choicesLoading = false;
        });
      });
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Choice saved successfully');
  }
}

ChoiceController.$inject = ['$timeout','api','notifications'];