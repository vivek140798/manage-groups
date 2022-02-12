import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsPageComponent } from './components/contacts-page/contacts-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '/contacts/:id', component: ContactsPageComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
