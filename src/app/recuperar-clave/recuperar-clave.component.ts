import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradoresService } from '../services/administradores.service';
import { AuthService } from '../services/auth.service';
import { VacunadoresService } from '../services/vacunadores.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  email:string;
  constructor(private authService:AuthService,private vacunador:VacunadoresService,private administrador:AdministradoresService,private router : Router,  ) { }

  ngOnInit(): void {
  }

  checkLogin(form:NgForm){
   this.authService.recuperarClave(this.email).subscribe();
   this.vacunador.recuperarClave(this.email).subscribe();
   this.administrador.recuperarClave(this.email).subscribe();
   this.router.navigate(['login']);
  }
}
