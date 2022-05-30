import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingreso-vacunas',
  templateUrl: './ingreso-vacunas.component.html',
  styleUrls: ['./ingreso-vacunas.component.css']
})
export class IngresoVacunasComponent implements OnInit {

  gripe:boolean;
  covid:boolean;
  amarilla:boolean;
  covid1:any;
  covid1ok:boolean;
  covid2:any;

  constructor() { 

  }

  ngOnInit(): void {
  }

  
  guardarVacunas(form:NgForm){
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
    if(fecha.getDay().toString()!="NaN")
    this.covid2=this.resetDate();
    return (fecha.getDay().toString()!="NaN") ;
  }

  resetDate(){
    var reset:any;
    return reset;
  }
}
