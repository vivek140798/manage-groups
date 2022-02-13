import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { EditorDialogComponent } from './components/editor-dialog/editor-dialog.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxShimmerLoadingModule
  ],
  exports:[
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent,
    NgxShimmerLoadingModule
  ]
})
export class SharedModule { }
