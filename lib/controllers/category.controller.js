import bootbox from 'bootbox';
import angular from 'angular';
import categoryService from './../services/api.service';

export default class CategoryController {
  constructor($timeout, api, notifications) {  
    this.api = api;
    this.timeout = $timeout;
    this.notify = notifications;
    
    this.categories = [];
    this.selectedCategory = null;
    this.categoriesLoading = true;
  }
  
  init() {
      
  }
  
  createCategory() {
      this.categories.splice(0,0,this._categoryObject());
      this.selectedCategory = this.categories[0];
  }
  
  _categoryObject() {
      return {
          name: 'Category',
          active: true,
          parentChoice: null
      }
  }
  
  saveCategory() {
      
  }
  
  saveDisabled() {
      return this.selectedCategory.name.length == 0;
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Category saved successfully');
  }
}

CategoryController.$inject = ['$timeout','api','notifications'];