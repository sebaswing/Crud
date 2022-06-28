import { Paciente } from "./Paciente";
import { Vacuna } from "./Vacuna";
import { Vacunador } from "./Vacunador";

export class TurnoVacunador{
    turno:Vacuna;
    pac:Paciente;
    acepto:boolean;

    constructor(v:Vacuna,p:Paciente){
        this.turno=v;
        this.pac=p;
        this.acepto=false;
    }
}