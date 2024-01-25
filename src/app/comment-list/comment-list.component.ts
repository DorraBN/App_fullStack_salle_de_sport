// comment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: string[] = [];
  commentForm: FormGroup;

  constructor(private commentService: CommentService, private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      commentText: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((comments: string[]) => {
      this.comments = comments;
    });
  }

// comment-list.component.ts
addComment(): void {
  const commentText = this.commentForm.get('commentText');
  if (commentText) {
    const text = commentText.value;
    this.commentService.addComment(text);
    this.commentForm.reset();
  }
}

}
