routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: require('./../templates/main.html'),
      controller: 'MainController',
      controllerAs: 'm'
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
    .state('user', {
      url: '/users',
      template: require('./../templates/user.html'),
      controller: 'UserController',
      controllerAs: 'u'
        })
     .state('exam', {
      url: '/exams',
      template: require('./../templates/exam.html'),
      controller: 'ExamController',
      controllerAs: 'e'
        });
}