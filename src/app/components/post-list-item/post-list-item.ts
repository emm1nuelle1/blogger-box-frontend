import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../data/post';

@Component({
  standalone: false,
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.html',
  styleUrls: ['./post-list-item.css']
})
export class PostListItemComponent {
  @Input() post!: Post;
  @Output() deleteEvent = new EventEmitter<string>();

  onDelete(): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.deleteEvent.emit(this.post.id);
    }
  }
}
