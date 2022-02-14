import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorDialog } from './editor-dialog.model';
import { UserService } from './../../services/user.service';

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
  isActive: boolean = true;
  type:string;
  constructor(
    public dialogRef: MatDialogRef<EditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditorDialog, private userService: UserService
  ) {
    this.title = data.title;
    this.record = data.record;
    this.cancel = data.cancel;
    this.save = data.save;
    this.type = data.type;
  }

  ngOnInit() {
    if (this.record) {
      if (this.record['status'] == 'Active') {
        this.isActive = true;
      }
      else if (this.record['status'] == 'Inactive') {
        this.isActive = false;
      }
    }
  }

  onConfirm(): void {
    if(this.type == 'groups'){
      let groupname = (<HTMLInputElement>document.getElementById('groupname')).value;
      let status = (<HTMLInputElement>document.getElementById('status')).value;
      let id = this.userService.getUserId();
      let data = {
        groupname: groupname,
        status: status,
        id: id
      };
      if (this.record) {
        data['identifier'] = this.record['identifier'];
      }
      this.dialogRef.close(data);
    }
    else if(this.type == 'contacts'){
      let name = (<HTMLInputElement>document.getElementById('name')).value;
      let contactno = (<HTMLInputElement>document.getElementById('contactno')).value;
      let email = (<HTMLInputElement>document.getElementById('email')).value;
      let status = (<HTMLInputElement>document.getElementById('status')).value;
      let data = {
        name: name,
        contactno: contactno,
        email: email,
        status: status,
        record: this.record
      };
      this.dialogRef.close(data);
    }
  }

  onDismiss(): void {
    this.dialogRef.close('cancelled');
  }

}
