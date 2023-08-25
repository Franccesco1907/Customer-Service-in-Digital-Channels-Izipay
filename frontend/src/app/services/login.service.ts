import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = `${environment.authUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(credential: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, credential, { observe: 'response' });
  }
}
