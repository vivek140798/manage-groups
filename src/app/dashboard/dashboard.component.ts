import { Component, OnInit } from '@angular/core';
import { EditorDialogComponent } from './../shared/components/editor-dialog/editor-dialog.component';
import { EditorDialog } from './../shared/components/editor-dialog/editor-dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableConfig } from './../shared/models/table-config.model';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedGroup: string = '';
  public tableConfigData: TableConfig;
  constructor(public router: Router, public dialog: MatDialog, private backendService: BackendService) {
  }

  ngOnInit() {
    this.tableConfigData = new TableConfig();
    this.frameTableConfgiData();
    this.fetchData();
  }

  frameTableConfgiData() {
    this.tableConfigData.headers = ['Group Name', 'Status', 'Modify'];
    this.tableConfigData.data = [{}];
    this.tableConfigData.keys = ['groupname', 'status'];
  }

  openEditorDialog(title, record, actionText1, actionText2) {
    const dialogData = new EditorDialog(title, record, actionText1, actionText2);
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      data: dialogData,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancelled') {
        if (result.identifier) {
          let res = { ...result };
          delete res.identifier;
          this.backendService.updateData(result.identifier, res).then((res) => {
            this.fetchData();
          });
        }
        else {
          this.backendService.createData(result).then((res) => {
            this.fetchData();
          })
        }
      }
    });
  }

  create() {
    this.openEditorDialog('Create a Group', null, 'Save', 'Cancel');
  }

  fetchData() {
    this.backendService.fetchData().then((res) => {
      this.tableConfigData.data = res;
      this.tableConfigData = { ...this.tableConfigData }
    })
  }

  updateEntry(event) {
    if (event.action === 'edit') {
      this.openEditorDialog('Edit the Group', event.item, 'Save', 'Cancel');
    }
    else if (event.action === 'delete') {
      this.backendService.deleteData(event.item.identifier).then((res) => {
        this.fetchData();
      })
    }
  }

}
