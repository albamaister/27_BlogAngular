import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public url;
  public posts: Array<Post>;
  public identity;
  public token;

  constructor( private _postService: PostService, private _userService: UserService ) {
    this.page_title = 'Home';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {

    this.getPosts();

  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {

        if (response.status === 'success') {
          this.posts = response.posts;
          console.log(this.posts);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id) {

    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
        console.log('success');
      },
      error => {

        console.log(error);

      }
    );

  }

}
