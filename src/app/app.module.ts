import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutesModule, routes } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UsersService } from './user.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';

import { userComponent } from './user/user.component';
@NgModule({
  declarations: [
  
    AppComponent,
   
    HomeComponent,
    DashboardComponent,
    
    LoginComponent,
    AddUserDialogComponent,
    ProfileComponent,
    EditComponent,
    CommentListComponent,
   
    userComponent,
  
  ],
  imports: [
    MatDialogModule ,
    FormsModule,
    IonicModule ,
    MatIconModule,
    BrowserModule,
    AppRoutesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule, // Add this line to import HttpClientModule
    RouterModule.forRoot(routes)
  ],
  providers: [ UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }