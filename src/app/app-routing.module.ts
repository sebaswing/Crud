import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from './add-people/add-people.component';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditPeopleComponent } from './edit-people/edit-people.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { IngresoVacunasComponent } from './ingreso-vacunas/ingreso-vacunas.component';
import { ListoTurnosComponent } from './listo-turnos/listo-turnos.component';
import { ListaFiebreAmComponent } from './lista-fiebre-am/lista-fiebre-am.component';
import { ListoVacunadoresComponent } from './listo-vacunadores/listo-vacunadores.component';
import { LoginAdministradoresComponent } from './login-administradores/login-administradores.component';
import { LoginVacunadoresComponent } from './login-vacunadores/login-vacunadores.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaVacunasComponent } from './lista-vacunas/lista-vacunas.component';
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component';
import { PerfilVacunadorComponent } from './perfil-vacunador/perfil-vacunador.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { IngresoVacunasDesdeVacunadorComponent } from './ingreso-vacunas-desde-vacunador/ingreso-vacunas-desde-vacunador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EditarZonasComponent } from './editar-zonas/editar-zonas.component';


const routes: Routes = [
  {
      path:'',
      redirectTo: 'login',
      pathMatch:'full'

  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'loginAdministrador',
    component: LoginAdministradoresComponent
  },
  {
    path:'loginVacunador',
    component: LoginVacunadoresComponent
  },
  {
    path:'lista-vacunas',
    component: ListaVacunasComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'argegarPersonas',
    component: AddPeopleComponent,
  },
  {
    path:'editarPersonas',
    component: EditPeopleComponent,
  },
  {
    path:'actualizar',
    component:ListoTurnosComponent,
  },
  {
    path:'refresh',
    component:AppComponent,
  },
  {
    path:'createUser',
    component:CreateUserComponent,
  },
  {
    path:'crearPaciente',
    component:CrearPacienteComponent,
  },
  {
    path:'agregarVacunas',
    component:IngresoVacunasComponent,
  },
  {
    path:'agregarVacunasDesdeVacunador',
    component:IngresoVacunasDesdeVacunadorComponent,
  },
  {
    path:'listaVacunadores',
    component:ListoVacunadoresComponent,
  },
  {
    path:'listoTurnos',
    component:ListoTurnosComponent,
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'perfil',
    component:PerfilComponent,
  },
  {
    path:'perfilPaciente',
    component:PerfilPacienteComponent,
  },
  {
    path:'perfilVacunador',
    component:PerfilVacunadorComponent,
  },
  {
    path:'recuperarClave',
    component:RecuperarClaveComponent,
  },
  {
    path:'listFA',
    component:ListaFiebreAmComponent,
  },
  {
    path:'estadisticas',
    component:EstadisticasComponent,
  },
  {
    path:'editarZonas',
    component:EditarZonasComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }

function checkbasic(): string  {
  if(localStorage.getItem('isLoggedIn') === "false"){
    return "login";
  }
  else  {
  return "login";
  }
}

