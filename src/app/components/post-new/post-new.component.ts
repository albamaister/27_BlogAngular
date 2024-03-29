import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post.model';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories;
  public url;
  public status;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png',
    maxSize: '50',
    uploadAPI:  {
      url: global.url + 'post/upload',
      headers: {
     'Authorization' : this._userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu imagen de post'
};

  constructor( private _userService: UserService,
               private _categoryService: CategoryService,
               private _route: ActivatedRoute,
               private _router: Router,
               private _postService: PostService  ) {
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
   }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    // console.log(this.post);
  }

  onSubmit(form) {
    this._postService.create(this.token, this.post).subscribe(
          response => {
            if (response.status === 'success') {
              this.post = response.post;
              this.status = 'success';
              this._router.navigate(['/home']);
            } else {
              this.status = 'error';

            }
          },
          error => {
            this.status = 'error';
          }
    );

  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
        response => {
          if ( response.status === 'success' ) {
            this.categories = response.categories;
            console.log(this.categories);
          }

        },
        error => {
          console.log(error);
        }
    );
  }

  imageUpload(datos) {
    let imagedata = JSON.parse(datos.response);
    this.post.image = imagedata.image;
  }

}
