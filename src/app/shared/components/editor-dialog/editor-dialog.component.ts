import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorDialog } from './editor-dialog.model';

@Component({
  selector: 'app-editor-dialog',
  templateUrl: './editor-dialog.component.html',
  styleUrls: ['./editor-dialog.component.scss']
})
export class EditorDialogComponent implements OnInit {
  title: string;
  record: object;
  cancel: string;
  save: string;
  constructor(
    public dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditorDialog
  ) {
    this.title = data.title;
    this.record = data.record;
    this.cancel = data.cancel;
    this.save = data.save;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    let data = {
      groupname: 'GN',
      status: 'Active'
    };
    this.dialogRef.close(data);
  }

  onDismiss(): void {
    this.dialogRef.close('cancelled');
  }

}
