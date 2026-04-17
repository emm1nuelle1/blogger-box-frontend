import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list';
import { AddPostComponent } from './components/add-post/add-post';
import { PostDetailComponent } from './components/post-detail/post-detail';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: AddPostComponent },
  { path: 'posts/:id', component: PostDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
