import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tmp',
  templateUrl: './tmp.component.html',
  styleUrls: ['./tmp.component.css'],
})
export class TmpComponent {
  constructor(
    public dialogRef: MatDialogRef<TmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
