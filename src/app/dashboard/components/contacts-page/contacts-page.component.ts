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

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public tableConfigData: TableConfig;
  public snackBarData: SnackBarConfig;
  groupId:any;
  groupTitle: any;
  loaderText: string = '';
  currentData:any;
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

  getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 15);
  }

  frameTableConfgiData() {
    this.tableConfigData.headers = ['Name', 'Contact No', 'Email', 'status','Modify'];
    this.tableConfigData.data = [{}, {}, {}, {}, {}];
    this.tableConfigData.keys = ['name', 'contactno','email','status'];
  }

  searchContacts(){
    let searchEntry = (<HTMLInputElement>document.getElementById('search-bar')).value;
    if (searchEntry) {
      let resultFound = false;
      let entry = searchEntry.trim();
      let data = [];
      this.tableConfigData.data.forEach((item) => {
        console.log(item)
        if (item.name.toLowerCase() === entry.toLowerCase()) {
          resultFound = true;
          data.push(item);
        }
      });
      if(resultFound){
        this.tableConfigData.data = data;
        this.tableConfigData = { ...this.tableConfigData };
      }
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
          let entry = {...result};
          entry['id'] = result.record.id;
          delete entry.record;
          this.loaderText = 'Updating';
          res.contacts.forEach((item,index)=>{
            if(item.id == result.record.id){
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
          let entry = {...result};
          entry['id'] = this.getRandomId();
          delete entry.record;
          if(res.contacts){
            res.contacts.push(entry);
          }
          else{
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
      res.forEach((item)=>{
        if(item.identifier == this.groupId ){
          exist = true;
          if(item.contacts){
            data = item.contacts;
          }
          this.currentData = item;
        }
      })
      if(exist){
        this.tableConfigData.data = data;
        this.tableConfigData = { ...this.tableConfigData };
      }
      else{
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
      let res = {...this.currentData};
      delete res.identifier;
      res.contacts.forEach((item,index)=>{
        if(item.id == event.item.id){
          res.contacts.splice(index,1);
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
