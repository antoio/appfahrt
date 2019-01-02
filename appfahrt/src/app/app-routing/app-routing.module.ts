import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {FavoritesComponent} from '../favorites/favorites.component';
import {LoginComponent} from '../login/login.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { AboutComponent } from '../about/about.component';
import {RegisterComponent} from '../register/register.component';
import { UsersettingsComponent } from '../usersettings/usersettings.component';
import { MonitordetailComponent } from '../monitordetail/monitordetail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Registrieren'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {title: 'Dashboard'}
  },
  {
    path: 'details',
    component: MonitordetailComponent,
    data: {title: 'Bahnhof'}
  },
  { path: 'details/:id',
    component: MonitordetailComponent,
    data: {title: 'Bahnhof'}
  },
  {
    path: 'search',
    component: MapViewComponent,
    data: {title: 'Suche'}
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    data: {title: 'Favoriten'}
  },
  {
    path: 'settings',
    component: UsersettingsComponent,
    data: {title: 'Einstellungen'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {title: 'Über'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
