import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

// import {Post} from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent= '';
  enteredTitle= '';
  private mode = 'create';
  private postId : any;
  post!: Post ;
  // postCreated = new EventEmitter<Post>();
  onAddPost(form : NgForm){
    if(form.invalid){
      return;
    }
    // const post : Post = {title: form.value.title, content : form.value.content};
    this.postsService.addPost(form.value.id,form.value.title, form.value.content);
    form.resetForm();
    // this.postCreated.emit(post);
  }
  constructor(public postsService : PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap : ParamMap) =>{
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId);
      }
      else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

}
