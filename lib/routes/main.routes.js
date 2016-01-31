routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: require('./../templates/main.html'),
      controller: 'MainController',
      controllerAs: 'main'
    })
     .state('choice', {
      url: '/choices',
      template: require('./../templates/choice.html'),
      controller: 'ChoiceController',
      controllerAs: 'ch'
        })
        
     .state('category', {
      url: '/categories',
      template: require('./../templates/category.html'),
      controller: 'CategoryController',
      controllerAs: 'cg'
        })
    .state('question', {
      url: '/questions',
      template: require('./../templates/question.html'),
      controller: 'QuestionController',
      controllerAs: 'q'
        })
     .state('exam', {
      url: '/exams',
      template: require('./../templates/exam.html'),
      controller: 'ExamController',
      controllerAs: 'e'
        });
}