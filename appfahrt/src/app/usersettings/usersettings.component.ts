import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

export interface Settings {
  userId: string,
  username: string,
  password: string,
  homestation: string
}
@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {

  userSettingsForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder) {

  }

  onSubmit() {
    this.submitted = true;
    if(this.userSettingsForm.invalid) {
      return;
    }
    // TODO: change state for submitting?

    this.submitChanges();
  }

  submitChanges() {
    // not yet implemented
  }

  ngOnInit() {
    this.userSettingsForm = this.formBuilder.group({
      username: new FormControl('userName'),
      password: new FormControl('password'),
      homestation: new FormControl('e.g. Bern'),
    });
  }

}
