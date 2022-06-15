import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor(public postsService : PostsService) { }

  ngOnInit(): void {
  }

}
