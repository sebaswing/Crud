import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Vacunador } from '../Modelo/Vacunador';
import { Zona } from '../Modelo/Zona';
import { VacunatorioService } from '../services/vacunatorio.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-agregar-vacunador',
  templateUrl: './agregar-vacunador.component.html',
  styleUrls: ['./agregar-vacunador.component.css']
})

export class AgregarVacunadorComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required,Validators.email]);
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoFormControl = new FormControl('', [Validators.required]);
  dniFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]);
  fechaFormControl = new FormControl('', [Validators.required]);
  zonaFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  nuevoVacunador : Vacunador;
  
  constructor(private _usuarioService: VacunatorioService, private dialogRef: MatDialogRef<AgregarVacunadorComponent>) { }

  ngOnInit(): void {
  }

  crearVacunador(){
    //Verificar que esten todos los valores para CREAR!!
    
    this.nuevoVacunador = new Vacunador();
    this.nuevoVacunador.apellido = this.apellidoFormControl.value
    this.nuevoVacunador.nombre = this.nombreFormControl.value
    this.nuevoVacunador.email = this.emailFormControl.value
    this.nuevoVacunador.dni = this.dniFormControl.value
    let wzona : Zona = { nombre: this.zonaFormControl.value, fechaAplicacion : "12/3/2022"}
    this.nuevoVacunador.centro_vacunatorio = wzona
    this._usuarioService.agregarVacunador(this.nuevoVacunador)

    this.dialogRef.close(true);

  }

}
