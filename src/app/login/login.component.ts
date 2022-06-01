import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { Paciente } from '../Modelo/Paciente';
import { Administrador } from '../Modelo/Administrador';

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


  //moock
  paciente : Paciente;

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
  
    if ( this.email == "paciente1@gmail.com"){
      this.paciente = {id:2, dni:43234234, nombre:"paciente1", apellido:"paciente1Apellido",centro_vacunatorio: {nombre: "Zona 2", fechaAplicacion: "12/04/2020"}, email:"paciente1@gmail.com", clave:"123456", fechaNacimiento:new Date('12/12/1999 23:32:00'), token:98765, completo_vacunas:2}
      localStorage.setItem('user', JSON.stringify(this.paciente))
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', this.encontrado.email); 
      localStorage.setItem('tipo',"paciente") // Esto se debe manejar encubierto. CAMBIAR a un servicio
      this.router.navigate(["home"]); 
    }else
    { 

      this.authService.checkLog(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.approved==false && this.encontrado!=null  && this.encontrado.email===this.email && this.encontrado.clave==this.pass && this.encontrado.token==this.token){
              // this.authService.authLogin(this.model);                
              if(this.encontrado.completo_vacunas==1){
                localStorage.setItem('isLoggedIn', "true");  
                localStorage.setItem('tipo','paciente');
                localStorage.setItem('token', this.encontrado.email); 
                this.router.navigate([this.returnUrl]); 
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
