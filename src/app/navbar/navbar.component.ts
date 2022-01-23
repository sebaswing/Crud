import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges {

  constructor(private router: Router, private authService: AuthService) { }
  logedUser = localStorage.getItem('isLoggedIn')=="true";
  ngOnInit(): void {
    
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
  }

  ngOnChanges() {
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
  }
  
  listar(){
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
    this.router.navigate(["listarPersonas"]);
  }
  logout() {  
    console.log('logout');  
    this.authService.logout(); 
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
    this.router.navigate(['/login']);  
  } 
}
