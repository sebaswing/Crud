import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VacunadoresService } from '../services/vacunadores.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  logedUser = localStorage.getItem('isLoggedIn')=="true";
  ngOnInit(): void {
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
  }
  
  listar(){
    console.log(localStorage.getItem('isLoggedIn')==="true");
    this.router.navigate(["listarPersonas"]);
  }

  islogged(){
    return localStorage.getItem('isLoggedIn')=="true";
  }

  logout() {  
    console.log('logout');  
    this.authService.logout(); 
    this.router.navigate(['/login']);  
  } 

  mostrar(roles: string[]){
   return(this.islogged() && roles.includes(this.authService.usertype()) );
  }

}
