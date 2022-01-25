import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from '../Modelo/Persona';
@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  persona:Persona[];
  constructor(private http:HttpClient) { }

  url='http://localhost:8080/personas';  
  getTodas(){
    return this.http.get<Persona>(`${this.url}/listar`);
  }
  getPersonasL(){
    return this.http.get<Persona>(`${this.url}/listarTodos/`+"jul");
  }
  createPersona(persona:Persona){
    return this.http.post<Persona>(this.url,persona);
  }
  getPersonaId(id:number){
    return this.http.get<Persona>(this.url+"/"+id);
  }
  updatePersona(persona:Persona){
    return this.http.put<Persona>(this.url+"/"+persona.id,persona);
  }
  deletePersona(persona:Persona){
    return this.http.delete<Persona>(this.url+"/"+persona.id)
  }
}

