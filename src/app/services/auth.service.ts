import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../Modelo/Persona';
import{Paciente}from '../Modelo/Paciente';
import { Administrador } from '../Modelo/Administrador';
import { Vacunador } from '../Modelo/Vacunador';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url='http://localhost:8080/users';
  checkLog(email:string){
    return this.http.get<Paciente>(`${this.url}/userExist/`+email);
  }

  checkID(id:number){
    return this.http.get<Paciente>(`${this.url}/userID/`+id);
  }

  logout() :void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
    }

    createUser(user:Paciente){
      return this.http.post<Paciente>(this.url,user);
    }

    checkByDni(dni:number){
      return this.http.get<Paciente>(`${this.url}/userExistdni/`+dni); //SI FUNCA
    }

    checkUser(email:string){
      return this.http.get<Paciente>(`${this.url}/userExist/`+email);
    }

    userData(){
      let user: Administrador
      if (localStorage.getItem('user')){
        return JSON.parse (localStorage.getItem('user')!)
      }
    }

    updateData(admin: Administrador ){
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(admin))
    }

    usertype(){
      return localStorage.getItem('tipo')!
    }

    editarUsuario(paciente:Paciente ){
      return this.http.put<Paciente>(this.url+"/"+Number(localStorage.getItem(('idPaciente'))),paciente);
    }

    recuperarClave(email:string){
      return this.http.get<Paciente>(`${this.url}/recuperarClave/`+email);
    }

}
