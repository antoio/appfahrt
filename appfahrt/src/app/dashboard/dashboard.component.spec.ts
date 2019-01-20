import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIcon} from '@angular/material';
import {BoardComponent} from '../board/board.component';
import {EmptyfavoritesComponent} from '../other/emptyfavorites/emptyfavorites.component';
import {ErrorComponent} from '../other/error/error.component';
import {SpinnerComponent} from '../other/spinner/spinner.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, SpinnerComponent, EmptyfavoritesComponent, BoardComponent, ErrorComponent, MatIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
