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
  templateUrl: './ingreso-vacunas.component.html',
  styleUrls: ['./ingreso-vacunas.component.css']
})
export class IngresoVacunasComponent implements OnInit {

  gripe:boolean;
  gripeFecha:Date;
  covid:boolean;
  amarilla:boolean;
  covid1:any;
  covid1ok:boolean;
  covid2:any;
  fechaAmarilla:Date;
  email:string;
  acepto:boolean;
  returnUrl='/listarPersonas';
  pacienteEditar:Paciente = new Paciente();

  constructor(private route:Router,private service:VacunasService,private authService:AuthService) {

  }

  ngOnInit(): void {
  }


  guardarVacunas(form:NgForm){
      this.llenarVacuna();
      this.buscaUsuario();

      this.route.navigate([this.returnUrl]);
  }

  // 1 gripe, 2 covid 3 gripaAmarilla
  llenarVacuna(){
    let vacu:any = {};
    vacu.id_usuario=Number(localStorage.getItem(('idPaciente')));
    if(this.gripe)
    {
      vacu.dosis=1;
      vacu.id_vacuna=1;
      vacu.fecha_aplicacion=this.gripeFecha;
      this.service.createVacuna(vacu).subscribe();
    }
    if(this.covid){
      var fecha = new Date(this.covid1);
      var fecha2 = new Date(this.covid2);
      if(fecha.getDay().toString()!="NaN")
      {
          vacu.dosis=1;
          vacu.id_vacuna=2;
          vacu.fecha_aplicacion=fecha;
          this.service.createVacuna(vacu).subscribe();
          if(fecha2.getDay().toString()!="NaN"){
            vacu.dosis=2;
            vacu.id_vacuna=2;
            vacu.fecha_aplicacion=fecha2;
            this.service.createVacuna(vacu).subscribe();
          }
      }
    }
    if(this.amarilla){
      vacu.dosis=1;
      vacu.id_vacuna=3;
      vacu.fecha_aplicacion=this.fechaAmarilla;
      this.service.createVacuna(vacu).subscribe();
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
    var email=localStorage.getItem('token');
    if(email!=null){
      this.authService.checkLog(email).subscribe(
        encontrado=>{
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('tipo','paciente');
          localStorage.setItem('token',encontrado.email);
          encontrado.completo_vacunas=1
          this.authService.editarUsuario(encontrado).subscribe();
          this.route.navigate([this.returnUrl]);
      })
    }
  }
}
