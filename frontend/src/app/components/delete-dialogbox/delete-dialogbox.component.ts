import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialogbox',
  templateUrl: './delete-dialogbox.component.html',
  styleUrls: ['./delete-dialogbox.component.css'],
})
export class DeleteDialogboxComponent {
  constructor(public dialog: MatDialogRef<DeleteDialogboxComponent>) {}
  confirm() {
    this.dialog.close({ data: true });
  }
  closeDialog() {
    this.dialog.close({ data: false });
  }
}
