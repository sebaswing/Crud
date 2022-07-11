import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnoFiebreA } from '../Modelo/TurnoFiebreA';
import { Vacunador } from '../Modelo/Vacunador';
import { Zona } from '../Modelo/Zona';

@Injectable({
  providedIn: 'root'
})
export class VacunatorioService {

<<<<<<< HEAD
=======
  zonas : Zona[] = [
    {nombre: 'Zona 1', ubicacion: '12/05/2022' },
    {nombre: 'Zona 2', ubicacion: '26/02/2022' }
  ]
>>>>>>> 317553300650c54c3f9d91bcddfff99d88826d2e

  listVacunadores: Vacunador[] = [
    { id: 1, nombre: 'Alejandro', apellido: 'Ramos', clave: '12098', dni: 33452334 ,email: 'alex@gmail', centro_vacunatorio:0, token: 1234, borrado: false },
    { id: 2,  nombre: 'Mariano', apellido: 'Garcia', clave: '12098', dni: 39456333 ,email: 'mariano@gmail', centro_vacunatorio:0, token: 1234, borrado: false },
    { id: 3,  nombre: 'Julieta', apellido: 'Vazquez', clave: '12098', dni: 37455336 ,email: 'ximena@gmail', centro_vacunatorio:1, token: 1234, borrado: false },
    { id: 4,  nombre: 'Victoria', apellido: 'Talerico', clave: '12098', dni: 35455336 ,email: 'vicky@gmail', centro_vacunatorio: 0, token: 1234, borrado: false },
    { id: 5,  nombre: 'Ayllin', apellido: 'Gonzales', clave: '12098', dni: 38455336 ,email: 'lin@gmail', centro_vacunatorio: 1, token: 1234, borrado: false },
    { id: 6,  nombre: 'Evelyn', apellido: 'Fernandez', clave: '12098', dni: 39457136 ,email: 'evy@gmail', centro_vacunatorio: 0, token: 1234, borrado: false },
  ];

  listTFA: TurnoFiebreA[] = [
    { id: 1, nombre: 'Marta', apellido: 'Martinez', FechaSolic: new Date("12/03/2022 14:23:00") , fechaAsig: new Date("12/3/2022 14:23:00"), aprobada: false ,borrar: false},
    { id: 2,  nombre: 'Mirian', apellido: 'Garcia', FechaSolic: new Date("12/06/2022 14:23:00") , fechaAsig: new Date("12/3/2022 14:23:00"), aprobada: false ,borrar: false},
    { id: 3,  nombre: 'Roberto', apellido: 'Sanches', FechaSolic: new Date("11/06/2022 14:23:00") , fechaAsig: new Date("11/3/2022 14:23:00"), aprobada: false ,borrar: false},
    { id: 4,  nombre: 'Ana', apellido: 'Toledo', FechaSolic: new Date("12/06/2022 14:23:00") , fechaAsig: new Date("12/3/2022 14:23:00"), aprobada: false ,borrar: false},
    { id: 5,  nombre: 'Veronica', apellido: 'Gomez', FechaSolic: new Date("11/06/2022 14:23:00") , fechaAsig: new Date("12/3/2022 14:23:00"), aprobada: false ,borrar: false},
    { id: 6,  nombre: 'Fabian', apellido: 'Fernandez', FechaSolic: new Date("11/06/2022 14:23:00") , fechaAsig: new Date("12/3/2022 14:23:00"), aprobada: false ,borrar: false},
  ];

  url='http://localhost:8080';



  constructor(private http:HttpClient) {
    //Adaptacion por error con BD
    if (!localStorage.getItem('TFA')) {
      this.setTFA()
      console.log('TFA Ready...')
    }
   }


  getVacunadores(){  
    return this.http.get<Vacunador[]>(`${this.url}/vacunadores/listar`);
  
  }

  getZonas(){
    return this.http.get<Zona[]>(`${this.url}/zona/traerZonas`);
  }

  cantVacunadoresZona(id: number){
    return this.http.get<number>(`${this.url}/vacunadores/VacunadorPorZona/`+ id);
    
  }

  crearVacunador(vacunador: Vacunador){
    return this.http.post<Vacunador>(`${this.url}/vacunadores/crearVacunador`,vacunador);

  }

  editZona(zona: Zona){
    return this.http.post<Zona>(`${this.url}/zona/edit/`+ zona.id,zona);
  }




  eliminarVacunador(index: number){
    this.listVacunadores.splice(index, 1);
  }

  agregarVacunador(usuario: Vacunador){
    this.listVacunadores.unshift(usuario);
  }

  //Adaptacion por error con BD [Error con parametros]
  setTFA(){
    localStorage.setItem('TFA',JSON.stringify( this.listTFA.slice()) )
  }

  //Solicitud a BD [Error con parametros]
  getListTFA(){
    if (localStorage.getItem('TFA')){
      return JSON.parse(localStorage.getItem('TFA')!)
    }
  }

  //Cambiar con correccion de BD
  updateListTFA(list: any){
    console.log(list)
    localStorage.removeItem('TFA');
    localStorage.setItem('TFA',JSON.stringify(list) )
  }

  updateTFA(turno : TurnoFiebreA){

  }

}
