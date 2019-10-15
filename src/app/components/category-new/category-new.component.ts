import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';



@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor( private _route: ActivatedRoute,
               private _router: Router,
               private _userService: UserService,
               public _categoryService: CategoryService
              ) {
    this.page_title = 'Crear nueva categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
   }

  ngOnInit() {
  }

  onSubmit(form) {
    this._categoryService.create(this.token,this.category).subscribe(
            response => {
              if (response.status === 'success') {
                this.category = response.category;
                this.status = 'success';

                this._router.navigate(['/home']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
    );
  }

}
