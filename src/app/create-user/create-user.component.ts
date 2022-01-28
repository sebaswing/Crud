import { Component, OnInit } from '@angular/core';
import { User } from '../Modelo/User';

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
  constructor() { }

  ngOnInit(): void {
  }

  guardarUser(){
    if(this.validarUser()){
      let usuarioGuardar = this.cargarUser();
    }
    else{
      alert("no se puede guardar");
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
