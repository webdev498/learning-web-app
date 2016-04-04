import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './../routes/main.routes';
import AccountController from './../controllers/account.controller';

export default angular.module('app.main', [uirouter])
  .config(routing)
  .controller('AccountController', AccountController)
  .name;