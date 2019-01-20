import {HttpTestingController} from '@angular/common/http/testing';
import {inject} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIcon} from '@angular/material';
import {ErrorComponent} from '../other/error/error.component';
import {SpinnerComponent} from '../other/spinner/spinner.component';

import { BoardComponent } from './board.component';
import {StationsService} from './stations/stations.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, SpinnerComponent, ErrorComponent, MatIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
