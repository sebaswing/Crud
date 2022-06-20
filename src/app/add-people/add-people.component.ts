import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../Modelo/Persona';
import { PersonasService } from '../services/personas.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {
  persona:Persona=new Persona();
  constructor(private route:Router,private service:PersonasService) { }

  ngOnInit(): void {
  }

  Guardar(nombre:String,apellido:String){
      this.persona.nombre=nombre
      this.persona.apellido=apellido;
      this.service.createPersona(this.persona)
      .subscribe(
        data=>{
          alert("se agregó con exito");
          this.route.navigate(["lista-vacunas"]);
        }
   )}
}
