import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { EditorDialogComponent } from './components/editor-dialog/editor-dialog.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { DelayedInputDirective } from './directives/delayed-input.directive';
import { GlobalSearchCasesComponent } from './components/global-search-cases/global-search-cases.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent,
    DelayedInputDirective,
    GlobalSearchCasesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxShimmerLoadingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PageNotFoundComponent,
    TableGridComponent,
    EditorDialogComponent,
    NgxShimmerLoadingModule,
    DelayedInputDirective,
    GlobalSearchCasesComponent
  ]
})
export class SharedModule { }
