import { Component, OnInit } from '@angular/core';
import { EditorDialogComponent } from './../shared/components/editor-dialog/editor-dialog.component';
import { EditorDialog } from './../shared/components/editor-dialog/editor-dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableConfig } from './../shared/models/table-config.model';
import { BackendService } from '../shared/services/backend.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { SnackBarConfig } from 'src/app/shared/models/snack-bar.model';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedGroup: string = '';
  public tableConfigData: TableConfig;
  public snackBarData: SnackBarConfig;
  loaderText: string = '';
  navigateURL:string= 'dashboard/contacts';
  constructor(private userService: UserService, public router: Router, public dialog: MatDialog, private readonly snackBarService: SnackBarService, private backendService: BackendService) {
  }

  ngOnInit() {
    this.tableConfigData = new TableConfig();
    this.snackBarData = new SnackBarConfig();
    this.frameTableConfgiData();
    this.fetchData();
  }

  frameTableConfgiData() {
    this.tableConfigData.headers = ['Group Name', 'Status', 'Modify'];
    this.tableConfigData.data = [{}, {}, {}, {}, {}];
    this.tableConfigData.keys = ['groupname', 'status'];
  }

  frameSnackBarModel(message, verticalPosition, horizontalPosition, duration, panelClass) {
    this.snackBarData.message = message;
    this.snackBarData.verticalPosition = verticalPosition;
    this.snackBarData.horizontalPosition = horizontalPosition;
    this.snackBarData.duration = duration;
    this.snackBarData.panelClass = panelClass;
  }

  searchGroup() {
    let searchEntry = (<HTMLInputElement>document.getElementById('search-bar')).value;
    if (searchEntry) {
      let resultFound = false;
      let entry = searchEntry.trim();
      this.tableConfigData.data.forEach((item) => {
        if (item.groupname.toLowerCase() === entry.toLowerCase()) {
          resultFound = true;
          this.tableConfigData.data = [item];
          this.tableConfigData = { ...this.tableConfigData };
        }
      });
      if (!resultFound) {
        this.tableConfigData.data = [];
        this.tableConfigData = { ...this.tableConfigData };
      }
    }
    else {
      this.fetchData();
    }
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
          this.loaderText = 'Updating';
          this.backendService.updateData(result.identifier, res).then((res) => {
            this.loaderText = '';
            this.fetchData();
            this.frameSnackBarModel('successfully updated the group', 'top', 'center', 2000, ['success']);
            this.snackBarService.openSnackBar(this.snackBarData);
          }).catch((error) => {
            this.loaderText = '';
            this.frameSnackBarModel('Something went wrong', 'top', 'center', 2000, ['error']);
            this.snackBarService.openSnackBar(this.snackBarData);
          });
        }
        else {
          this.loaderText = 'Creating';
          this.backendService.createData(result).then((res) => {
            this.loaderText = '';
            this.fetchData();
            this.frameSnackBarModel('successfully created a group', 'top', 'center', 2000, ['success']);
            this.snackBarService.openSnackBar(this.snackBarData);
          }).catch((error) => {
            this.loaderText = '';
            this.frameSnackBarModel('Something went wrong', 'top', 'center', 2000, ['error']);
            this.snackBarService.openSnackBar(this.snackBarData);
          });
        }
      }
    });
  }

  create() {
    this.openEditorDialog('Create a Group', null, 'Save', 'Cancel');
  }

  fetchData() {
    this.backendService.fetchData().then((res) => {
      let data = [];
      let user = this.userService.getUserId();
      res.forEach((item)=>{
        if(item.id == user){
          data.push(item);
        }
      })
      this.tableConfigData.data = data;
      this.tableConfigData = { ...this.tableConfigData };
    })
  }

  updateEntry(event) {
    if (event.action === 'edit') {
      this.openEditorDialog('Edit the Group', event.item, 'Save', 'Cancel');
    }
    else if (event.action === 'delete') {
      this.loaderText = 'Deleting';
      this.backendService.deleteData(event.item.identifier).then((res) => {
        this.loaderText = '';
        this.fetchData();
        this.frameSnackBarModel('successfully deleted the group', 'top', 'center', 2000, ['success']);
        this.snackBarService.openSnackBar(this.snackBarData);
      })
        .catch((error) => {
          this.loaderText = '';
          this.frameSnackBarModel('Something went wrong', 'top', 'center', 2000, ['error']);
          this.snackBarService.openSnackBar(this.snackBarData);
        });
    }
  }

}
