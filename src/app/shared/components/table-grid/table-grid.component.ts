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
  @Input() navigateURL: any = null;
  public navigatable: boolean = false;

  @Output() actionEvent = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initialize(this.tableConfigData);
  }

  initialize(tableConfigData) {
    this.listHeader = tableConfigData.headers;
    this.dataList = tableConfigData.data;
    this.listKeys = tableConfigData.keys;
  }

  modifyItem(item, action) {
    let actionItem = { item: item, action: action };
    this.actionEvent.emit(actionItem);
  }

  ngOnChanges(data) {
    if (data.tableConfigData && data.tableConfigData.previousValue != undefined) {
      this.initialize(data.tableConfigData.currentValue);
    }
  }

  openList(item) {
    if (this.navigateURL) {
      this.router.navigate([this.navigateURL, item.identifier], { state: { item: item } });
    }
  }
}
