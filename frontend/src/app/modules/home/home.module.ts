import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CustomerServiceComponent } from './customer-service/customer-service.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    CustomerServiceComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
