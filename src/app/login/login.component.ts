import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { User } from '../Modelo/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pass:string;
  email:string;
  encontrado:User=new User();
  approved=false;
  message: string;  
  returnUrl='/listarPersonas';  
  constructor(  
    private router : Router,  
    private authService : AuthService  ) { 

  }

  ngOnInit(): void {
      this.email='';
      this.pass=''; 
      this.authService.logout();  
  }
  checkLogin(){
      this.authService.checkLog(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.encontrado.username===this.email && this.encontrado.password===this.pass && this.approved==false)
          {
            console.log("Login successful");  
            // this.authService.authLogin(this.model);  
            localStorage.setItem('isLoggedIn', "true");  
            localStorage.setItem('token', this.encontrado.username);  
            this.router.navigate([this.returnUrl]); 
          }
          else
          {
            alert("usuario o contraseña incorrecto"); 
          } 
      })   
  }
}
