import { Component, OnInit } from '@angular/core';
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

  constructor(
    private vacunaService:VacunasService
  ) {}
  //performFilter(filterBy:string):Persona[]
   //// {
     // filterBy = filterBy.toLocaleLowerCase();
     // return this.personas.filter((product:Persona)=>
     // product.nombre.toLocaleLowerCase().includes(filterBy));
    //}

  ngOnInit(): void {
    const id = Number(localStorage.getItem('idPaciente')) || 0;

    this.vacunaService.obtenerVacunas(id).subscribe(
      vacunas => this.vacunas = vacunas
    );
  }

}
