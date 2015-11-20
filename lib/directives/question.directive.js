import angular from 'angular';

function question() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      questiontype: '=',
      question: '=',
      prototype: '=',
      questiontitle: '='
    },
    template: require('./../templates/question-directive.html')
  }
}

export default angular.module('directives.question', [])
  .directive('question', question)
  .name;