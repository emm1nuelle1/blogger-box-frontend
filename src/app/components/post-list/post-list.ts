import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../data/post';

@Component({
  standalone: false,
  selector: 'app-post-list',
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
      this.cdr.detectChanges();
    });
  }
}
