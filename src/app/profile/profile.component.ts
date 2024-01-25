// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Subscribe to user$ observable to get notified when the user logs in
    this.authService.user$.subscribe(user => {
      this.userProfile = user;
    });
  }
}
