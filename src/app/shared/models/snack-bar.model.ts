import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export class SnackBarConfig {
    message: string;
    verticalPosition: MatSnackBarHorizontalPosition;
    horizontalPosition: MatSnackBarVerticalPosition;
    duration: number;
    panelClass: Array<string>;
}