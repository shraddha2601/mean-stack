import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { Post } from '../post.model'
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [

  //   {title : 'firstpost', content : 'this is about first posts'},
  //   {title : 'secondpost', content : 'this is about second posts'},
  //   {title : 'thirdpost', content : 'this is about third posts'},
  // ];
  posts : Post[] = [];
  private postSub: Subscription = new Subscription;
  // postsService : PostsService;
  constructor(public postsService: PostsService) {

  }

  ngOnInit(): void {
  this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
      .subscribe((posts : Post[]) => {
        this.posts = posts;
      });
  }
  onDelete(postId : string){
    this.postsService.deletePost(postId);
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}
