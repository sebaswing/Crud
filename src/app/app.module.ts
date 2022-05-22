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
import { CreateUserComponent } from './create-user/create-user.component';
import { IngresoVacunasComponent } from './ingreso-vacunas/ingreso-vacunas.component';
import { LoginVacunadoresComponent } from './login-vacunadores/login-vacunadores.component';
import { LoginAdministradoresComponent } from './login-administradores/login-administradores.component'; 
import { AdministradoresService } from './services/administradores.service';
import { VacunadoresService } from './services/vacunadores.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PeopleListComponent,
    AddPeopleComponent,
    EditPeopleComponent,
    LoginComponent,
    CreateUserComponent,
    IngresoVacunasComponent,
    LoginVacunadoresComponent,
    LoginAdministradoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    VacunadoresService,
    AdministradoresService,
    PersonasService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
