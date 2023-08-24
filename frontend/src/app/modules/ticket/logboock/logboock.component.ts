import { Component } from '@angular/core';
import { TicketComment } from 'src/app/interfaces/ticket-interface';

@Component({
  selector: 'app-logboock',
  templateUrl: './logboock.component.html',
  styleUrls: ['./logboock.component.scss']
})
export class LogboockComponent {

  comments: TicketComment[] = [
    {
      name:'Angel', comment: 'Se requiere información de datos', state:'En espera'
    },
    {
      name:'Franccesco', comment: 'Se requiere información de datos', state:'En espera'
    },
  ]

  roleOptions: any[] = [
    {id: 1, value: 'Colaborador'},
    {id: 2, value: 'Admin'},
    {id: 3, value: 'Usuario'},
  ]


}
