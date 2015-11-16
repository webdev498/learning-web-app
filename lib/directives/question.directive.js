import angular from 'angular';

function question() {
  return {
    restrict: 'E',
    scope: {
      name: '='
    },
    template: '<h1>Here is the question!</h1>'
  }
}

export default angular.module('directives.question', [])
  .directive('question', question)
  .name;