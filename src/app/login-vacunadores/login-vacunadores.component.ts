import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { Vacunador } from '../Modelo/Vacunador';
import { VacunadoresService } from '../services/vacunadores.service';

@Component({
  selector: 'app-login-vacunadores',
  templateUrl: './login-vacunadores.component.html',
  styleUrls: ['./login-vacunadores.component.css']
})
export class LoginVacunadoresComponent implements OnInit {
  pass:string;
  email:string;
  dni:number;
  token:number;
  encontrado:Vacunador=new Vacunador();
  approved=false;
  message: string;  
  aproved=true;
  returnUrl='/listarPersonas';  

  constructor(  
    private router : Router,  
    private authService : AuthService,
    private vacunadoresService : VacunadoresService    ) { 

  }

  ngOnInit(): void {
      this.email='';
      this.pass=''; 
      this.authService.logout();  
  }
  checkLoginVacunador(form:NgForm){
      this.vacunadoresService.checkLogVacunador(this.email)
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
