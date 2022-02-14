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
  error:boolean = false;
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
      if(groupname.trim() && status.trim()){
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
      else{
        this.error= true;
      }
      
    }
    else if(this.type == 'contacts'){
      let name = (<HTMLInputElement>document.getElementById('name')).value;
      let contactno = (<HTMLInputElement>document.getElementById('contactno')).value;
      let email = (<HTMLInputElement>document.getElementById('email')).value;
      let status = (<HTMLInputElement>document.getElementById('status')).value;
      if(name.trim() && contactno.trim() && email.trim() && status.trim()){
        let data = {
          name: name,
          contactno: contactno,
          email: email,
          status: status,
          record: this.record
        };
        this.dialogRef.close(data);
      }
      else{
        this.error=true;
      }
    }
  }

  onDismiss(): void {
    this.dialogRef.close('cancelled');
  }

}
