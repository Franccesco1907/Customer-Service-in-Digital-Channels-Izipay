import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SharedModule } from '../shared/shared.module';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { LogboockComponent } from './logboock/logboock.component';
import { SolutionQueryComponent } from './solution-query/solution-query.component';
import { RegisterTicketComponent } from './register-ticket/register-ticket.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    LogboockComponent,
    SolutionQueryComponent,
    RegisterTicketComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class TicketModule { }
