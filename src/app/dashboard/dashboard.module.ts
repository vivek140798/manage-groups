import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ContactsPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DashboardModule { }
