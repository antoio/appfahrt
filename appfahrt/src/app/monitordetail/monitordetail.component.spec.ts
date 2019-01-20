import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitordetailComponent } from './monitordetail.component';

describe('MonitordetailComponent', () => {
  let component: MonitordetailComponent;
  let fixture: ComponentFixture<MonitordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
