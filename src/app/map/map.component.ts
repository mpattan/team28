import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  details:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialogRef<MapComponent>){
      this.details = data
      console.log(this.details)
  }
}
