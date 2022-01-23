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
    this.router.navigate(["listarPersonas"]);
  }
  
  listar()
  {
    this.router.navigate(["listarPersonas"]);
  }
}
