import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public url;
  public posts: Array<Post>;
  public identity;
  public token;
  public user: User;

  constructor( private _postService: PostService, private _userService: UserService,
               private route: ActivatedRoute, private router: Router  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

   ngOnInit() {
    this.getProfile();

  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {

        if (response.status === 'success') {
          this.user = response.user;
          console.log(this.user);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  getPosts(userId) {
    this._userService.getPosts(userId).subscribe(
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

  getProfile() {
    // Sacar el id del post de la url
    this.route.params.subscribe( params => {
    let id = + params['id'];
    this.getPosts(id);
    this.getUser(id);
    
      });
  }

  deletePost(id) {

    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
        console.log('success');
      },
      error => {

        console.log(error);

      }
    );

  }

}
