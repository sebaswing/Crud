import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Paciente } from '../Modelo/Paciente';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {

  pacienteActual!: Paciente;
  contraseñasIguales:boolean=true;
  profileForm:FormGroup;

  constructor(
    private userService: AuthService,
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

  get zonaField() {
    return this.profileForm.get('zona');
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      //email: new FormControl({value: '', Validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]}),
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      name: new FormControl({value: '', disabled: true}),
      lastname: new FormControl({value: '', disabled: true}),
      dni: new FormControl({value: '', disabled: true}),
      birth: new FormControl({value: '', disabled: true}),
      password:['',[Validators.required,Validators.minLength(6)]],
      password2:['',[Validators.required,Validators.minLength(6)]],
      zona: new FormControl({value: ''})
    },{
      validators:this.checkPassword('password','password2'),
    })

    const id = localStorage.getItem('token') || '';
    this.userService.checkUser(id)
    .subscribe(data => {
      this.pacienteActual = data,
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
        password2: data?.clave,
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
    console.log('se completó')
    this.userService.editarUsuario(paciente).subscribe({
      next: data => console.log(data), //se ejecuta cuando la petición termina OK
      complete: () => console.log('se completó'), // se ejecuta siempre que termina
      error: error => console.log(error) // se ejecuta cuando la petición termina con errores.
    });
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
}
