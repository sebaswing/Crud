import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vacunador } from '../Modelo/Vacunador';

@Component({
  selector: 'app-detalle-vacunador',
  templateUrl: './detalle-vacunador.component.html',
  styleUrls: ['./detalle-vacunador.component.css']
})
export class DetalleVacunadorComponent implements OnInit {

  hide = true;

  editarEmail = false
  emailFormControl = new FormControl('', [Validators.required,Validators.email]);

  editarZona = false
  zonaFormControl = new FormControl('', [Validators.required]);

  editarPass = false
  passFormControl = new FormControl('', [Validators.minLength(6),Validators.required])


  constructor( @Inject(MAT_DIALOG_DATA) public data: Vacunador) {
     console.log(data) 
    this.emailFormControl.setValue(data.email)
    this.zonaFormControl.setValue(data.centro_vacunatorio)
    this.passFormControl.setValue(data.clave)
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
    this.data.centro_vacunatorio = this.zonaFormControl.value
  }

  cambiarPass(){
    if(this.passFormControl.valid){
      console.log('Cambiar Pass')
      this.editarPass= !this.editarPass
      this.data.clave = this.passFormControl.value
    }
  }

}
