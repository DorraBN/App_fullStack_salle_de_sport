
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatButtonModule,   IonicModule,MatInputModule,MatFormFieldModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  alertMessage: string = '';
  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
 
  showAlert() {
    if (this.alertMessage) {
      window.alert(this.alertMessage);
      this.alertMessage = ''; // Réinitialisez le message d'alerte après l'avoir affiché
     }
    }

}