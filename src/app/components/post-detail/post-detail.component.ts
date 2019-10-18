import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor( private _postService: PostService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    // Sacar el id del post de la url
    this.route.params.subscribe( params => {
      let id = + params['id'];
      console.log(id);
      // Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if ( response.status === 'success' ) {
            this.post = response.post;
            console.log(this.post);
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
