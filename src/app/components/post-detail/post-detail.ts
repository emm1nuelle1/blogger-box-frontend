import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../data/post';

@Component({
  standalone: false,
  selector: 'app-post-detail',
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css']
})
export class PostDetailComponent implements OnInit {

  post: Post | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getById(id).subscribe((post) => {
        this.post = post;
        this.loading = false;
        this.cdr.detectChanges();
      });
    } else {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
