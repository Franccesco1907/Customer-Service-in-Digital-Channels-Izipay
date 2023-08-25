import { Credentials } from 'src/app/interfaces/credential';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  login(credential: Credentials): Observable<any>{
    return this.http.post(`${this.baseUrl}/auth/login`, credential);
  }
}
