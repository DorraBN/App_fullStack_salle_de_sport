import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  users: User[] = [];
  showForm: boolean = false;
  showAddForm: boolean = false;
  showUpdateForm: boolean = false;

  userForm: FormGroup;
  updateUserForm: FormGroup;
  selectedUserId: number | null = null;
  userFor!: number;

  constructor(private usersService: UsersService, private fb: FormBuilder, private route: ActivatedRoute,private router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.updateUserForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userFor = params['id'];
    });
  }

  updateUser() {
    const userData = this.updateUserForm.value;
    this.usersService.updateUser(this.userFor, userData).subscribe(
      () => {
        console.log('Utilisateur mis à jour avec succès.');
        this.getUsers();
        this.resetFormAndVariables();
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      }
    );
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  resetFormAndVariables() {
    // Réinitialiser les formulaires et variables selon votre logique
    this.userForm.reset();
    this.updateUserForm.reset();
    this.selectedUserId = null;
    this.showUpdateForm = false;
  }


  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
