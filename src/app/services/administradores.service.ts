import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Administrador } from '../Modelo/Administrador';
import { Vacunador } from '../Modelo/Vacunador';
@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  administrador:Administrador[];
  constructor(private http:HttpClient) { }

  url='http://localhost:8080/administradores';  
  recuperarClave(email:string){
    return this.http.get<Administrador>(`${this.url}/recuperarClave/`+email);
  }
  checkLogAdministrador(email:string){
    return this.http.get<Administrador>(`${this.url}/userExist/`+email);
  }
  getAdministradorId(id:number){
    return this.http.get<Administrador>(this.url+"/"+id);
  }
  updateAdministrador(administrador:Administrador){
    return this.http.post<Administrador>(this.url+"/actualizar/"+administrador.id,administrador);
  }
}

