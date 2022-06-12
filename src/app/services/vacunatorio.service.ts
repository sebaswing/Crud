import { Injectable } from '@angular/core';
import { Vacunador } from '../Modelo/Vacunador';
import { Zona } from '../Modelo/Zona';

@Injectable({
  providedIn: 'root'
})
export class VacunatorioService {

  zonas : Zona[] = [
    {nombre: 'Zona 1', fechaAplicacion: '12/05/2022' },
    {nombre: 'Zona 2', fechaAplicacion: '26/02/2022' }
  ]

  listVacunadores: Vacunador[] = [
    { id: 1, nombre: 'Alejandro', apellido: 'Ramos', clave: '12098', dni: 33452334 ,email: 'alex@gmail', centro_vacunatorio:'1', token: 1234, borrado: false },
    { id: 2,  nombre: 'Mariano', apellido: 'Garcia', clave: '12098', dni: 39456333 ,email: 'mariano@gmail', centro_vacunatorio:'0', token: 1234, borrado: false },
    { id: 3,  nombre: 'Julieta', apellido: 'Vazquez', clave: '12098', dni: 37455336 ,email: 'ximena@gmail', centro_vacunatorio:'1', token: 1234, borrado: false },
    { id: 4,  nombre: 'Victoria', apellido: 'Talerico', clave: '12098', dni: 35455336 ,email: 'vicky@gmail', centro_vacunatorio: '0', token: 1234, borrado: false },
    { id: 5,  nombre: 'Ayllin', apellido: 'Gonzales', clave: '12098', dni: 38455336 ,email: 'lin@gmail', centro_vacunatorio: '1', token: 1234, borrado: false },
    { id: 6,  nombre: 'Evelyn', apellido: 'Fernandez', clave: '12098', dni: 39457136 ,email: 'evy@gmail', centro_vacunatorio: '0', token: 1234, borrado: false },
  ];
  constructor() { }


  getVacunadores(){
    return this.listVacunadores.slice();
  }

  eliminarVacunador(index: number){
    this.listVacunadores.splice(index, 1);
  }

  agregarVacunador(usuario: Vacunador){
    this.listVacunadores.unshift(usuario);
  }

}
