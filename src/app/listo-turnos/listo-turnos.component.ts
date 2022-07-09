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
  hoy:Date = new Date()
  ano=this.hoy.getUTCFullYear();
  mes=this.hoy.getUTCMonth();
  dia=this.hoy.getUTCDate();
  
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
        console.log(localStorage.getItem(turno.pac.email) || "")
        if(turno.turno.id_vacuna==1){
            if((localStorage.getItem(turno.pac.email)||"") == "true"){
                turno.turno.fecha_aplicacion=new Date(this.ano,this.mes+3,this.dia)  
            }else{
                turno.turno.fecha_aplicacion=new Date(this.ano,this.mes+6,this.dia)  
            }
          }else if(turno.turno.id_vacuna==2){
              if((localStorage.getItem(turno.pac.email)||"") == "true"){
                  if(turno.turno.dosis==1){
                    this.vacunaService.traerTurno(turno.turno.id_usuario).subscribe(
                        t => {
                        t.fecha_aplicacion= new Date (this.ano,this.mes,this.dia+28)

                        this.vacunaService.editarVacuna(t).subscribe()
                        })
                    turno.turno.fecha_aplicacion=new Date(this.ano,this.mes,this.dia+7)
                  }else{
                      turno.turno.fecha_aplicacion=new Date(this.ano,this.mes,this.dia+7)
                  }  
              }else{
                  if(turno.turno.dosis==1){
                      this.vacunaService.traerTurno(turno.turno.id_usuario).subscribe(
                          t => {
                              t.fecha_aplicacion= new Date (this.ano,this.mes+6,this.dia+21)
                              this.vacunaService.editarVacuna(t).subscribe()
                          })
                      turno.turno.fecha_aplicacion=new Date(this.ano,this.mes+6,this.dia)  
                  }else{
                      turno.turno.fecha_aplicacion=new Date(this.ano,this.mes+6,this.dia)  
                  }
              }
          }
    }
    if(turno.turno.id_vacuna==3){
      this.vacunaService.borrarTurno(turno.turno).subscribe();
      this.mostrar();
      this.route.navigate(['actualizar']);
    }else{
        turno.turno.observacion=this.form.get('observacion')?.value || ''
    
        this.vacunaService.editarVacuna(turno.turno).subscribe()
        this.mostrar();
        this.route.navigate(['actualizar']);
    }
  }
}
