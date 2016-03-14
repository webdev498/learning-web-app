require('./../infoicon.png');
require('./../question.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import UserController from './../controllers/user.controller';

export default angular.module('app.user', [uirouter])
  .controller('UserController', UserController)
  .name;