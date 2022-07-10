import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vacunador } from '../Modelo/Vacunador';
import { Zona } from '../Modelo/Zona';
import { VacunadoresService } from '../services/vacunadores.service';
import { VacunatorioService } from '../services/vacunatorio.service';

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

  zonas : Zona[];
  zonaInicial : string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: Vacunador, public vacunatorioService: VacunatorioService,public  vacunadorService : VacunadoresService, private _snackBar: MatSnackBar) {
    console.log(data) 
    this.setForm();
   }

  ngOnInit(): void {
    this.vacunatorioService.getZonas().subscribe(resul=> {
      console.log(resul)
      this.zonas = resul
      this.zonaInicial =this.zonas[this.data.centro_vacunatorio -1].nombre
      
    })
  
    
  }


  setForm(){
    this.emailFormControl.setValue(this.data.email)
    this.passFormControl.setValue(this.data.clave)
  }

  cambiarEmail(){
    if( this.emailFormControl.valid){
      console.log('Cambiar email')
      console.log(this.emailFormControl.value)
      this.vacunadorService.checkLogVacunador(this.emailFormControl.value).subscribe(vacun => {
        if(vacun){          
          this._snackBar.open("Existe el mail registrado en el sistema", "Cerrar", {duration: 10 * 1000});
        }else{
          this.editarEmail=!this.editarEmail
          this.data.email = this.emailFormControl.value
          this.vacunadorService.updateVacunador(this.data).subscribe( resul => {
            this.data = resul
            this.setForm();
          } )
          this._snackBar.open("Se actualizo exitosamente el mail", "Cerrar", {duration: 4 * 1000});
        }
      })

    }

  }

  cambiarPass(){
    if(this.passFormControl.valid){
      console.log('Cambiar Pass')
      this.editarPass= !this.editarPass
      this.data.clave = this.passFormControl.value

      this.data.clave = this.passFormControl.value
      this.vacunadorService.updateVacunador(this.data).subscribe( resul=>{
        this.data = resul
        this.setForm();
      } )
      this._snackBar.open("Se actualizo exitosamente la contraseña", "Cerrar", {duration: 4 * 1000});
    }
  }


  
  cambiarZona(){
    console.log('Cambiar Zona')
    if(this.zonaFormControl.valid){
      if (this.zonaFormControl.value != this.data.centro_vacunatorio) {
      
        this.vacunatorioService.cantVacunadoresZona( this.data.centro_vacunatorio ).subscribe( result=>{
          if (result > 1 ){
            //Puedo cambiar la zona
            console.log('Es mayor a 1.Cambio')
            this.editarZona = !this.editarZona
            this.data.centro_vacunatorio = this.zonaFormControl.value
            this.vacunadorService.updateVacunador(this.data).subscribe( result=>{
              this.data = result
              this.zonaInicial =this.zonas[this.data.centro_vacunatorio -1].nombre
            })
            this._snackBar.open("Se actualizo exitosamente la zona", "Cerrar", {duration: 4 * 1000});
          }
          else{
            this._snackBar.open("No se puede cambiar de zona, hay un unico vacunador asignado a esta", "Cerrar", {duration: 10 * 1000});
          }
        })
      }else{
        this._snackBar.open("Elija una zona distinta a la que esta", "Cerrar", {duration: 10 * 1000});
      }
    }



  }


}
