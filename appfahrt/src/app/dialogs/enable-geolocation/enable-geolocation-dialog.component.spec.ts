import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableGeolocationDialogComponent } from './enable-geolocation-dialog.component';

describe('EnableGeolocationDialogComponent', () => {
  let component: EnableGeolocationDialogComponent;
  let fixture: ComponentFixture<EnableGeolocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableGeolocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableGeolocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
