import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user.service';
import { User } from '../user.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { userComponent } from '../user/user.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  showForm: boolean = false;
  showAddForm: boolean = false; // Ajout de showAddForm
  showUpdateForm: boolean = false; // Ajout de showUpdateForm

  userForm: FormGroup;
  updateUserForm: FormGroup; // Ajout de updateUserForm

  selectedUserId: number | null = null;


  constructor(private usersService: UsersService, private fb: FormBuilder,private router:Router,private dialog: MatDialog) {
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
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getAllUsers().subscribe(
      (data: User[]) => {
        console.log('Data received:', data);
        this.users = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
    this.showAddForm = false;
    this.showUpdateForm = false; // Assurez-vous que les autres formulaires sont masqués
  }

  toggleAddFormVisibility(): void {
    this.showAddForm = !this.showAddForm;
    this.showUpdateForm = false; // Assurez-vous que l'autre formulaire est masqué
  }

  toggleUpdateFormVisibility(): void {
    this.showUpdateForm = !this.showUpdateForm;
    this.showAddForm = false; // Assurez-vous que l'autre formulaire est masqué
  }

  addUser(): void {
    const newUser: User = this.userForm.value as User;
    this.usersService.addUser(newUser).subscribe(
      (user: User) => {
        console.log('Utilisateur ajouté avec succès:', user);
        this.getUsers();
        this.resetFormAndVariables();
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }
update(user:User):void{
  this.router.navigate(['/edit',user.id]);





}


shouldShow = false;

// user.component.ts
openUserDetailsModal(user: User): void {
  this.usersService.getUserById(user.id).subscribe((data) => {
    console.log('User details data:', data);
    const dialogRef = this.dialog.open(userComponent, {
      data: { user: data },
      width: '800px',
      height:'400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The modal was closed with result:', result);
    });
  });
}




  deleteUser(user: User): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur?')) {
      this.usersService.deleteUser(user.id).subscribe(
        () => {
          console.log('Utilisateur supprimé de la base de données avec succès.');
          this.users = this.users.filter(u => u.id !== user.id);
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }
  resetFormAndVariables() {
    this.userForm.reset();
    this.updateUserForm.reset();

    this.showForm = false;
    this.showAddForm = false;
    this.showUpdateForm = false;
  }
}
function HostListener(arg0: string, arg1: never[]): (target: DashboardComponent, propertyKey: "onWindowScroll", descriptor: TypedPropertyDescriptor<() => void>) => void | TypedPropertyDescriptor<() => void> {
  throw new Error('Function not implemented.');
}

