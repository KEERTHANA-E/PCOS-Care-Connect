import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  addForm: FormGroup | any;
  test!: File;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddPostComponent>
  ) {}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      content: this.fb.control('', [Validators.required]),
    });
  }
  createPost() {
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

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.test = file;
      console.log(this.test);
    }
  }
}
