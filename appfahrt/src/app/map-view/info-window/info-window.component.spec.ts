import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButton, MatIcon, MatRipple} from '@angular/material';
import {RouterLink} from '@angular/router';
import {SpinnerComponent} from '../../other/spinner/spinner.component';

import { InfoWindowComponent } from './info-window.component';

describe('InfoWindowComponent', () => {
  let component: InfoWindowComponent;
  let fixture: ComponentFixture<InfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWindowComponent, SpinnerComponent, MatIcon, RouterLink, MatButton, MatRipple ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
