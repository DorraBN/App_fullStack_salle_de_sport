// dashboard.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private userUpdatedSubject = new Subject<User>();

  userUpdated$ = this.userUpdatedSubject.asObservable();

  notifyUserUpdated(user: User): void {
    this.userUpdatedSubject.next(user);
  }
}
