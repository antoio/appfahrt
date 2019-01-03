import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyfavoritesComponent } from './emptyfavorites.component';

describe('EmptyfavoritesComponent', () => {
  let component: EmptyfavoritesComponent;
  let fixture: ComponentFixture<EmptyfavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyfavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyfavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
