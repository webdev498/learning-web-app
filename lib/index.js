'use strict';

require('./base.less');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import main from './modules/main.module';

angular.module('cgiSheApp', [uirouter,main])
  .config(routing);