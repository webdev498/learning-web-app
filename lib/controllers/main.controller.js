export default class MainController {
  constructor() {  
    this.pageHeader = 'Stats and other dashboard items here...';
  }

  changeName() {
    this.pageHeader = 'Yep, we changed it';
  }
}