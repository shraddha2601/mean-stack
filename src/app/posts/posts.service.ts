import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts : Post [] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http : HttpClient) {}

  getPosts(){
    this.http.get<{message : string , posts : any}>('http://localhost:4000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: any; content: any; _id: any; }) =>{
        return {
          title : post.title,
          content : post.content,
          id: post._id,
        };
      })
    }))
    .subscribe(( transformedPosts)=>{
      this.posts = transformedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListner(){
    return this.postUpdated.asObservable();
  }

  getPost(id:string){
    return {...this.posts.find(p => p.id === id)};
  }
  addPost(id : string, title:string, content: string){
    const post : Post = { id : id , title:title, content: content};
    this.http.post<{message : string, postId : string}>('http://localhost:4000/api/posts' , post)
      .subscribe((responseData) =>{
        const id = responseData.postId;
        post.id = id;
        // console.log(post);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      })
  }

  deletePost(postId : string){
    this.http.delete("http://localhost:4000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts= this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts])
    })
  }
}


