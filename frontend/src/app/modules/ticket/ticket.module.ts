import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TicketListComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule
  ]
})
export class TicketModule { }
