import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from '../map-view/map-view.component';
import { AboutComponent } from '../about/about.component';
import { UsersettingsComponent } from '../usersettings/usersettings.component';
import { MonitordetailComponent } from '../monitordetail/monitordetail.component';
import { MonitoroverviewComponent } from '../monitoroverview/monitoroverview.component';

const routes: Routes = [
  {
    path:'',
    component: MapViewComponent
  },
  {
    path:'overview',
    component: MonitoroverviewComponent
  },
  {
    path:'details',
    component: MonitordetailComponent
  },
  {
    path:'settings',
    component: UsersettingsComponent
  },
  {
    path:'about',
    component: AboutComponent
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
