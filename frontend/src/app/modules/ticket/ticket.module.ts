import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SharedModule } from '../shared/shared.module';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { LogboockComponent } from './logboock/logboock.component';
import { SolutionQueryComponent } from './solution-query/solution-query.component';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    LogboockComponent,
    SolutionQueryComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule
  ]
})
export class TicketModule { }
