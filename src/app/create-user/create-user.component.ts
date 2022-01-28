import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Modelo/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  pass:string;
  pass2:string;
  username:string;
  dni:number;
  email:string;
  constructor(private route:Router,private service:AuthService) { }

  ngOnInit(): void {
  }

  guardarUser(){
    if(this.validarUser()){
      let usuarioGuardar = this.cargarUser();
      this.service.createUser(usuarioGuardar)
      .subscribe(
        usuario=>{
          alert("se creo el usuario con exito")
          this.route.navigate(["login"]);
        }
      )
    }
    else{
      alert("error creando el usuario intente de nuevo");
    }
  }

  validarUser():boolean{
    if(this.pass!=this.pass2){
      return false;
    }
    return true;
  }
  cargarUser():User{
      let us=new User;
      us.dni=this.dni;
      us.email=this.email;
      us.password=this.pass;
      us.username=this.username;
      return us;
  }
}
