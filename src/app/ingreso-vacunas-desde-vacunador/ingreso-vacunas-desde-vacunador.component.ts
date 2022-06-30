import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Paciente } from '../Modelo/Paciente';
import { Vacuna } from '../Modelo/Vacuna';
import { AuthService } from '../services/auth.service';
import { VacunasService } from '../services/vacunas.service';

@Component({
  selector: 'app-ingreso-vacunas',
  templateUrl: './ingreso-vacunas-desde-vacunador.component.html',
  styleUrls: ['./ingreso-vacunas-desde-vacunador.component.css']
})
export class IngresoVacunasDesdeVacunadorComponent implements OnInit {

  gripe:boolean;
  gripeFecha:Date;
  covid:boolean;
  amarilla:boolean;
  covid1:any;
  covid1ok:boolean;
  covid2:any;
  fechaAmarilla:Date;
  hoy:Date = new Date()
  ano=this.hoy.getUTCFullYear();
  mes=this.hoy.getUTCMonth();
  dia=this.hoy.getUTCDate();
  email:string;
  acepto:boolean;
  vacu:Vacuna=new Vacuna();
  returnUrl='/listoTurnos';
  pacienteEditar:Paciente = new Paciente();

  constructor(private route:Router,private service:VacunasService,private authService:AuthService) {

  }

  ngOnInit(): void {
  }


  guardarVacunas(form:NgForm){
      this.llenarVacuna();
      this.buscaUsuario();

      this.route.navigate([this.returnUrl]);
      this.route.navigate(['/refresh']);
  }

  // 1 gripe, 2 covid 3 gripaAmarilla
  llenarVacuna(){
    this.vacu.id_usuario=Number(localStorage.getItem(('idPaciente')));
    this.vacu.observacion="";
    if(this.gripe)
    {
      this.vacu.dosis=1;
      this.vacu.id_vacuna=1;
      this.vacu.fecha_aplicacion=this.gripeFecha;
      this.service.createVacuna(this.vacu).subscribe();
    }else{
      this.vacu.dosis=1;
      this.vacu.id_vacuna=1;
      this.vacu.zona=Number(localStorage.getItem(('zonaAsignada')));
      this.vacu.fecha_aplicacion= new Date(this.ano,this.mes,this.dia);
      this.service.createVacuna(this.vacu).subscribe();
    }

    if(this.covid){
      var fecha = new Date(this.covid1);
      var fecha2 = new Date(this.covid2);
      if(fecha.getDay().toString()!="NaN")
      {
          this.vacu.dosis=1;
          this.vacu.id_vacuna=2;
          this.vacu.fecha_aplicacion=fecha;
          this.service.createVacuna(this.vacu).subscribe();
          if(fecha2.getDay().toString()!="NaN"){
            this.vacu.dosis=2;
            this.vacu.id_vacuna=2;
            this.vacu.fecha_aplicacion=fecha2;
            this.service.createVacuna(this.vacu).subscribe();
          }
      }
    }else{
      this.vacu.dosis=1;
      this.vacu.id_vacuna=2;
      this.vacu.zona=Number(localStorage.getItem(('zonaAsignada')));
      this.vacu.fecha_aplicacion= new Date(this.ano,this.mes,this.dia);
      this.service.createVacuna(this.vacu).subscribe();

      this.vacu.dosis=2;
      this.vacu.id_vacuna=2;
      this.vacu.zona=Number(localStorage.getItem(('zonaAsignada')));
      this.vacu.fecha_aplicacion= new Date(this.ano,this.mes,this.dia+21);
      this.service.createVacuna(this.vacu).subscribe();
    }
    if(this.amarilla){
      this.vacu.dosis=1;
      this.vacu.id_vacuna=3;
      this.vacu.fecha_aplicacion=this.fechaAmarilla;
      this.service.createVacuna(this.vacu).subscribe();
    }else{
      this.vacu.dosis=1;
      this.vacu.id_vacuna=3;
      this.vacu.zona=Number(localStorage.getItem(('zonaAsignada')));
      this.vacu.fecha_aplicacion=new Date(this.ano,this.mes,this.dia);
      this.service.createVacuna(this.vacu).subscribe();
    }
  }

  checkAmarilla(){
    return this.amarilla;
  }

  resetCovid(){
    if(this.covid==false){
      this.covid1=this.resetDate();
      this.covid2=this.resetDate();
    }
    return true;
  }
  checkDosis1(){
    var fecha = new Date(this.covid1);
    if(fecha.getDay().toString()=="NaN")
    this.covid2=this.resetDate();
    return (fecha.getDay().toString()!="NaN") ;
  }

  resetDate(){
    var reset:any;
    return reset;
  }
  buscaUsuario(){
    var email=localStorage.getItem('tokenPaciente');
    if(email!=null){
      this.authService.checkLog(email).subscribe(
        encontrado=>{
          encontrado.completo_vacunas=1
          this.authService.editarUsuario(encontrado).subscribe();
          this.route.navigate([this.returnUrl]);
      })
    }
  }
}
