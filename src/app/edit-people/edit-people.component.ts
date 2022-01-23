import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../Modelo/Persona';
import { PersonasService } from '../services/personas.service';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css']
})
export class EditPeopleComponent implements OnInit {

  persona:Persona=new Persona();

  constructor(private route:Router,private service:PersonasService) { }

  ngOnInit(): void {
    this.Editar();
  }
  Editar(){
    const id=localStorage.getItem("id");
    this.service.getPersonaId(+id)
    .subscribe(data =>
        this.persona=data
      )}
  Actualizar(persona:Persona){
    this.service.updatePersona(this.persona)
    .subscribe( data=>{
        this.persona=data
        alert("se actualizó con exito");
        this.route.navigate(["listarPersonas"]);
    })}
    
}
