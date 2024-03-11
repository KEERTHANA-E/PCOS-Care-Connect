import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edu',
  templateUrl: './add-edu.component.html',
  styleUrls: ['./add-edu.component.css'],
})
export class AddEduComponent {
  addForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddEduComponent>
  ) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      content: this.fb.control('', [Validators.required]),
    });
  }
  createEduContent() {
    if (this.addForm.valid) {
      console.log('before sending ', this.addForm.value);
      const tmp = this.addForm.value;
      this.dialog.close({ data: [tmp, this.test] });
    } else {
      alert('fill all fields');
    }
  }
  closeDialog() {
    this.dialog.close();
  }
  test!: File;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.test = file;
      console.log(this.test);
    }
  }
}
