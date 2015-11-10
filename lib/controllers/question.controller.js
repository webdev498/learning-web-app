var uuid = require('node-uuid');

export default class QuestionController {
  constructor($timeout) {  
    this.timeout = $timeout;
    this.questions = [];
    this.selectedType = 'multipleChoice';
    this.isEditing = false;
    this.question = {};
  }
  
  addQuestion() {
    this.isEditing = true;
    this.question = this._newQuestionObject();
  }
  
  addAnswer() {
    let instance = this;
    this.timeout(function() {
        instance.question.answers.push(instance._newAnswerObject());
    });
  }
  
  correctClicked(index) {
    //If a correct answer is checked, uncheck all other answers
    if (this.question.answers[index].correct &&
          this.selectedType == 'multipleChoice') {
      for (let i = 0; i < this.question.answers.length; i++) {
        if (i == index)
          continue;
          
          this.question.answers[i].correct = false;
      }
    }
  }
  
  typeChanged() {
    
  }
  
  questionSelect() {
    
  }
  
  saveDisabled() {
    return false;
  }
  
  saveQuestion() {
    
  }
  
  removeAnswer(index) {
    let instance = this;
    this.timeout(function() {
      instance.question.answers.splice(index,1);
    });
  }
  
  _newAnswerObject() {
    return {
      answer: '',
      selected: false,
      id: uuid.v1(),
      correct: false
    }
  }
  
  _newQuestionObject() {
    return {
      questionType:  this.selectedType,
      questionId: uuid.v1(),
      title: '',
      readOnly: false,
      instructions: '',
      adminComments: '',
      question: '',
      correctChoice: null,
      answers: []
    }
  }
}