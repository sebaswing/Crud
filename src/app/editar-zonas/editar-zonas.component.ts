import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zona } from '../Modelo/Zona';
import { VacunatorioService } from '../services/vacunatorio.service';

@Component({
  selector: 'app-editar-zonas',
  templateUrl: './editar-zonas.component.html',
  styleUrls: ['./editar-zonas.component.css']
})
export class EditarZonasComponent implements OnInit {

  zonas: Zona[];
  zona1FormControl = new FormControl('', [Validators.required]);
  zona2FormControl = new FormControl('', [Validators.required]);
  zona3FormControl = new FormControl('', [Validators.required]);
  editarZona1 = false
  editarZona2 = false
  editarZona3 = false

  constructor( private vacunatorioService: VacunatorioService,private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.vacunatorioService.getZonas().subscribe(response  => {
      this.zonas = response
      console.log(this.zonas)
    })
  }

  cambiarZona(pos : number){
    if (pos == 0) {
      console.log('Accede cambio zoa 1')
      if (this.zona1FormControl.valid) {
        this.zonas[pos].nombre = this.zona1FormControl.value
        this.vacunatorioService.editZona(this.zonas[pos]).subscribe( response =>{
          console.log(response)

        })
        this.editarZona1 = !this.editarZona1
        this._snackBar.open("Se cambio la ubicacion de la zona", "Cerrar", {duration: 10 * 1000});
      }

    }
    if (pos == 1) {
        if (this.zona2FormControl.valid) {
          this.zonas[pos].nombre = this.zona2FormControl.value
          this.vacunatorioService.editZona(this.zonas[pos]).subscribe( response =>{
            console.log(response)
          })
          this.editarZona2 = !this.editarZona2
          this._snackBar.open("Se cambio la ubicacion de la zona", "Cerrar", {duration: 10 * 1000});
        }
    }
    if(pos==2){
      if (this.zona3FormControl.valid) {
            this.zonas[pos].nombre = this.zona3FormControl.value
            this.vacunatorioService.editZona(this.zonas[pos]).subscribe( response =>{
              console.log(response)
            })
            this.editarZona3 = !this.editarZona3
            this._snackBar.open("Se cambio la ubicacion de la zona", "Cerrar", {duration: 10 * 1000});
          }

    }
      
    

  }


}
