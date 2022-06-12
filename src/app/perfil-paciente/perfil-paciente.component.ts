import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../Modelo/Paciente';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {

  pacienteActual!: Paciente;

  profileForm = new FormGroup({
    email: new FormControl({value: '', Validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]}),
    name: new FormControl({value: '', disabled: true}),
    lastname: new FormControl({value: '', disabled: true}),
    dni: new FormControl({value: '', disabled: true}),
    birth: new FormControl({value: '', disabled: true}),
    password: new FormControl({value: '', Validators: [Validators.required] }),
    zona: new FormControl({value: ''})
  });

  constructor(
    private userService: AuthService
  ) { }

  get emailField() {
    return this.profileForm.get('email');
  }
  get passwordField() {
    return this.profileForm.get('password');
  }
  get zonaField() {
    return this.profileForm.get('zona');
  }

  ngOnInit(): void {
    const id = localStorage.getItem('token') || '';
    this.userService.checkUser(id)
    .subscribe(data => {
      this.pacienteActual = data,
      console.log(data);
      this.fillForm(data)
    });
  }

  fillForm(data: any) {
    if (data) {
      this.profileForm.setValue({
        email: data?.email,
        name: data?.nombre,
        lastname: data?.apellido,
        dni: data?.dni,
        birth: data?.fechaNacimiento,
        password: data?.clave,
        zona: data?.zona
      })
    }
  }

  submitForm() {
    let paciente = {
      id: this.pacienteActual.id,
      token: this.pacienteActual.token,
      completo_vacunas: this.pacienteActual.completo_vacunas,
      email: this.emailField?.value,
      clave: this.passwordField?.value,
      nombre: this.profileForm.get('name')?.value || '',
      apellido: this.profileForm.get('lastname')?.value || '',
      dni: this.profileForm.get('dni')?.value || '',
      fechaNacimiento: this.profileForm.get('birth')?.value,
      zona: this.zonaField?.value
    };

    this.userService.editarUsuario(paciente).subscribe({
      next: data => console.log(data), //se ejecuta cuando la petición termina OK
      complete: () => console.log('se completó'), // se ejecuta siempre que termina
      error: error => console.log(error) // se ejecuta cuando la petición termina con errores.
    });
  }

}
