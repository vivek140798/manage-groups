import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { RouteGuardService } from '../shared/services/route-guard.service';
@NgModule({
  declarations: [
    DashboardComponent,
    ContactsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'contacts/:id',
        component: ContactsPageComponent,
        canActivate: [RouteGuardService]
      }
    ])
  ]
})
export class DashboardModule { }
