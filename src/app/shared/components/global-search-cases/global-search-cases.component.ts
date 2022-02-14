import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-global-search-cases',
  templateUrl: './global-search-cases.component.html',
  styleUrls: ['./global-search-cases.component.scss']
})
export class GlobalSearchCasesComponent implements OnInit {
  globalSearchGroup: FormGroup;
  globalSearchOpened: boolean = false;
  @Input() type: any;
  @Output() searched = new EventEmitter();
  @Output() closed = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {
    this.initialize();
  }

  ngOnInit(): void {

  }

  initialize(){
    this.globalSearchGroup = this.formBuilder.group({
      name: [''],
      contactno: [''],
      email:[''],
      status: [''],
      groupname: [''],
    });
  }


  globalSearchOpenedAction() {
    this.globalSearchOpened = true;
  }
  globalSearchClosedAction() {
    this.closed.emit(true);
    this.initialize();
    this.globalSearchOpened = false;
  }

  search() {
   if(this.type == 'groups'){
    let obj = {};
    obj['groupname'] = this.globalSearchGroup.controls['groupname'].value;
    obj['status'] = this.globalSearchGroup.controls['status'].value;
    this.searched.emit(obj);
   }
   else if(this.type == 'contacts'){
    let obj = {};
    obj['name'] = this.globalSearchGroup.controls['name'].value;
    obj['status'] = this.globalSearchGroup.controls['status'].value;
    obj['contactno'] = this.globalSearchGroup.controls['contactno'].value;
    obj['email'] = this.globalSearchGroup.controls['email'].value;
    this.searched.emit(obj);
   }
  }

}
