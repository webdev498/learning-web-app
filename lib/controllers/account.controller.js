import bootbox from 'bootbox';
import angular from 'angular';
import accountService from './../services/api.service';

export default class AccountController {
  constructor(api, notifications) {  
    this.api = api;
    this.notify = notifications;
    this.account = null;
  }
  
  init() {
  }
  
  save() {
      
  }
 
}

AccountController.$inject = ['api','notifications'];