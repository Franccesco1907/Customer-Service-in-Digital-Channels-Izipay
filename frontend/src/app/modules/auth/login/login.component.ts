import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/interfaces/credential';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;
  credential: Credentials = {
    email: '',
    password: '',
  };

  URL_HOME = '/home';
  tokenValidate = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  login(form: NgForm) {
    this.redirectHome();
  }

  toggle(){
    this.tokenValidate = false;
  }

  redirectHome(){
    this.router.navigate([this.URL_HOME]).catch( error => {
      console.error('Error al navegar a /ticket: ', error);
    })
  }
}
