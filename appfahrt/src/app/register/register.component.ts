import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../services/auth-service.service';
import {DatabaseService} from '../services/database-service.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('1s')),
    ])
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: boolean = false;

  constructor(private authService: AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder,
              private databaseService: DatabaseService) {
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

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
        console.log('successful Registered 😃', res.user.uid);
        this.databaseService.addNearestFavorite(res.user.uid);
      })
      .catch((err) => {
        this.error = err;
        console.log(err);
        //reset the error message
        setTimeout(() => {this.error = null}, 7000);
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
