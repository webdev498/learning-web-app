import angular from 'angular';

class Auth {
    constructor() {
        
    }
    
    loggedIn() {
        return true;
        /*let userToken = 'userToken';
        
        if (!localStorage.getItem(userToken))
            return false;
            
        let token = localStorage.getItem(userToken);    */
    }
}

export default angular.module('services.auth', [])
  .service('auth', Auth)
  .name;