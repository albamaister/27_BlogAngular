import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string;
  public identity;
  public token;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private _userService: UserService,
               private _postService: PostService,
               private _categoryService: CategoryService ) {
                this.url = global.url;
                this.identity = this._userService.getIdentity();
                this.token = this._userService.getToken();

              }

  ngOnInit() {
    this.getPostsBycategory();
  }

  getPostsBycategory() {
    this.route.params.subscribe( params => {
      let id = + params['id'];
      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status === 'success') {
            // console.log(response);
            this.category = response.category;
            this._categoryService.getCategoryPost(id).subscribe(
              response => {
                if (response.status === 'success') {
                  this.posts = response.posts;
                } else {
                  this.router.navigate(['/home']);
                }
              },
              error => {
                console.log(error);
              }
            );
          } else {
            this.router.navigate(['/home']);
          }

        },
        error => {
          console.log(error);
        }
      );
    });
  }


  deletePost(id) {

    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsBycategory();
        console.log('success');
      },
      error => {

        console.log(error);

      }
    );

  }

}
