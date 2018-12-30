import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private authService: AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.form);

    if (this.registerForm.invalid) {
      return;
    }
    if (this.form.password.value !== this.form.passwordConfirm.value) {
      console.error('Password mismatch');
      return;
    }
    this.loading = true;
    this.CreateWithEmail(this.form.username.value, this.form.password.value);
  }
  CreateWithEmail(email: String, password: String) {
    this.authService.createUserRegular(email, password)
      .then((res) => {
        this.router.navigate(['/']);
        console.log('Registered worked too 😃');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl('')
    });
  }

}