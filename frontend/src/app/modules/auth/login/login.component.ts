import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/interfaces/credential';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';



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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {

  }

  login(form: NgForm) {
    this.send();
  }

  toggle(){
    this.tokenValidate = false;
  }

  redirectHome(){
    this.router.navigate([this.URL_HOME]).catch( error => {
      console.error('Error al navegar a /ticket: ', error);
    })
  }

  send(){
    this.loginService.login(this.credential)
    .subscribe(
      (response) => {
        const setCookieHeader = response.headers.get('Set-Cookie');
        const token = setCookieHeader.split(';')[0].split('=')[1];
        this.cookieService.set('token', token);
        this.redirectHome();
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
