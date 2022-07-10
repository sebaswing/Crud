import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Vacunador } from '../Modelo/Vacunador';
@Injectable({
  providedIn: 'root'
})
export class VacunadoresService {

  vacunador:Vacunador[];
  constructor(private http:HttpClient) { }

  url='http://localhost:8080/vacunadores'; 
  recuperarClave(email:string){
    return this.http.get<Vacunador>(`${this.url}/recuperarClave/`+email);
  }
  checkLogVacunador(email:string){
    return this.http.get<Vacunador>(`${this.url}/userExist/`+email);
  }
  getTodas(){
    return this.http.get<Vacunador>(`${this.url}/listar`);
  }
  getVacunadoresL(){
    return this.http.get<Vacunador>(`${this.url}/listarTodos/`+"jul");
  }
  createVacunador(vacunador:Vacunador){
    return this.http.post<Vacunador>(this.url,vacunador);
  }
  getVacunadorId(id:number){
    return this.http.get<Vacunador>(this.url+"/"+id);
  }
  updateVacunador(vacunador:Vacunador){
    return this.http.put<Vacunador>(this.url+"/"+vacunador.id,vacunador);
  }
  editarUsuario(vacunador:Vacunador ){
    return this.http.put<Vacunador>(this.url+"/"+Number(localStorage.getItem(('idVacunador'))),vacunador);
  }
  deleteVacunador(vacunador:Vacunador){
    return this.http.delete<Vacunador>(this.url+"/"+vacunador.id)
  }
  buscarDni(dni:number){
    return this.http.get<Vacunador>(`${this.url}/existeDNI/`+dni)
  }
}

