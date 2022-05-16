import { Component, OnInit } from '@angular/core';
import { Persona } from '../Modelo/Persona';
import { PersonasService } from '../services/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
   
  //filteredProducts:Persona[]=[];
  //rivate _filterList='';  
  per:Persona[];
  //get listFilter():string
   // {
   //   return this._filterList;
   // }
  //set listFilter(value:string)
    //{
    //  this._filterList=value;
    //  this.filteredProducts=this.performFilter(value);
   // } 
    personas:any;
    ngOnInit(): void {
      this.service.getTodas()
        .subscribe(
          resulta => {
            this.personas=resulta;
            
          }
        );
    }
  constructor(private service: PersonasService,private router:Router) {
  }
  //performFilter(filterBy:string):Persona[]
   //// {
     // filterBy = filterBy.toLocaleLowerCase();
     // return this.personas.filter((product:Persona)=> 
     // product.nombre.toLocaleLowerCase().includes(filterBy));
    //}
  Editar(persona:Persona){
      localStorage.setItem("id",persona.id.toString());
      this.router.navigate(['editarPersonas']);
  }
  Delete(persona:Persona){
    this.service.deletePersona(persona)
    .subscribe(data=>{
      this.personas=this.personas.filter((p: Persona) =>{
        return p !== persona;
      });
      alert("Usuario eliminado...");
    })}
}