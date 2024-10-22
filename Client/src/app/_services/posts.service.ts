import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../_models/post';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  posts = signal<Post[]>([]);

  getPosts() {
    return this.http.get<Post[]>(
      this.baseUrl + 'posts').subscribe({
        next: posts => this.posts.set(posts),
      });
  }

  getPost(username: string) {
    const post = this.posts().find(x => x.userName === username);
    if(post !== undefined) return of(post);

    return this.http.get<Post>(
      this.baseUrl + 'posts/' + username);
  }

  getPostByUsername(username: string) {
    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${username}`);
  }
}