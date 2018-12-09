import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteComponent } from './map-view/autocomplete/autocomplete.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AboutComponent } from './about/about.component';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import {NavigationService} from './navigation/navigation.service';
import { StationsComponent } from './stations/stations.component';
import {TrainsComponent} from './trains/trains.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { MonitoroverviewComponent } from './monitoroverview/monitoroverview.component';
import { MonitordetailComponent } from './monitordetail/monitordetail.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { config } from './config';
import {AngularGooglePlaceModule} from 'angular-google-place';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './services/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MapViewComponent,
    AboutComponent,
    SearchComponent,
    UsersettingsComponent,
    MonitoroverviewComponent,
    MonitordetailComponent,
    StationsComponent,
    TrainsComponent,
    AutocompleteComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey,
      libraries: ['places']
    }),
    AngularGooglePlaceModule,
    AngularFireModule.initializeApp(environment.firebase, 'appfahrt-1537907755048'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [NavigationService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
