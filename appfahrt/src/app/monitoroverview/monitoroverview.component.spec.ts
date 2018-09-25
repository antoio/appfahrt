import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoroverviewComponent } from './monitoroverview.component';

describe('MonitoroverviewComponent', () => {
  let component: MonitoroverviewComponent;
  let fixture: ComponentFixture<MonitoroverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoroverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
