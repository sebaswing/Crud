import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  passwordmismatch=false;
  userExists=false;
  encontrado:User=new User();
  us:User=new User();
  constructor(private route:Router,private service:AuthService) { }

  ngOnInit(): void {
    us:new User();
  }

  guardarUser(usuario:User){
      this.service.createUser(usuario)
      .subscribe(
        usuario=>{
          alert("se creo el usuario con exito")
          this.route.navigate(["login"]);
        }
      )
  }

  buscarUser(form:NgForm):void{
    this.service.checkUser(this.username)
    .subscribe(
      usuario=>{ 
        this.encontrado=usuario;
        if (this.encontrado!=null || this.pass!=this.pass2){
          if(this.encontrado!=null){
            this.userExists=true;
          }          
          if(this.pass!=this.pass2){
            this.passwordmismatch=true;
          }
        }
        else {
          this.guardarUser(this.cargarUser());
      }
    })
  }
  cargarUser():User{
    let us=new User();
    us.dni=this.dni;
    us.email=this.email;
    us.password=this.pass;
    us.username=this.username;
    return us;
  }
}
