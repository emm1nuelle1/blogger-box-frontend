import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TopBarComponent } from './components/top-bar/top-bar';
import { PostListComponent } from './components/post-list/post-list';
import { PostListItemComponent } from './components/post-list-item/post-list-item';
import { AddPostComponent } from './components/add-post/add-post';

@NgModule({
  declarations: [
    App,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
