import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './../routes/main.routes';
import MainController from './../controllers/main.controller';

export default angular.module('app.main', [uirouter])
  .config(routing)
  .controller('MainController', MainController)
  .name;