'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import main from './modules/main.module';
import user from './modules/user.module';
import exam from './modules/exam.module';
import choice from './modules/choice.module';
import category from './modules/category.module';
require('ng-notifications-bar');

import api from './services/api.service';

angular.module('cgiSheApp', [uirouter,main,user,exam,choice,category,
                    api,'ngNotificationsBar'])
  .config(routing);