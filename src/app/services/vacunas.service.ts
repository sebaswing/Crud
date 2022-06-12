import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Vacuna}from '../Modelo/Vacuna';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(private http:HttpClient) { }
  url='http://localhost:8080/vacunas'

  createVacuna(vacuna:Vacuna){
    return this.http.post<Vacuna>(this.url,vacuna);
  }

  obtenerVacunas(idPaciente:number){
    return this.http.get<Vacuna[]>(this.url+'/listarVacunas/'+idPaciente);
  }
}
