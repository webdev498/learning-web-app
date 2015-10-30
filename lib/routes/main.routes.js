routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: require('./../templates/main.html'),
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('question', {
      url: '/questions',
      template: require('./../templates/question.html'),
      controller: 'QuestionController',
      controllerAs: 'q'
        });
}