import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vistaPersonas';

  logedUser = localStorage.getItem('isLoggedIn')=="true";
  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
    if(localStorage.getItem('tipo')==="paciente")
    this.router.navigate(["lista-vacunas"]);
  }

  listar()
  {
    this.logedUser = localStorage.getItem('isLoggedIn')=="true";
    this.router.navigate(["lista-vacunas"]);
  }
}
