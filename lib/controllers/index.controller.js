import angular from 'angular';

export default class IndexController {
  constructor($location) {  
    this.userMessage = '';
    this.location = $location;
  }

  init() {
      
  }
  
  loggedIn() {
    return localStorage['userToken'] != null;
  }
  
  logout() {
    localStorage.removeItem('userToken');
    this.location.path('/login');
  }
}

IndexController.$inject = ['$location'];