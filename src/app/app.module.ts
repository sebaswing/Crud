import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaVacunasComponent } from './lista-vacunas/lista-vacunas.component';
import { AddPeopleComponent } from './add-people/add-people.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ListoVacunadoresComponent,DialogOverviewExampleDialog } from './listo-vacunadores/listo-vacunadores.component';
import { AgregarVacunadorComponent } from './agregar-vacunador/agregar-vacunador.component';
import { DetalleVacunadorComponent } from './detalle-vacunador/detalle-vacunador.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component';
import { PerfilVacunadorComponent } from './perfil-vacunador/perfil-vacunador.component';
import { ListoTurnosComponent } from './listo-turnos/listo-turnos.component'
import { ListaFiebreAmComponent,DialogConfirm,AsigFechaTurno } from './lista-fiebre-am/lista-fiebre-am.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { IngresoVacunasDesdeVacunadorComponent } from './ingreso-vacunas-desde-vacunador/ingreso-vacunas-desde-vacunador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaVacunasComponent,
    AddPeopleComponent,
    EditPeopleComponent,
    LoginComponent,
    CreateUserComponent,
    IngresoVacunasComponent,
    LoginVacunadoresComponent,
    LoginAdministradoresComponent,
    ListoVacunadoresComponent,
    DialogOverviewExampleDialog,
    AgregarVacunadorComponent,
    DetalleVacunadorComponent,
    HomeComponent,
    PerfilComponent,
    RecuperarClaveComponent,
    PerfilPacienteComponent,
    PerfilVacunadorComponent,
    ListoTurnosComponent,
    ListaFiebreAmComponent,
    DialogConfirm,
    AsigFechaTurno,
    CrearPacienteComponent,
    IngresoVacunasDesdeVacunadorComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
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
