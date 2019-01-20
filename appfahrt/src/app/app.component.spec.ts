import { TestBed, async } from '@angular/core/testing';
import {
  MatButton,
  MatDivider,
  MatIcon,
  MatList, MatRipple,
  MatSidenav, MatSidenavContainer,
  MatSidenavContent,
  MatToolbar,
  MatToolbarRow
} from '@angular/material';
import {RouterOutlet} from '@angular/router';
import { AppComponent } from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ClockComponent} from './other/clock/clock.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent,
        MatDivider,
        MatIcon,
        MatList,
        MatSidenav,
        ClockComponent,
        MatToolbar,
        MatToolbarRow,
        RouterOutlet,
        MatButton,
        MatSidenavContent,
        MatSidenavContainer,
        MatRipple
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));
  /* it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })); */
});
