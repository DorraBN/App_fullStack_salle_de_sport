
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { EditComponent } from './edit/edit.component';



export const routes: Routes = [
  {  path: '', component: HomeComponent},
   { path: 'dashboard', component: DashboardComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component:SignupComponent },
   { path: 'profile', component:ProfileComponent },
   { path: 'comment', component:CommentListComponent },
   { path: 'edit/:id', component:EditComponent },

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}

