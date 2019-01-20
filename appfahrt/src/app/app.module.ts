import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {AutocompleteComponent} from './map-view/autocomplete/autocomplete.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MapViewComponent} from './map-view/map-view.component';
import {AboutComponent} from './about/about.component';
import {
  MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatSliderModule, MatBottomSheetModule,
  MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, MatTableModule, MatSlideToggleModule, MatDialogModule, MatChipsModule, MatOptionModule, MatAutocompleteModule
} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavigationService} from './navigation/navigation.service';
import {StationsComponent} from './board/stations/stations.component';
import {TrainsComponent} from './board/trains/trains.component';
import {SettingsService} from './services/settings.service';
import {UsersettingsComponent} from './usersettings/usersettings.component';
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
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from 'src/environments/environment';
import {AuthServiceService} from './services/auth-service.service';
import {DatabaseService} from './services/database-service.service';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RegisterComponent} from './register/register.component';
import {FavoritesComponent} from './favorites/favorites.component';
import { BoardComponent } from './board/board.component';
import { SpinnerComponent } from './other/spinner/spinner.component';
import { ClockComponent } from './other/clock/clock.component';
import { ItemComponent } from './favorites/item/item.component';
import { EmptyfavoritesComponent } from './other/emptyfavorites/emptyfavorites.component';
import { EnableGeolocationDialogComponent } from './dialogs/enable-geolocation/enable-geolocation-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InstallAppDialogComponent } from './dialogs/install-app/install-app-dialog.component';
import { ErrorComponent } from './other/error/error.component';
import 'hammerjs';
import { ResetPasswordDialogComponent } from './dialogs/reset-password/reset-password-dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete-user/delete-user-dialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InfoWindowComponent } from './map-view/info-window/info-window.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { RemoveFavoriteDialogComponent } from './dialogs/remove-favorite/remove-favorite-dialog.component';


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
    MatToolbarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule
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
    ErrorComponent,
    ClockComponent,
    ItemComponent,
    EmptyfavoritesComponent,
    EnableGeolocationDialogComponent,
    InstallAppDialogComponent,
    ResetPasswordDialogComponent,
    DeleteUserDialogComponent,
    InfoWindowComponent,
    RemoveFavoriteDialogComponent
  ],
  entryComponents: [
    EnableGeolocationDialogComponent,
    ResetPasswordDialogComponent,
    InstallAppDialogComponent,
    DeleteUserDialogComponent,
    RemoveFavoriteDialogComponent
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
    AgmSnazzyInfoWindowModule,
    AngularGooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase, 'appfahrt-1537907755048'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularGooglePlaceModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    DragDropModule
  ],
  providers: [NavigationService, AuthServiceService, DatabaseService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

