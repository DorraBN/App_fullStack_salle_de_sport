// comment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  getComments(): Observable<string[]> {
    return this.comments.asObservable();
  }

  addComment(comment: string): void {
    const currentComments = this.comments.value;
    currentComments.push(comment);
    this.comments.next(currentComments);
  }
}
