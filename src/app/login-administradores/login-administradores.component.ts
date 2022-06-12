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


  //Mock
  admin:Administrador

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

    if ( this.email == "admin@gmail.com"){
      this.admin = {id:1, nombre:'Admin', apellido: 'Jonsales', dni: 87672345, email: 'admin@gmail.com', clave: '123456', token:987654, borrado:false}
      localStorage.setItem('user', JSON.stringify(this.admin))
      localStorage.setItem('isLoggedIn', "true");  
      localStorage.setItem('token', "algo@algo.com"); 
      localStorage.setItem('tipo',"admin") // Esto se debe manejar encubierto. CAMBIAR a un servicio
      this.router.navigate(["listaVacunadores"]); 
    }else{

      this.administradoresService.checkLogAdministrador(this.email)
      .subscribe(
        usuario=>{
          this.encontrado=usuario;
          if(this.approved==false && this.encontrado!=null  && this.encontrado.email===this.email && this.encontrado.clave==this.pass && this.encontrado.token==this.token){
              // this.authService.authLogin(this.model);                
                this.router.navigate([this.returnUrl]); 
                localStorage.setItem('isLoggedIn', "true");  
                localStorage.setItem('idAdministrador',this.encontrado.id+""); 
                localStorage.setItem('tipo','administrador');
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
