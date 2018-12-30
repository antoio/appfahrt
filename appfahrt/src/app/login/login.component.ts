import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;

  constructor(private authService: AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder) {
    // if (this.authService.isLoggedIn) {
    //   console.log('Already logged in. Navigate to home.');
    //   this.router.navigate(['/']);
    // }
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.signInWithEmail(this.form.username.value, this.form.password.value);
  }

  signInWithEmail(email: String, password: String) {
    this.authService.signInRegular(email, password)
      .then((res) => {
        this.router.navigate(['/']);
        console.log('Login worked too 😃');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

}
