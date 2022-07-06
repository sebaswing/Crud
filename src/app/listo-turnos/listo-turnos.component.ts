import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../Modelo/Paciente';
import { TurnoVacunador } from '../Modelo/TurnoVacunador';
import { Vacuna } from '../Modelo/Vacuna';
import { AuthService } from '../services/auth.service';
import { VacunasService } from '../services/vacunas.service';

enum nombreVacuna {
  'Gripe'= 1,
  'Covid' = 2,
  'Fiebre Amarilla' = 3
};

@Component({
  selector: 'app-listo-turnos',
  templateUrl: './listo-turnos.component.html',
  styleUrls: ['./listo-turnos.component.css']
})
export class ListoTurnosComponent implements OnInit {

  public nombreVacunasEnum = nombreVacuna;
  aux:Vacuna[];
  turnos:TurnoVacunador[]=[];
  tiene=false;
  zonaAsignada = Number(localStorage.getItem('zonaAsignada')) || 0;
  form:FormGroup;
  
  constructor(
    private vacunaService:VacunasService,
    private pacienteService:AuthService,
    private route:Router,
    private fb:FormBuilder
  ) {this.crearControles();}

  ngOnInit(): void {
    this.mostrar();
    this.route.navigate(['actualizar']);
    this.mostrar();
    this.route.navigate(['listoTurnos']);
  }

  crearControles(){
    this.form= this.fb.group({
      asistio:'',
      observacion:'',
      id:''
    })
  }

  mostrar(){
    this.vacunaService.traerTurnos(this.zonaAsignada).subscribe(
      tur => {
          this.aux=tur;
          for (let index = 0; index < this.aux.length; index++) {
            this.tiene=true;
            this.pacienteService.checkID(this.aux[index].id_usuario).subscribe(
              pac => {
                this.turnos[index] =new TurnoVacunador(this.aux[index],pac);
             }
            )
        }
        }
    )
  }

  guardarAsistencia(turno:TurnoVacunador){
    
    if ((this.form.get('asistio')?.value || '') == "true"){
      turno.turno.asistio=1
    }else{
        turno.turno.fecha_aplicacion.setMonth((turno.turno.fecha_aplicacion.getMonth()+6) || 0)
        console.log(turno.turno.fecha_aplicacion)
    }
    turno.turno.observacion=this.form.get('observacion')?.value || ''
    
    this.vacunaService.editarVacuna(turno.turno).subscribe()
    this.mostrar();
    this.route.navigate(['actualizar']);
  }
}
