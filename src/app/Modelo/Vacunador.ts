import { Zona } from "./Zona";

export class Vacunador
{
    id:number;
    nombre:string;
    apellido:string;
    dni:number;
    email:string;
    centro_vacunatorio:Zona;
    clave:string;
    token:number;
    borrado:boolean;

    constructor(){
        this.centro_vacunatorio= new Zona();
        
    }
}