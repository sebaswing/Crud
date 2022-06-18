import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vacuna } from '../Modelo/Vacuna';
import { VacunasService } from '../services/vacunas.service';

enum nombreVacuna {
  'Gripe'= 1,
  'Covid' = 2,
  'Fiebre Amarilla' = 3
};

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  //filteredProducts:Persona[]=[];
  //rivate _filterList='';
  //get listFilter():string
   // {
   //   return this._filterList;
   // }
  //set listFilter(value:string)
    //{
    //  this._filterList=value;
    //  this.filteredProducts=this.performFilter(value);
   // }
  public nombreVacunasEnum = nombreVacuna;
  vacunas: Vacuna[];
  vacunasPasadas: Vacuna[];
  covid:Vacuna[];
  gripe:Vacuna[];
  gripeAmarilla:Vacuna[];
  mostrarBotonAmarilla:boolean;
  mostrarCartelEsperando:boolean;

  constructor(
    private vacunaService:VacunasService,
    private route:Router
  ) {}
  //performFilter(filterBy:string):Persona[]
   //// {
     // filterBy = filterBy.toLocaleLowerCase();
     // return this.personas.filter((product:Persona)=>
     // product.nombre.toLocaleLowerCase().includes(filterBy));
    //}

  ngOnInit(): void {
    this.mostrarBotonAmarilla=false;
    this.mostrarCartelEsperando=false;
    const id = Number(localStorage.getItem('idPaciente')) || 0;

    this.vacunaService.obtenerVacunas(id).subscribe(
      vac => {
        this.vacunas = vac;
        this.gripe= this.vacunas.filter(co=>co.id_vacuna==1 && !this.compararFechas(co));
        this.covid= this.vacunas.filter(co=>co.id_vacuna==2 && !this.compararFechas(co));
        this.gripeAmarilla= this.vacunas.filter(co=>co.id_vacuna==3);
        this.mostrarBotonAmarilla=this.gripeAmarilla.length===0;
        this.vacunasPasadas= this.vacunas.filter(co=> this.compararFechas(co) && this.fechaValida(co));
        this.gripeAmarilla=this.gripeAmarilla.filter(co=>!this.compararFechas(co));
      }
    );
  }
  edadValidaAmarilla(){
    return Number(localStorage.getItem('edad'))>=18 && Number(localStorage.getItem('edad'))<60;
  }
  compararFechas(vac:Vacuna){
    let FechaHoy=new Date(Date.now());
    let fechaNcimiento=new Date(vac.fecha_aplicacion);
    return fechaNcimiento.getTime()<FechaHoy.getTime();
  }

  fechaValida(vac:Vacuna){
    let fechaVacuna=new Date(vac.fecha_aplicacion);
    if((fechaVacuna.getFullYear()+1)==1900)
    {
      this.mostrarCartelEsperando=true;
    }
    return fechaVacuna.getFullYear()+1!=1900;
  }

  mostrarAConfirmar(){
    return this.mostrarCartelEsperando;
  }
  checkBotonAmarilla()
  {
    if(this.mostrarBotonAmarilla===true){
    const id = Number(localStorage.getItem('idPaciente')) || 0;
     this.vacunaService.obtenerVacunas(id).subscribe(
      vac => {
        this.vacunas = vac;
        this.gripeAmarilla= this.vacunas.filter(co=>co.id_vacuna==3);
        this.mostrarBotonAmarilla=this.gripeAmarilla.length===0;
        this.mostrarCartelEsperando = this.vacunas.filter(co=>co.id_vacuna==3 && !this.compararFechas(co)&&this.fechaValida(co)).length!==0;

        }
      )
    }
    return this.mostrarBotonAmarilla;
  }

  solicitarTurnoAmarilla(){
    let fiebre:any={};
    fiebre.id_usuario=Number(localStorage.getItem('idPaciente'));
    fiebre.id_vacuna=3;
    fiebre.dosis=1;
    fiebre.fecha_aplicacion=new Date("1900-01-01");
    fiebre.observacion='';
    this.vacunaService.createVacuna(fiebre).subscribe();
    this.route.navigate(['refresh']);
  }

}
