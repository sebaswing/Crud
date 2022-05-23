import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  data : any
  hide = true;

  editarEmail = false
  emailFormControl = new FormControl('', [Validators.required,Validators.email]);

  editarZona = false
  zonaFormControl = new FormControl('', [Validators.required]);

  editarPass = false
  passFormControl = new FormControl('', [Validators.minLength(6),Validators.required])


  constructor(private userService: AuthService) { 
    this.data = this.userService.userData()
    console.log(this.data)
    this.emailFormControl.setValue(this.data.email)
    if (this.userService.usertype() != "admin") {
      this.zonaFormControl.setValue(this.data.centro_vacunatorio.nombre)
    }
    this.passFormControl.setValue(this.data.clave)
  }

  ngOnInit(): void {
  }

  cambiarEmail(){
    if( this.emailFormControl.valid){
      this.editarEmail=!this.editarEmail
      console.log('Cambiar email')
      this.data.email = this.emailFormControl.value
    }

  }

  cambiarZona(){
    console.log('Cambiar Zona')
    this.editarZona = !this.editarZona
    this.data.centro_vacunatorio.nombre = this.zonaFormControl.value
  }

  cambiarPass(){
    if(this.passFormControl.valid){
      console.log('Cambiar Pass')
      this.editarPass= !this.editarPass
      this.data.clave = this.passFormControl.value
    }
  }

  roles(roles: string[]){
    return( roles.includes(this.userService.usertype()) )
  }


}
