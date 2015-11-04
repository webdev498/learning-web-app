export default class QuestionController {
  constructor() {  
    this.selected = null;
    this.questions = [];
    this.selectedType = '1';
  }
  
  addAnswer() {
    this.selected.question.answers.push({answer: '',correct: false});
  }
  
  correctClicked(index) {
    
  }
  
  typeChanged() {
    
  }
  
  questionSelect() {
    
  }
  
  saveQuestion() {
    
  }
  
  removeAnswer(index) {
    
  }
}