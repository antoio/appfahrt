import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AboutComponent } from './about/about.component';
import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import {StationsComponent} from './stations/stations.component';
import {TrainsComponent} from './trains/trains.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { MonitoroverviewComponent } from './monitoroverview/monitoroverview.component';
import { MonitordetailComponent } from './monitordetail/monitordetail.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { config } from './config';

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
    TrainsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMapsKey,
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
