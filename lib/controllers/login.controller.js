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
    let payload = {email: this.username, password: this.password};
      this.api.userLogin(payload)
        .then(function (response) {
          console.log(response);
          localStorage.setItem('userToken',JSON.stringify(response));
        }, function (error) {
          
        });
  }
}

LoginController.$inject = ['api','notifications'];
