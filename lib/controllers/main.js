import angular from 'angular';

(function () {
	'use strict';
	
	angular
		.module('cgiSheApp')
		.controller('MainController',MainController);
		
	MainController.$inject = [];
	
	function MainController() {
		var vm = this;
		
	}
})();