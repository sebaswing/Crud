import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../Modelo/Persona';
import{User}from '../Modelo/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url='http://localhost:8080/users';  
  checkLog(username:String){
    return this.http.get<User>(`${this.url}/userExist/`+username);
  }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    }  

    createUser(user:User){
      return this.http.post<User>(this.url,user);
    }
}
