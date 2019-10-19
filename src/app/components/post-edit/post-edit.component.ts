import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post.model';
import { global } from '../../services/global';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public post: Post;
    public categories;
    public url;
    public status;

    public froala_options: Object = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
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
                 private route: ActivatedRoute,
                 private router: Router,
                 private _postService: PostService  ) {
      this.page_title = 'Editar entrada';
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = global.url;
     }

    ngOnInit() {
      this.getCategories();
      this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
      this.getPost();
    }

    onSubmit(form) {
      this._postService.update(this.token, this.post, this.post.id).subscribe(
        response => {
          if (response.status === 'success') {
            this.status = 'success';
            // this.post = response.post;
            // Redirigir a la pagina del post
            this.router.navigate(['/entrada', this.post.id]);
          } else {
            this.status = 'error';
            console.log('error');
          }

        },
        error => {
          console.log(error);
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

    getPost() {
      // Sacar el id del post de la url
      this.route.params.subscribe( params => {
        let id = + params['id'];
        // Peticion ajax para sacar los datos del post
        this._postService.getPost(id).subscribe(
          response => {
            if ( response.status === 'success' ) {
              this.post = response.post;
            } else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.log(error);
            this.router.navigate(['/home']);
          }
        );
      });

    }
  }

