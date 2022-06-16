import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { Vacunador } from '../Modelo/Vacunador';
import { VacunadoresService } from '../services/vacunadores.service';
import { Zona } from '../Modelo/Zona';

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
  returnUrl='/listoTurnos';  

  //mock
  vacunador: Vacunador


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

  // id:number;
  //   nombre:string;
  //   apellido:string;
  //   dni:number;
  //   email:string;
  //   centro_vacunatorio:Zona;
  //   clave:string;
  //   token:number;
  //   borrado:boolean;
  // {id:1, nombre:'Admin', apellido: 'Jonsales', dni: 87672345, email: 'admin@gmail.com', centro_vacunatorio: ,clave: '123456', token:987654, borrado:false}

  checkLoginVacunador(form:NgForm){
    
    if ( this.email == "vacunador1@gmail.com"){
      this.vacunador = {id:1, nombre:'vacunador1', apellido: 'Gonsales', dni: 87672345, email: 'vacunador1@gmail.com', centro_vacunatorio:1 ,clave: '123456', token:987654, borrado:false}
      localStorage.setItem('user', JSON.stringify(this.vacunador))
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', "algo@algo.com"); 
      localStorage.setItem('tipo',"vacunador") // Esto se debe manejar encubierto. CAMBIAR a un servicio
      this.router.navigate(["home"]); 


    }else{
      this.vacunadoresService.checkLogVacunador(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.approved==false && this.encontrado!=null  && this.encontrado.email===this.email && this.encontrado.clave==this.pass && this.encontrado.token==this.token){
              // this.authService.authLogin(this.model);                
                this.router.navigate([this.returnUrl]); 
                localStorage.setItem('idVacunador',this.encontrado.id+"");
                localStorage.setItem('zonaAsignada',this.encontrado.centro_vacunatorio+"");  
                localStorage.setItem('tipo','vacunador');
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
}
