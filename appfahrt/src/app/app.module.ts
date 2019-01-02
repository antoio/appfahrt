import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {AutocompleteComponent} from './map-view/autocomplete/autocomplete.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MapViewComponent} from './map-view/map-view.component';
import {AboutComponent} from './about/about.component';
import {
  MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, MatTableModule
} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavigationService} from './navigation/navigation.service';
import {StationsComponent} from './board/stations/stations.component';
import {TrainsComponent} from './board/trains/trains.component';
import {UsersettingsComponent} from './usersettings/usersettings.component';
import {MonitoroverviewComponent} from './monitoroverview/monitoroverview.component';
import {MonitordetailComponent} from './monitordetail/monitordetail.component';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {config} from './config';
import {AngularGooglePlaceModule} from 'angular-google-place';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from 'src/environments/environment';
import {AuthServiceService} from './services/auth-service.service';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegisterComponent} from './register/register.component';
import {FavoritesComponent} from './favorites/favorites.component';
import { BoardComponent } from './board/board.component';
import { SpinnerComponent } from './other/spinner/spinner.component';
import { ClockComponent } from './other/clock/clock.component';


@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MapViewComponent,
    AboutComponent,
    UsersettingsComponent,
    MonitoroverviewComponent,
    MonitordetailComponent,
    StationsComponent,
    TrainsComponent,
    AutocompleteComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    FavoritesComponent,
    BoardComponent,
    SpinnerComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey,
      libraries: ['places']
    }),
    AngularGooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase, 'appfahrt-1537907755048'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularGooglePlaceModule,
    FlexLayoutModule
  ],
  providers: [NavigationService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

