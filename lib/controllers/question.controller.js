import bootbox from 'bootbox';
import angular from 'angular';
import questionService from './../services/api.service';

export default class QuestionController {
  constructor($timeout, api, notifications) {  
    this.api = api;
    this.timeout = $timeout;
    this.questions = [];
    this.selectedType = 'multipleChoice';
    this.isEditing = false;
    this.question = {};
    this.questionsLoading = true;
    this.notify = notifications;
  }
  
  addQuestion() {
    this.isEditing = true;
    var newQuestion = this._newQuestionObject();
    this.questions.push(newQuestion);
    this.question = newQuestion;
  }
  
  addAnswer() {
    let instance = this;
    this.timeout(function() {
        instance.question.choices.push(instance._newAnswerObject());
    });
  }
  
  correctClicked(index) {
    //If a correct answer is checked, uncheck all other answers
    if (this.question.choices[index].correct &&
          this.selectedType == 'multipleChoice') {
      for (let i = 0; i < this.question.choices.length; i++) {
        if (i == index)
          continue;
          
          this.question.choices[i].correct = false;
      }
    }
  }
  
  deleteQuestion() {
    bootbox.confirm('Are you sure you want to delete this question?', function (result) {
      if (!result)
        return;
       
        //Call delete endpoint 
    });
  }
  
  typeChanged() {
    
  }
  
  questionSelect(index) {
      this.question = this.questions[index];
      this.isEditing = true;
  }
  
  saveDisabled() {
    return false;
  }
  
  saveQuestion() {
    if (this.question.title.length == 0) {
      this.notify.showWarning('Title is required');
      return;
    }
    
    if (this.question.text.length == 0) {
      this.notify.showWarning('Questions text is required');
      return;
    }
    
    let instance = this;
    
    for (let i = 0; i < this.question.choices.length; i++) {
      if (this.question.choices[i].correct) {
        this.question.correctChoice = angular.copy(this.question.choices[i]);
        break;
      }
    }
    
    //send question object to server
    let serverQuestion = angular.copy(this.question);
    for (let i = 0; i < serverQuestion.choices.length; i++) {
      delete serverQuestion.choices[i].correct;  
    }
    
    if (this.question.id === null) {
      this.api.createQuestion(this.question)
        .then(function (response) {
          //Set the ids from the server
          instance.question.id = response.id;
          instance.question.createdAt = response.createdAt;
          instance.question.updatedAt = response.updatedAt;
          
          for (let i = 0; i < response.choices.length; i++) {
            instance.question.choices[i].id = response.choices[i].id; 
            instance.question.choices[i].createdAt = response.choices[i].createdAt; 
            instance.question.choices[i].updatedAt = response.choices[i].updatedAt;  
          }
          
          instance._saveSuccessful();
        });
    } else {
      this.api.updateQuestion(this.question)
        .then(function (response) {
          instance._saveSuccessful();
        });
    }
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Question saved successfully');
  }
  
  removeAnswer(index) {
    let instance = this;
    this.timeout(function() {
      instance.question.choices.splice(index,1);
    });
  }
  
  _newAnswerObject() {
    return {
      text: '',
      selected: false,
      id: null,
      correct: false,
      createdAt: null,
      updatedAt: null
    }
  }
  
  _newQuestionObject() {
    return {
      type:  this.selectedType,
      id: null,
      version: null,
      title: '',
      readOnly: false,
      instructions: '',
      adminComments: '',
      text: '',
      correctChoice: null,
      phase: '1',
      choices: [],
      createdAt: null,
      updatedAt: null
    }
  }
  
  init() {
    let instance = this;
    this.api.getQuestions().then(function(collection) {
        instance.timeout(function() {
          instance.questions = collection;
          instance.questionsLoading = false;
        });
      });
  }
}

QuestionController.$inject = ['$timeout','api','notifications'];