'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import account from './modules/account.module';
import choice from './modules/choice.module';
import category from './modules/category.module';
import exam from './modules/exam.module';
import login from './modules/login.module';
import main from './modules/main.module';
import user from './modules/user.module';

//import phDirective from './directives/phoneinput.directive';
//import tel from './filters/tel.filter';

require('ng-notifications-bar');

import api from './services/api.service';
import auth from './services/auth.service';

angular.module('cgiSheApp', [uirouter,account,login,main,user,exam,choice,category,
                    api,auth,'ngNotificationsBar'])
  .config(routing)
  .run(function($rootScope, auth, $state) {

  // Listen to '$locationChangeSuccess', not '$stateChangeStart'
  $rootScope.$on('$locationChangeSuccess', function() {
      if (!auth.loggedIn()) {
        // redirect to login if auth fails
        $state.go('login')
      }
  })
})