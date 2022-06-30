import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradoresService } from '../services/administradores.service';
import { AuthService } from '../services/auth.service';
import { VacunadoresService } from '../services/vacunadores.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  email:string;
  aux:boolean;
  emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");


  constructor(private authService:AuthService,private vacunador:VacunadoresService,private administrador:AdministradoresService,private router : Router,  ) {
    this.aux=false
  }

  ngOnInit(): void {
  }

  verificarAux (){
    if(this.aux === false){
      alert("El email ingresado no existe.")
      this.router.navigate(['login']);
    }
  }

  checkLogin(form:NgForm){
    if (this.emailPattern.test(this.email)) {
      this.authService.recuperarClave(this.email).subscribe(
        paciente => {
          if (paciente !== null){
            this.aux=true;
            alert("Se envio un email con la contraseña.")
            this.router.navigate(['login']);
          }else{
            this.vacunador.recuperarClave(this.email).subscribe(
              vacunador => {
                if (vacunador !== null){
                  this.aux=true;
                  alert("Se envio un email con la contraseña.")
                  this.router.navigate(['login']);
                }else{
                  this.administrador.recuperarClave(this.email).subscribe(
                    administrador => {
                      if (administrador !== null){
                        this.aux=true;
                        alert("Se envio un email con la contraseña.")
                        this.router.navigate(['login']);
                      }else if(this.aux == false){
                        alert("El email ingresado no existe.")
                      }
                    }
                  );
                }
              }
            );
          }
        }
       );
    }else{
        alert("Debe ingresar un mail.")
    }
  //  this.authService.recuperarClave(this.email).subscribe(
  //   paciente => {
  //     if (paciente !== null){
  //       this.aux=true;
  //       alert("Se envio un email con la contraseña.")
  //       this.router.navigate(['login']);
  //     }else{
  //       this.vacunador.recuperarClave(this.email).subscribe(
  //         vacunador => {
  //           if (vacunador !== null){
  //             this.aux=true;
  //             alert("Se envio un email con la contraseña.")
  //             this.router.navigate(['login']);
  //           }else{
  //             this.administrador.recuperarClave(this.email).subscribe(
  //               administrador => {
  //                 if (administrador !== null){
  //                   this.aux=true;
  //                   alert("Se envio un email con la contraseña.")
  //                   this.router.navigate(['login']);
  //                 }else if(this.aux == false){
  //                   alert("El email ingresado no existe.")
  //                   this.router.navigate(['login']);
  //                 }
  //               }
  //             );
  //           }
  //         }
  //       );
  //     }
  //   }
  //  );
  }
}
