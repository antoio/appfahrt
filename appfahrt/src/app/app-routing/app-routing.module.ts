import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from '../map-view/map-view.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {
    path:'',
    component: MapViewComponent
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
