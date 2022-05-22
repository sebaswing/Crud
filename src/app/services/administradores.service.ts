import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Administrador } from '../Modelo/Administrador';
@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  administrador:Administrador[];
  constructor(private http:HttpClient) { }

  url='http://localhost:8080/administradores';  
  checkLogAdministrador(email:string){
    return this.http.get<Administrador>(`${this.url}/userExist/`+email);
  }
  getAdministradorId(id:number){
    return this.http.get<Administrador>(this.url+"/"+id);
  }
  updatePersona(administrador:Administrador){
    return this.http.put<Administrador>(this.url+"/"+administrador.id,administrador);
  }
}

