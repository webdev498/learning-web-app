import bootbox from 'bootbox';
import angular from 'angular';
import loginService from './../services/api.service';
import jwtDecode from 'jwt-decode';

export default class LoginController {
  constructor(api, notifications, $location) {  
    this.api = api;
    this.notify = notifications;
    this.authSubmitted = false;
    this.location = $location;
    
    this.username = null;
    this.password = null;
  }
  
  init() {
  }
  
  facebook() {
    
  }
  
  google() {
    
  }
 
  login() {
    let instance = this;
    instance.authSubmitted = true;
    let payload = {email: this.username, password: this.password};
      this.api.userLogin(payload)
        .then(function (response) {
          if (response != null) {
            localStorage.setItem('userToken',JSON.stringify(response));
            let userInfo = jwtDecode(response.token);
            loginService.getUser(userInfo.id).then(function(response) {
              localStorage.setItem('userInfo',JSON.stringify(response));
              instance.location.path('/');
            });
          }
          
          instance.authSubmitted = false;
        }, function (error) {
          instance.authSubmitted = false;
        });
  }
}

LoginController.$inject = ['api','notifications','$location'];
