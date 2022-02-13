import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { EditorDialogComponent } from './components/editor-dialog/editor-dialog.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent
  ]
})
export class SharedModule { }
