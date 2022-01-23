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

  personas:any;
  per:Persona[];
  constructor(private service: PersonasService,private router:Router) {
  }
   
  ngOnInit(): void {
    this.service.getTodas()
      .subscribe(
        resulta => {
          this.personas=resulta;
        }
      );
  }
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
      alert("Usuario elimnado...");
    })}
}