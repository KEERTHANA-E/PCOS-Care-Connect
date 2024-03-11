import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-edu',
  templateUrl: './edit-edu.component.html',
  styleUrls: ['./edit-edu.component.css'],
})
export class EditEduComponent {
  updateForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<EditEduComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log('data' + this.data);
    this.updateForm = this.fb.group({
      title: this.fb.control(this.data.title, [Validators.required]),
      content: this.fb.control(this.data.content, [Validators.required]),
    });
  }
  updateEduContent() {
    if (this.updateForm.valid) {
      console.log('before sending ', this.updateForm.value);
      const tmp = this.updateForm.value;
      this.dialog.close({ data: [tmp, this.testFiles] });
    } else {
      alert('fill all fields');
    }
  }
  closeDialog() {
    this.dialog.close();
  }
  testFiles: File[] = [];

  onFilesSelected(event: any) {
    if (event.target.files.length > 0) {
      this.testFiles = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.testFiles.push(file);
        console.log(file);
      }
    }
  }
}
