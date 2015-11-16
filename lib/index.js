'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import main from './modules/main.module';
import question from './modules/question.module';
import exam from './modules/exam.module';
import questionDirective from './directives/question.directive';

import api from './services/api.service';

angular.module('cgiSheApp', [uirouter,main,question,exam,api,questionDirective])
  .config(routing);