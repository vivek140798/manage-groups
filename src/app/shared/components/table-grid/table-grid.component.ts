import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
})
export class TableGridComponent implements OnInit, OnChanges {

  public listHeader: any;
  public dataList: any;
  public listKeys: any;
  public allowEditing: boolean = false;
  @Input() tableConfigData: any;
  public navigatable: boolean = false;

  @Output() actionEvent = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initialize(this.tableConfigData);
  }

  initialize(tableGridData) {
    this.listHeader = tableGridData.headers;
    this.dataList = tableGridData.data;
    this.listKeys = tableGridData.keys;
  }

  modifyItem(item, action) {
    let actionItem = { item: item, action: action };
    this.actionEvent.emit(actionItem);
  }

  ngOnChanges(data) {
    if (data.tableGridData && data.tableGridData.previousValue != undefined) {
      this.initialize(data.tableGridData.currentValue);
    }
  }

  openList(item) {
    if (true) {
      this.router.navigate([''], { state: { item: item } });
    }
  }
}
