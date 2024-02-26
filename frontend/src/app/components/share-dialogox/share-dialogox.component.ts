import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialogox',
  templateUrl: './share-dialogox.component.html',
  styleUrls: ['./share-dialogox.component.css'],
})
export class ShareDialogoxComponent {
  constructor(
    public dialogRef: MatDialogRef<ShareDialogoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
