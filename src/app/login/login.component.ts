import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { Paciente } from '../Modelo/Paciente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pass:string;
  email:string;
  dni:number;
  token:number;
  encontrado:Paciente=new Paciente();
  approved=false;
  message: string;  
  aproved=true;
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
  checkLogin(form:NgForm){
    
    if ( this.email == "algo@algo.com"){
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', "algo@algo.com"); 
      localStorage.setItem('tipo',"admin") // Esto se debe manejar encubierto. CAMBIAR a un servicio
      this.router.navigate(["listaVacunadores"]); 
    }else
    { 

      this.authService.checkLog(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.approved==false && this.encontrado!=null  && this.encontrado.email===this.email && this.encontrado.password==this.pass && this.encontrado.token==this.token){
              // this.authService.authLogin(this.model);                
              if(this.encontrado.completo_vacunas==1){
                this.router.navigate([this.returnUrl]); 
                localStorage.setItem('isLoggedIn', "true");  
                localStorage.setItem('token', this.encontrado.email); 
              }
              else
              this.router.navigate(['agregarVacunas']);
          }
          else
          {
            this.aproved=false;
          } 
      }) 
      
    }
      
  }
}
