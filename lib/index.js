'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import main from './modules/main.module';
import question from './modules/question.module';
import exam from './modules/exam.module';

angular.module('cgiSheApp', [uirouter,main,question,exam])
  .config(routing);