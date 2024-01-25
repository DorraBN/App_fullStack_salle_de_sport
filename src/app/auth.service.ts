import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private usersUrl = 'http://localhost:5000/users';
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  getUserId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getUserId`);
  }

  authenticateUser(email: string, password: string): Observable<number> {
    return this.http.get<any[]>(this.usersUrl).pipe(map(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // Notify other components about the user login
        this.userSubject.next(user);
      }
      return user ? user.id : -1;
    }));
  }
}
