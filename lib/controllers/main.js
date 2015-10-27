import angular from 'angular';

'use strict';

angular
	.module('cgiSheApp')
	.controller('MainController',MainController);
	
MainController.$inject = [];

function MainController() {
	var vm = this;
	
	vm.PageHeader = 'Angular, operational!';
}