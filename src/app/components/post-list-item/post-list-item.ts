import { Component, Input } from '@angular/core';
import { Post } from '../../data/post';

@Component({
  standalone: false,
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.html',
  styleUrls: ['./post-list-item.css']
})
export class PostListItemComponent {
  @Input() post!: Post;
}
