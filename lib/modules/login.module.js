import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './../routes/main.routes';
import LoginController from './../controllers/login.controller';

export default angular.module('app.main', [uirouter])
  .config(routing)
  .controller('LoginController', LoginController)
  .name;