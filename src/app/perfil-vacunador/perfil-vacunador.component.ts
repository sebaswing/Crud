
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl,FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  contraseñasIguales:boolean=true;
  profileForm:FormGroup;

  constructor(
    private userService: VacunadoresService,
    private router: Router,
    private fb:FormBuilder
  ) { }

  get emailField() {
    return this.profileForm.get('email');
  }
  get passwordField() {
    return this.profileForm.get('password');
  }
  get password2Field() {
    return this.profileForm.get('password2');
  }


  

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: new FormControl({value: '', disabled: true}),
      lastname: new FormControl({value: '', disabled: true}),
      dni: new FormControl({value: '', disabled: true}),
      password:['',[Validators.required,Validators.minLength(6)]],
      password2:['',[Validators.required,Validators.minLength(6)]],
      zona: new FormControl({value: '', disabled:true})
    },{
      validators:this.checkPassword('password','password2'),
    });


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
        password2: data?.clave,
        zona: data?.centro_vacunatorio,
      })
    }
  }

  checkPassword(pass1:string,pass2:string):ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
        const FormGroup=control as FormGroup;
        const passs1 = FormGroup.get(pass1)?.value;
        const passs2 = FormGroup.get(pass2)?.value;
        console.log(passs1);
        console.log(passs2);

        if (passs1===passs2)
          return null;
        else{
          return {password2:true};
        }
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
      borrado:false,
    };
    localStorage.setItem('token',vacunador.email);

    this.userService.editarUsuario(vacunador).subscribe({
      next: data => alert("Los datos del perfil fueron actualizados correctamente"), //se ejecuta cuando la petición termina OK
      complete: () => this.router.navigate(['perfilVacunador']),
      error: error => console.log(error) // se ejecuta cuando la petición termina con errores.
      
    });
  }

}
