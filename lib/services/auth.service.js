import angular from 'angular';

class Auth {
    constructor() {}
    
    loggedIn() {
        return true;
    }
}

export default angular.module('services.auth', [])
  .service('auth', Auth)
  .name;