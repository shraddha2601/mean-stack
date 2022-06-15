import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import {Post} from './post.model'

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts : Post [] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient) {}

  getPosts(){
    this.http.get<{message : string , posts : Post[]}>('http://localhost:4000/api/posts')
    .subscribe((postData)=>{
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListner(){
    return this.postUpdated.asObservable();
  }

  addPost(id : string, title:string, content: string){
    const post : Post = { id : id , title:title, content: content};
    this.http.post<{message : string}>('http://localhost:4000/api/posts' , post)
      .subscribe((responseData) =>{
        console.log(responseData.message);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      })
  }
}


