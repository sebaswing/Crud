import { Zona } from "./Zona";

export class Paciente
{
    id:number;
    dni:number;
    nombre:string;
    apellido:string;
    email:string;
    clave:string;
    fechaNacimiento:Date;
    token:number;
    completo_vacunas:number;
    //centro_vacunatorio: Zona;
}