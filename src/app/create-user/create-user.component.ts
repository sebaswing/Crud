import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../Modelo/Paciente';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  pass:string;
  pass2:string;
  nombre:string;
  apellido:string;
  dni:number;
  email:string;
  nacimiento:Date;
  passwordmismatch=false;
  userExists=false;
  shortPass=false;
  existeDni=false;
  fechaNAcimientoIncorrecta=true;
  encontrado:Paciente=new Paciente();
  us:Paciente=new Paciente();
  constructor(private route:Router,private service:AuthService) { }

  ngOnInit(): void {
    us:new Paciente();
  }

  guardarUser(usuario:Paciente){
      this.service.createUser(usuario)
      .subscribe(
        usuario=>{
          alert("se creo el usuario con exito")
          this.route.navigate(["login"]);
        }
      )
  }

  buscarUser(form:NgForm):void{

    if(this.validarFechaNacimiento()){
      this.service.checkUser(this.email)
      .subscribe(
        usuario=>{ 
          this.encontrado=usuario;
          if (this.encontrado!=null || this.pass!=this.pass2 || this.pass.length<6){
            if(this.encontrado!=null){
              this.userExists=true;
            }          
          if(this.pass!=this.pass2){
              this.passwordmismatch=true;
            }
            if(this.pass.length<6) {
              this.shortPass=true; 
            }
          }
          else {
            
            this.service.checkByDni(this.dni).subscribe(
              user=> {
              this.encontrado = user,
                this.existeDni=this.encontrado!==null
                
              //this.guardarUser(this.cargarUser());
            })
            
        }
      })
    } 
    else {
        this.fechaNAcimientoIncorrecta=this.validarFechaNacimiento();
    }
  }
  cargarUser():Paciente{
    let us=new Paciente();
    us.nombre=this.nombre;
    us.apellido=this.apellido;
    us.dni=this.dni;
    us.fechaNacimiento=this.nacimiento;
    us.email=this.email;
    us.clave=this.pass;
    return us;
  }

  validarFechaNacimiento()//valida que la fecha de nacimiento es menor
  {
    let FechaHoy=new Date(Date.now());
    let fechaNcimiento=new Date(this.nacimiento);
    return fechaNcimiento.getTime()<FechaHoy.getTime();
  }
}
