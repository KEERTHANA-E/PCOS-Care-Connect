import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialogox',
  templateUrl: './share-dialogox.component.html',
  styleUrls: ['./share-dialogox.component.css'],
})
export class ShareDialogoxComponent {
  updtateForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<ShareDialogoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log("data" + this.data);
    this.updtateForm = this.fb.group({
      title: this.fb.control(this.data.title, [Validators.required]),
      content: this.fb.control(this.data.content, [Validators.required]),
    });
  }
  updatePost() {
    if (this.updtateForm.valid) {
      console.log('before sending ', this.updtateForm.value);
      const tmp = this.updtateForm.value;
      this.dialog.close({ data: tmp });
    } else {
      alert('fill all fields');
    }
  }
  closeDialog() {
    this.dialog.close();
  }
}
