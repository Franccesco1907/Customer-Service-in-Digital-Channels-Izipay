import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../interfaces/ticket-interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = `${environment.ticketUrl}/tickets`;

  constructor(private http: HttpClient) { }
  getTickets(): Observable<any>{
    return this.http.get<Ticket[]>(`${this.baseUrl}`, { observe: 'response' });
  }

  postTicket(ticket: any): Observable<any>{
    return this.http.post(`${this.baseUrl}`, ticket, { observe: 'response' });
  }
}
