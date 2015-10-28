
export default class MainController {
  constructor() {  
    this.pageHeader = 'Angular with routing is operational!';
  }

  changeName() {
    this.pageHeader = 'Yep, we changed it';
  }
}