import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CustomerServiceComponent } from './customer-service/customer-service.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children :[
      {
        path: 'customerService',
        component: CustomerServiceComponent
      },
      {
        path: 'ticket',
        loadChildren: () =>
        import('../ticket/ticket.module').then((m) => m.TicketModule),
      },
      {
        path: '',
        redirectTo: 'customerService',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
