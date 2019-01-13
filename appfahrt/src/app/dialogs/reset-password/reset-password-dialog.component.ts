import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password-dialog.component.html'
})
export class ResetPasswordDialogComponent implements OnInit {
  resetPasswordForm: FormGroup;

  submitted = false;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthServiceService) {
  }

  get form() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    if (this.form.newPassword.value !== this.form.newPasswordConfirm.value) {
      console.error('Password mismatch');
      return;
    }
    this.loading = true;
    this.authService.changeUserPassword(this.form.oldPassword.value, this.form.newPassword.value)
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
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      newPasswordConfirm: new FormControl('')
    });
  }

}
