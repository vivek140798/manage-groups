import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private readonly snackBar: MatSnackBar) { }

  public openSnackBar(snackBarData) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = snackBarData.verticalPosition;
    config.horizontalPosition = snackBarData.horizontalPosition;
    config.duration = snackBarData.duration;
    config.panelClass = snackBarData.panelClass;
    this.snackBar.open(snackBarData.message, undefined, config);
  }
}