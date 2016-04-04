import bootbox from 'bootbox';
import angular from 'angular';
import loginService from './../services/api.service';

export default class LoginController {
  constructor(api, notifications) {  
    this.api = api;
    this.notify = notifications;
    
    this.username = null;
    this.password = null;
  }
  
  init() {
  }
 
  login() {
      
  }
}

LoginController.$inject = ['api','notifications'];
