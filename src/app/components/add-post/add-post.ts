import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';
import { PostFormValue } from '../../data/post';

@Component({
  standalone: false,
  selector: 'app-add-post',
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  categories: Category[] = [];
  postId: string | null = null;
  isEditMode: boolean = false;
  isSubmitting: boolean = false;

  private readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });

    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditMode = true;
      this.postService.getById(this.postId).subscribe((post) => {
        if (post) {
          this.postForm.patchValue({
            title: post.title,
            content: post.content,
            categoryId: post.category?.id ?? ''
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      this.toast.fire({
        icon: 'error',
        title: 'Please review your post'
      });
      return;
    }

    const postData = this.postForm.getRawValue() as PostFormValue;
    this.isSubmitting = true;

    if (this.isEditMode && this.postId) {
      this.postService.update(this.postId, postData).subscribe((post) => {
        this.handleSubmitResponse(!!post);
      });
    } else {
      this.postService.create(postData).subscribe((post) => {
        this.handleSubmitResponse(!!post);
      });
    }
  }

  get title(): FormControl {
    return this.postForm.get('title') as FormControl;
  }

  get categoryId(): FormControl {
    return this.postForm.get('categoryId') as FormControl;
  }

  get content(): FormControl {
    return this.postForm.get('content') as FormControl;
  }

  private handleSubmitResponse(isSuccess: boolean): void {
    this.isSubmitting = false;

    if (!isSuccess) {
      this.toast.fire({
        icon: 'error',
        title: 'Please review your post'
      });
      return;
    }

    this.toast.fire({
      icon: 'success',
      title: 'Post Submitted Successfully'
    });
    this.router.navigate(['/']);
  }
}
