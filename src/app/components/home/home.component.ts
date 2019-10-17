import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public url;
  public posts: Array<Post>;

  constructor( private _postService: PostService ) {
    this.page_title = 'Home';
    this.url = global.url;
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

}
