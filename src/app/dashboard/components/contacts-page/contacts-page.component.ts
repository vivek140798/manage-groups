import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarConfig } from 'src/app/shared/models/snack-bar.model';
import { TableConfig } from 'src/app/shared/models/table-config.model';
import { BackendService } from 'src/app/shared/services/backend.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EditorDialogComponent } from './../../../shared/components/editor-dialog/editor-dialog.component';
import { EditorDialog } from './../../../shared/components/editor-dialog/editor-dialog.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public tableConfigData: TableConfig;
  public snackBarData: SnackBarConfig;
  groupId: any;
  groupTitle: any;
  loaderText: string = '';
  currentData: any;
  length = 0;
  pageSize = 5;
  pageIndex: any;
  totalList: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  paginationDisabled: boolean = true;
  enableSort: boolean = false;
  type: string = 'contacts';
  constructor(private userService: UserService, public router: Router, public dialog: MatDialog, private readonly snackBarService: SnackBarService, private backendService: BackendService) { }

  ngOnInit(): void {
    const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
    this.groupId = getLastItem(this.router.url)
    if (history.state.item) {
      this.groupTitle = history.state.item.groupname;
    }
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

  getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 15);
  }

  frameTableConfgiData() {
    this.tableConfigData.headers = ['Name', 'Contact No', 'Email', 'status', 'Modify'];
    this.tableConfigData.data = [{}, {}, {}, {}, {}];
    this.tableConfigData.keys = ['name', 'contactno', 'email', 'status'];
  }

  sort() {
    let data = [];
    data = this.currentData.contacts;
    data.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.length = data.length;
    this.totalList = data;
    data = this.totalList.slice(0, this.pageSize);
    this.paginationDisabled = false;
    this.tableConfigData.data = data;
    this.tableConfigData = { ...this.tableConfigData };
  }

  closed(event) {
    this.fetchData();
  }


  search(event) {
    let name = event.name.toLowerCase().trim();
    let contactno = event.contactno;
    let email = event.email.toLowerCase().trim();
    let status = event.status;
    let data = [];
    if (!name && !contactno && !email && !status) {
      this.paginationDisabled = false;
      this.tableConfigData.data = data;
      this.tableConfigData = { ...this.tableConfigData };
    }
    else {
      if (name && contactno && email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.contactno == contactno && item.email == email && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (!name && contactno && email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.contactno == contactno && item.email == email && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && !contactno && email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.email == email && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && contactno && !email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.contactno == contactno && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && contactno && email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.contactno == contactno && item.email == email) {
            data.push(item);
          }
        });
      }
      else if (!name && !contactno && email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.email == email && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && !contactno && !email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && contactno && !email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase() && item.contactno == contactno) {
            data.push(item);
          }
        });
      }
      else if (!name && contactno && email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.contactno == contactno && item.email == email) {
            data.push(item);
          }
        });
      }
      else if (!name && !contactno && !email && status) {
        this.currentData.contacts.forEach((item) => {
          if (item.status == status) {
            data.push(item);
          }
        });
      }
      else if (name && !contactno && !email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.name.toLowerCase() === name.toLowerCase()) {
            data.push(item);
          }
        });
      }
      else if (!name && contactno && !email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.contactno == contactno) {
            data.push(item);
          }
        });
      }
      else if (!name && !contactno && email && !status) {
        this.currentData.contacts.forEach((item) => {
          if (item.email == email) {
            data.push(item);
          }
        });
      }
      this.paginationDisabled = false;
      this.tableConfigData.data = data;
      this.tableConfigData = { ...this.tableConfigData };
    }
  }
  openEditorDialog(title, record, actionText1, actionText2) {
    const dialogData = new EditorDialog('contacts', title, record, actionText1, actionText2);
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      data: dialogData,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancelled') {
        if (result.record) {
          let res = { ...this.currentData };
          delete res.identifier;
          let entry = { ...result };
          entry['id'] = result.record.id;
          delete entry.record;
          this.loaderText = 'Updating';
          res.contacts.forEach((item, index) => {
            if (item.id == result.record.id) {
              res.contacts[index] = entry;
            }
          });
          this.backendService.updateData(this.currentData.identifier, res).then((res) => {
            this.loaderText = '';
            this.fetchData();
            this.frameSnackBarModel('successfully updated the contact', 'top', 'center', 2000, ['success']);
            this.snackBarService.openSnackBar(this.snackBarData);
          }).catch((error) => {
            this.loaderText = '';
            this.frameSnackBarModel('Something went wrong', 'top', 'center', 2000, ['error']);
            this.snackBarService.openSnackBar(this.snackBarData);
          });
        }
        else {
          this.loaderText = 'Creating';
          let res = { ...this.currentData };
          delete res.identifier;
          let entry = { ...result };
          entry['id'] = this.getRandomId();
          delete entry.record;
          if (res.contacts) {
            res.contacts.push(entry);
          }
          else {
            res['contacts'] = [entry];
          }
          this.backendService.updateData(this.currentData.identifier, res).then((res) => {
            this.loaderText = '';
            this.fetchData();
            this.frameSnackBarModel('successfully Created a contact', 'top', 'center', 2000, ['success']);
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
    this.openEditorDialog('Create a contact', null, 'Save', 'Cancel');
  }

  fetchData() {
    this.backendService.fetchData().then((res) => {
      let exist = false;
      let data = [];
      let user = this.userService.getUserId();
      res.forEach((item) => {
        if (item.identifier == this.groupId) {
          exist = true;
          if (item.contacts) {
            data = item.contacts;
          }
          this.currentData = item;
        }
      })
      if (exist) {
        this.length = data.length;
        this.totalList = data;
        data = this.totalList.slice(0, this.pageSize);
        this.paginationDisabled = false;
        if (data.length) {
          this.enableSort = true;
        }
        this.tableConfigData.data = data;
        this.tableConfigData = { ...this.tableConfigData };
      }
      else {
        this.router.navigate['/dashboard'];
      }
    })
  }

  updateEntry(event) {
    if (event.action === 'edit') {
      this.openEditorDialog('Edit the contact', event.item, 'Save', 'Cancel');
    }
    else if (event.action === 'delete') {
      this.loaderText = 'Deleting';
      let res = { ...this.currentData };
      delete res.identifier;
      res.contacts.forEach((item, index) => {
        if (item.id == event.item.id) {
          res.contacts.splice(index, 1);
        }
      })
      this.backendService.updateData(this.currentData.identifier, res).then((res) => {
        this.loaderText = '';
        this.fetchData();
        this.frameSnackBarModel('successfully deleted the contact', 'top', 'center', 2000, ['success']);
        this.snackBarService.openSnackBar(this.snackBarData);
      })
        .catch((error) => {
          this.loaderText = '';
          this.frameSnackBarModel('Something went wrong', 'top', 'center', 2000, ['error']);
          this.snackBarService.openSnackBar(this.snackBarData);
        });
    }
  }

  frameSnackBarModel(message, verticalPosition, horizontalPosition, duration, panelClass) {
    this.snackBarData.message = message;
    this.snackBarData.verticalPosition = verticalPosition;
    this.snackBarData.horizontalPosition = horizontalPosition;
    this.snackBarData.duration = duration;
    this.snackBarData.panelClass = panelClass;
  }

}
