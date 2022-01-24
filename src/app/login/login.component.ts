import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' 
import { login } from '../Modelo/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:login={user:"juan",password:"123",userType:"Admin"};
  pass:string;
  email:string;
  approved=false;
  message: string;  
  returnUrl='refresh';  
  loginForm: FormGroup; 
  constructor(  
    private router : Router,  
    private authService : AuthService  ) { 
    
  }

  ngOnInit(): void {
      this.email='';
      this.pass=''; 
      this.authService.logout();  
  }
  checkLogin(){
    if(this.email===this.model.user && this.pass=== this.model.password && this.approved==false){
        console.log("Login successful");  
        //this.authService.authLogin(this.model);  
        localStorage.setItem('isLoggedIn', "true");  
        localStorage.setItem('token', this.email);  
        this.router.navigate([this.returnUrl]); 
    }
    else
    {
      alert("usuario o contraseña incorrecto"); 
    }
  }
}
