routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: require('./../templates/main.html'),
      controller: 'MainController',
      controllerAs: 'main'
    });
}