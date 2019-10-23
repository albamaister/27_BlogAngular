import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;

    // Usamos el decorador Output
  @Output() eliminar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deletePost(postId){
    // Usamos el método emit
    this.eliminar.emit(postId);
}


}
