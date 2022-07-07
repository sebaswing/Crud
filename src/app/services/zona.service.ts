import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zona } from '../Modelo/Zona';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(private http:HttpClient) { }
  url='http://localhost:8080/zona';

  traerZonas(){
    return this.http.get<Zona[]>(this.url+'/traerZonas');
  }
}
