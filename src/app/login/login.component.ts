import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: { email: string, password: string } = { email: '', password: '' };

  alertMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // Use the values directly from ngModel in the template
    const email = this.loginForm.email;
    const password = this.loginForm.password;

    if (email && password) {
      // Call the authenticateUser method from the AuthService
      this.authService.authenticateUser(email, password).subscribe(userId => {
        if (userId !== -1) {
          // Authentication successful
          // Redirect logic based on the userId
          if (userId === 46) {
            // Redirect to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            // Redirect to profile
            this.router.navigate(['/profile']);
          }
        } else {
          // Authentication failed
          this.alertMessage = 'Invalid credentials';
        }
      });
    }
  }

  showAlert() {
    if (this.alertMessage) {
      window.alert(this.alertMessage);
      this.alertMessage = ''; // Réinitialisez le message d'alerte après l'avoir affiché
     }
    }



  navigateToSignUp() {
    this.router.navigate(['/register']);
  }
}
