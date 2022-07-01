import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../Modelo/Paciente';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {
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
  invalidEmail=false;
  existeDni=false;
  fechaNAcimientoIncorrecta=true;
  zona:number;
  encontrado:Paciente=new Paciente();
  us:Paciente=new Paciente();
  fechaNacimientoLimite = new Date().toISOString().split('T')[0];
  emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  constructor(private route:Router,private service:AuthService) { }

  ngOnInit(): void {
    us:new Paciente();
  }

  guardarUser(usuario:Paciente){
    this.service.createUser(usuario)
    .subscribe({
      next: usuario => {
        alert("se creo el usuario con exito")
        localStorage.setItem('idPaciente',usuario.id+"");
        localStorage.setItem('edadPaciente',this.calcularEdad(usuario.fechaNacimiento)+'');
        localStorage.setItem('tokenPaciente',usuario.email);
        this.route.navigate(['agregarVacunasDesdeVacunador']);
      },
      error: error => console.log(error)
    })
  }

  buscarUser(form:NgForm):void{
    this.reiniciarValidadores();

    if (this.validarFechaNacimiento()) {
      this.service.checkUser(this.email).subscribe(usuario => {
        this.encontrado=usuario;

        if (this.encontrado!=null || this.pass!=this.pass2 || this.pass.length<6||!this.emailPattern.test(this.email)){
          if (this.encontrado!=null) {
            this.userExists = true;
          }
          if (!this.emailPattern.test(this.email)) {
            this.invalidEmail = true;
          }
          if (this.pass!=this.pass2) {
            this.passwordmismatch = true;
          }
          if (this.pass.length<6) {
            this.shortPass = true;
          }

        } else {
          this.service.checkByDni(this.dni).subscribe({
            next: user => {
              this.encontrado = user;

              if (this.encontrado!=null ) {
                this.existeDni=this.encontrado!==null;

              } else {
                this.guardarUser(this.cargarUser());
              }
            }
          })
        }
      });

    } else {
      this.fechaNAcimientoIncorrecta=this.validarFechaNacimiento();
    }
  }

  selectchangeHandler(event:any){
    this.zona=event.target.value;
  }

  calcularEdad(nacimiento:Date):number{
    var timeDiff = Math.abs(Date.now() - new Date(nacimiento).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  cargarUser():Paciente{
    console.log(this.zona)
    let us=new Paciente();
    us.nombre=this.nombre;
    us.apellido=this.apellido;
    us.dni=this.dni;
    us.fechaNacimiento=this.nacimiento;
    us.email=this.email;
    us.clave=this.pass;
    us.zona = this.zona;
    return us;
  }

  validarFechaNacimiento()//valida que la fecha de nacimiento es menor
  {
    let FechaHoy=new Date(Date.now());
    let fechaNcimiento=new Date(this.nacimiento);
    return fechaNcimiento.getTime()<FechaHoy.getTime();
  }

  reiniciarValidadores(){
    this.passwordmismatch=false;
    this.userExists=false;
    this.shortPass=false;
    this.existeDni=false;
    this.fechaNAcimientoIncorrecta=true;
  }
}
