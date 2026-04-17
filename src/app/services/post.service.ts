import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, PostFormValue } from '../data/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      catchError(this.handleError<Post[]>('getAll', []))
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`).pipe(
      catchError(this.handleError<Post>('getById'))
    );
  }

  create(post: PostFormValue): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post).pipe(
      catchError(this.handleError<Post>('create'))
    );
  }

  update(id: string, post: PostFormValue): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}/${id}`, post).pipe(
      catchError(this.handleError<Post>('update'))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/${id}`).pipe(
      catchError(this.handleError<boolean>('delete', false))
    );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
