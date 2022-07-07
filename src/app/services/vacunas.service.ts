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

  editarVacuna(vacuna:Vacuna){
    console.log(vacuna)
    return this.http.put<Vacuna>(this.url+"/"+vacuna.id,vacuna);
  }

  obtenerVacunas(idPaciente:number){
    return this.http.get<Vacuna[]>(this.url+'/listarVacunas/'+idPaciente);
  }

  traerTurno(id:number){
    return this.http.get<Vacuna>(this.url+'/traerTurno/'+id);
  }

  borrarTurno(vacuna: Vacuna,id:number){
    return this.http.put<Vacuna>(this.url+'/borrar/'+vacuna.id,id)
  }

  traerTurnos(zona:number){
    return this.http.get<Vacuna[]>(this.url+'/traerTurnos/'+zona);
  }
}
