import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../Modelo/Paciente';
import { Vacunador } from '../Modelo/Vacunador';
import { AuthService } from '../services/auth.service';
import { VacunadoresService } from '../services/vacunadores.service';

@Component({
  selector: 'app-perfil-vacunador',
  templateUrl: './perfil-vacunador.component.html',
  styleUrls: ['./perfil-vacunador.component.css']
})
export class PerfilVacunadorComponent implements OnInit {

  vacunadorActual!: Vacunador;

  profileForm = new FormGroup({
    email: new FormControl({value: '', Validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]}),
    name: new FormControl({value: '', disabled: true}),
    lastname: new FormControl({value: '', disabled: true}),
    dni: new FormControl({value: '', disabled: true}),
    password: new FormControl({value: '', Validators: [Validators.required] }),
    zona: new FormControl({value: '', disabled:true})
  });

  constructor(
    private userService: VacunadoresService,
    private router: Router
  ) { }

  get emailField() {
    return this.profileForm.get('email');
  }
  get passwordField() {
    return this.profileForm.get('password');
  }

  ngOnInit(): void {
    const id = localStorage.getItem('token') || '';
    this.userService.checkLogVacunador(id)
    .subscribe(data => {
      this.vacunadorActual = data,
      this.fillForm(data)
    });

  }

  fillForm(data: any) {
    if (data) {
      console.log(data)
      this.profileForm.setValue({
        email: data?.email,
        name: data?.nombre,
        lastname: data?.apellido,
        dni: data?.dni,
        password: data?.clave,
        zona: data?.centro_vacunatorio,
      })
    }
  }

  submitForm() {
    let vacunador = {
      id: this.vacunadorActual.id,
      token: this.vacunadorActual.token,
      email: this.emailField?.value,
      clave: this.passwordField?.value,
      nombre: this.profileForm.get('name')?.value || '',
      apellido: this.profileForm.get('lastname')?.value || '',
      dni: this.profileForm.get('dni')?.value || '',
      centro_vacunatorio: this.profileForm.get('zona')?.value || '',
      borrado:false
    };

    this.userService.editarUsuario(vacunador).subscribe({
      next: data => console.log(data), //se ejecuta cuando la petición termina OK
      complete: () => this.router.navigate(['home']),
      error: error => console.log(error) // se ejecuta cuando la petición termina con errores.
    });
  }

}
