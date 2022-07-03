import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vacuna } from '../Modelo/Vacuna';
import { VacunasService } from '../services/vacunas.service';

enum nombreVacuna {
  'Gripe'= 1,
  'Covid' = 2,
  'Fiebre Amarilla' = 3
};

@Component({
  selector: 'app-lista-vacunas',
  templateUrl: './lista-vacunas.component.html',
  styleUrls: ['./lista-vacunas.component.css']
})
export class ListaVacunasComponent implements OnInit, OnDestroy {

  nombreVacunasEnum = nombreVacuna;
  vacunas: Vacuna[];
  vacunasPasadas: Vacuna[];
  covid:Vacuna[];
  gripe:Vacuna[];
  gripeAmarilla:Vacuna[];
  mostrarBotonAmarilla:boolean = false;
  mostrarCartelEsperando:boolean = false;
  suscriptions = new Subscription();

  constructor(
    private vacunaService:VacunasService,
    private route:Router
  ) {}

  ngOnInit(): void {
    const id = Number(localStorage.getItem('idPaciente')) || 0;

    this.suscriptions.add(
      this.vacunaService.obtenerVacunas(id).subscribe(vac => {
        this.vacunas = vac;
        this.cargarListasVacunas();
        this.mostrarBotonAmarilla = this.puedoSolicitarAmarilla();
        this.mostrarCartelEsperando = this.puedoMostrarCartelEsperando();
      })
    );
  }

  cargarListasVacunas() {
    this.gripe = this.vacunas.filter(vacuna => vacuna.id_vacuna === 1 && !this.compararFechas(vacuna));
    this.covid = this.vacunas.filter(vacuna => vacuna.id_vacuna === 2 && !this.compararFechas(vacuna));
    this.gripeAmarilla = this.vacunas.filter(vacuna => vacuna.id_vacuna === 3 && !this.compararFechas(vacuna) && this.fechaValida(vacuna));
    this.vacunasPasadas = this.vacunas.filter(vacuna => this.compararFechas(vacuna) && this.fechaValida(vacuna));
  }

  puedoSolicitarAmarilla() {
    const vacunasAmarilla = this.vacunas.filter(vacuna => vacuna.id_vacuna === 3);
    const noSeVacuno = vacunasAmarilla.length === 0;
    const noSolicitoTurno = vacunasAmarilla.filter(vacuna => !this.compararFechas(vacuna)).length === 0

    return noSeVacuno && noSolicitoTurno && this.edadValidaAmarilla();
  }

  puedoMostrarCartelEsperando(): boolean {
    const vacunasAmarilla = this.vacunas.filter(vacuna => vacuna.id_vacuna === 3);

    return !this.mostrarBotonAmarilla && vacunasAmarilla.length > 0 && !this.fechaValida(vacunasAmarilla[0]);
  }

  edadValidaAmarilla(): boolean {
    const edad = Number(localStorage.getItem('edad'))

    return edad < 60;
  }

  compararFechas(vac:Vacuna): boolean {
    const fechaHoy = new Date(Date.now());
    const fechaTurno = new Date(vac.fecha_aplicacion);

    return fechaTurno.getTime()<fechaHoy.getTime();
  }

  fechaValida(vac:Vacuna): boolean {
    let fechaVacuna = new Date(vac.fecha_aplicacion).getUTCFullYear();

    return fechaVacuna !== 1900;
  }

  solicitarTurnoAmarilla(): void {
    const fiebre:any = {};

    fiebre.id_usuario=Number(localStorage.getItem('idPaciente'));
    fiebre.id_vacuna=3;
    fiebre.dosis=1;
    fiebre.fecha_aplicacion=new Date("1900-01-01");
    fiebre.observacion='';
    this.suscriptions.add(
      this.vacunaService.createVacuna(fiebre).subscribe({
        next: ()=> this.route.navigate(['refresh']),
      })
    );
  }

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

}
