import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';

@Component({
  standalone: false,
  selector: 'app-add-post',
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css']
})
export class AddPostComponent implements OnInit {

  title: string = '';
  content: string = '';
  categoryId: string = '';
  categories: Category[] = [];

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.title && this.content && this.categoryId) {
      this.postService.create({
        title: this.title,
        content: this.content,
        categoryId: this.categoryId
      }).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
