import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from './add-people/add-people.component';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditPeopleComponent } from './edit-people/edit-people.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { IngresoVacunasComponent } from './ingreso-vacunas/ingreso-vacunas.component';
import { ListoVacunadoresComponent } from './listo-vacunadores/listo-vacunadores.component';
import { LoginAdministradoresComponent } from './login-administradores/login-administradores.component';
import { LoginVacunadoresComponent } from './login-vacunadores/login-vacunadores.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
      path:'',
      redirectTo: checkbasic(),
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
    path:'listarPersonas',
    component: PeopleListComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'argegarPersonas',
    component: AddPeopleComponent
  },
  {
    path:'editarPersonas',
    component: EditPeopleComponent
  },
  {
    path:'refresh',
    component:AppComponent
  },
  {
    path:'createUser',
    component:CreateUserComponent
  },
  {
    path:'agregarVacunas',
    component:IngresoVacunasComponent
  },
  {
    path:'listaVacunadores',
    component:ListoVacunadoresComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'perfil',
    component:PerfilComponent
  }

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
  return "refresh";
  }
}

