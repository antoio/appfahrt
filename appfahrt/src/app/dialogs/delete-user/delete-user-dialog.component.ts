import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user-dialog.component.html'
})
export class DeleteUserDialogComponent implements OnInit{
  loading = false;
  deleteForm: FormGroup;
  get form() {
    return this.deleteForm.controls;
  }

  submitted = false;
  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthServiceService) { }

  onSubmit() {
    this.loading = true;
    this.authService.deleteUser(this.form.password.value)
      .then((res) => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      password: new FormControl('')
    });
  }

}
