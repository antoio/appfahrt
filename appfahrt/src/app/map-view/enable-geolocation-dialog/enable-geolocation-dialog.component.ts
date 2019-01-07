import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
selector: 'app-enable-geolocation-dialog',
  templateUrl: './enable-geolocation-dialog.component.html'
})
export class EnableGeolocationDialogComponent {

  constructor(public dialogRef: MatDialogRef<EnableGeolocationDialogComponent>) { }

  onOk(): void {
    this.dialogRef.close();
  }

}
