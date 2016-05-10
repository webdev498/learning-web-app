import bootbox from 'bootbox';
import angular from 'angular';
import categoryService from './../services/api.service';
import authService from './../services/auth.service';

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
    if (!authService.loggedIn)
        return;
           
    let instance = this;
    this.api.getCategories().then(function(collection) {
        instance.timeout(function() {
          instance.categories = _.sortBy(collection, ['name']);
          instance.categoriesLoading = false;
        });
      });
  }
  
  cancel() {
      this.categories.splice(0,1);
      this.selectedCategory = null;
  }
 
  createCategory() {
      this.categories.splice(0,0,this._categoryObject());
      this.selectedCategory = this.categories[0];
  }
  
  _categoryObject() {
      return {
          name: 'Category',
          id: null
      }
  }
  
  saveCategory() {
    let instance = this;
    
    if (instance.selectedCategory.id === null) {
        this.api.createCategory(instance.selectedCategory).then(function(response) {
            instance.selectedCategory.id = response.id;
            instance._saveSuccessful();
        });
    }
    else {
        this.api.updateCategory(instance.selectedCategory).then(function(response) {
            instance._saveSuccessful();
        });
    }
  }
  
  deleteCategory() {
      let instance = this;
      this.api.deleteCategory(this.selectedCategory).then(function (response) {
         instance.notify.showSuccess('Category Archived');
         instance.selectedCategory = null; 
      });
  }
  
  saveDisabled() {
      if (this.selectedCategory !== null)
        return this.selectedCategory.name.length == 0;
      return false;
  }
  
  _saveSuccessful() {
    this.notify.showSuccess('Category saved successfully');
  }
}

CategoryController.$inject = ['$timeout','api','notifications'];
