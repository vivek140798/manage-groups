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
import { PageEvent } from '@angular/material/paginator';

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
  navigateURL: string = 'dashboard/contacts';
  length = 0;
  pageSize = 5;
  pageIndex: any;
  totalList: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  paginationDisabled: boolean = true;
  enableSort: boolean = false;
  type: string = 'groups';

  pageEvent: PageEvent;
  constructor(private userService: UserService, public router: Router, public dialog: MatDialog, private readonly snackBarService: SnackBarService, private backendService: BackendService) {
  }

  ngOnInit() {
    this.tableConfigData = new TableConfig();
    this.snackBarData = new SnackBarConfig();
    this.frameTableConfgiData();
    this.fetchData();
  }
  onChangePage(pe: PageEvent) {
    let data = [];
    this.pageIndex = pe.pageIndex;
    this.pageSize = pe.pageSize;
    let start = this.pageSize * this.pageIndex;
    let end = start + this.pageSize;
    data = this.totalList.slice(start, end);
    this.tableConfigData.data = data;
    this.tableConfigData = { ...this.tableConfigData };
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

  sort() {
    this.backendService.fetchData().then((res) => {
      let data = [];
      let user = this.userService.getUserId();
      res.forEach((item) => {
        if (item.id == user) {
          data.push(item);
        }
      })
      data.sort((a, b) => {
        if (a.groupname < b.groupname) return -1;
        if (a.groupname > b.groupname) return 1;
        return 0;
      });
      this.length = data.length;
      this.totalList = data;
      data = this.totalList.slice(0, this.pageSize);
      this.paginationDisabled = false;

      this.tableConfigData.data = data;
      this.tableConfigData = { ...this.tableConfigData };
    })
  }

  closed(event){
    this.fetchData();
  }

  search(event) {
    let groupname = event.groupname.toLowerCase().trim();
    let status = event.status;
    let data = [];
    if(!groupname && !status){
      this.paginationDisabled = true;
      this.tableConfigData.data = data;
      this.tableConfigData = { ...this.tableConfigData };
    }
    else{
      if(groupname && !status){
        this.backendService.fetchData().then((res) => {
          let user = this.userService.getUserId();
          res.forEach((item) => {
            if (item.groupname.toLowerCase() === groupname && item.id == user) {
              data.push(item);
            }
          });
          this.paginationDisabled = true;
          this.tableConfigData.data = data;
          this.tableConfigData = { ...this.tableConfigData };
        });
      }
      else if(!groupname && status){
        this.backendService.fetchData().then((res) => {
          let user = this.userService.getUserId();
          res.forEach((item) => {
            if (item.status === status && item.id == user ) {
              data.push(item);
            }
          });
          this.paginationDisabled = true;
          this.tableConfigData.data = data;
          this.tableConfigData = { ...this.tableConfigData };
        });
      }
      else if(groupname && status){
        this.backendService.fetchData().then((res) => {
          let user = this.userService.getUserId();
          res.forEach((item) => {
            if (item.groupname.toLowerCase() === groupname && item.id == user && item.status === status ) {
              data.push(item);
            }
          });
          this.paginationDisabled = true;
          this.tableConfigData.data = data;
          this.tableConfigData = { ...this.tableConfigData };
        });
      }
    }
   
  }

  openEditorDialog(title, record, actionText1, actionText2) {
    const dialogData = new EditorDialog('groups', title, record, actionText1, actionText2);
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
      res.forEach((item) => {
        if (item.id == user) {
          data.push(item);
        }
      })
      this.length = data.length;
      this.totalList = data;
      data = this.totalList.slice(0, this.pageSize);
      this.paginationDisabled = false;
      if (data.length) {
        this.enableSort = true;
      }
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
