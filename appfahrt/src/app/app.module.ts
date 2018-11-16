import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import {AutocompleteComponent} from './map-view/autocomplete/autocomplete.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AboutComponent } from './about/about.component';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {StationsComponent} from './stations/stations.component';
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
    AutocompleteComponent
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
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey,
      libraries: ['places']
    }),
    AngularGooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
