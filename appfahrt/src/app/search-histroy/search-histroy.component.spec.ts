import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistroyComponent } from './search-histroy.component';

describe('SearchHistroyComponent', () => {
  let component: SearchHistroyComponent;
  let fixture: ComponentFixture<SearchHistroyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHistroyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
