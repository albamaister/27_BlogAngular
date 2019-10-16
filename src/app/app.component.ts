import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Blog de angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor( public _userService: UserService,
               private _categoryService: CategoryService ) {
    this.loadUser();
    this.url = global.url;
  }
  ngOnInit() {
    console.log('Web App cargada correctamente');
    this.getCategories();

  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

getCategories() {
  this._categoryService.getCategories().subscribe(
      response => {
        if ( response.status === 'success' ) {
            this.categories = response.categories;
            // console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
  );
}


}
