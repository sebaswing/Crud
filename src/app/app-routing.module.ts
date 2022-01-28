import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeopleComponent } from './add-people/add-people.component';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditPeopleComponent } from './edit-people/edit-people.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PeopleListComponent } from './people-list/people-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }

function checkbasic(): string  {
  if(localStorage.getItem('isLoggedIn') == "true"){
    return "refresh";
  }
  else  
  return "login";
}

