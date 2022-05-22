import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { Administrador } from '../Modelo/Administrador';
import { AdministradoresService } from '../services/administradores.service';

@Component({
  selector: 'app-login-administradores',
  templateUrl: './login-administradores.component.html',
  styleUrls: ['./login-administradores.component.css']
})
export class LoginAdministradoresComponent implements OnInit {
  pass:string;
  email:string;
  dni:number;
  token:number;
  encontrado:Administrador=new Administrador();
  approved=false;
  message: string;  
  aproved=true;
  returnUrl='/listarPersonas';  

  constructor(  
    private router : Router,  
    private authService : AuthService,
    private administradoresService : AdministradoresService    ) { 

  }

  ngOnInit(): void {
      this.email='';
      this.pass=''; 
      this.authService.logout();  
  }
  checkLoginAdministrador(form:NgForm){
      this.administradoresService.checkLogAdministrador(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.approved==false && this.encontrado!=null  && this.encontrado.email===this.email && this.encontrado.clave==this.pass && this.encontrado.token==this.token){
              // this.authService.authLogin(this.model);                
                this.router.navigate([this.returnUrl]); 
                localStorage.setItem('isLoggedIn', "true");  
                localStorage.setItem('token', this.encontrado.email); 
          }
          else
          {
            this.aproved=false;
          } 
      })   
  }
}
