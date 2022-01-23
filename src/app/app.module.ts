import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import{FormsModule} from '@angular/forms'
import {PersonasService} from '../app/services/personas.service'
import {HttpClientModule} from '@angular/common/http';
import { EditPeopleComponent } from './edit-people/edit-people.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PeopleListComponent,
    AddPeopleComponent,
    EditPeopleComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    PersonasService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
