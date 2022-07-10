import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Administrador } from '../Modelo/Administrador';
import { AdministradoresService } from '../services/administradores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  data : any
  hide = true;
  adminLogger : Administrador;
  editarEmail = false
  errorExist = false
  emailFormControl = new FormControl('', [Validators.required,Validators.email]);

  editarZona = false
  zonaFormControl = new FormControl('', [Validators.required]);

  editarPass = false
  passFormControl = new FormControl('', [Validators.minLength(6),Validators.required])


  constructor(private userService: AuthService,private adminService: AdministradoresService,private _snackBar: MatSnackBar) { 
   
  }

  ngOnInit(): void {
    this.adminLogger = this.userService.userData() 
    this.emailFormControl.setValue( this.adminLogger.email );
    this.passFormControl.setValue( this.adminLogger.clave )
  }

  cambiarEmail(){
    if( this.emailFormControl.valid){
      console.log('Cambiar email')
      console.log(this.emailFormControl.value)
      this.adminService.checkLogAdministrador(this.emailFormControl.value).subscribe(admin => {
        if(admin){
          console.log("Notificar que Existe mail registrado en el servidor ")
          this._snackBar.open("Existe el mail registrado en el sistema", "Cerrar", {duration: 10 * 1000});
        }else{
          this.editarEmail=!this.editarEmail
          this.adminLogger.email = this.emailFormControl.value
          this.adminService.updateAdministrador(this.adminLogger).subscribe(admin =>{
            this.adminLogger = admin
            this.userService.updateData(admin)
          })
          this._snackBar.open("Se actualizo exitosamente el mail", "Cerrar", {duration: 4 * 1000});
        }
      })
    }

  }

  cambiarZona(){
    console.log('Cambiar Zona')
    this.editarZona = !this.editarZona
    this.data.centro_vacunatorio.nombre = this.zonaFormControl.value
  }

  cambiarPass(){
    if(this.passFormControl.valid){
      console.log('Cambiar Pass')
      this.editarPass= !this.editarPass
      this.adminLogger.clave = this.passFormControl.value
      this.adminService.updateAdministrador(this.adminLogger).subscribe(admin =>{
        this.adminLogger = admin
        this.userService.updateData(admin)
      })
      this._snackBar.open("Se actualizo exitosamente la contraseña", "Cerrar", {duration: 4 * 1000});
    }
  }

  roles(roles: string[]){
    return( roles.includes(this.userService.usertype()) )
  }


}
