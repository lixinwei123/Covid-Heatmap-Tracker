import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapHomeScreen } from './map-home-screen.page';

const routes: Routes = [
  {
    path: '',
    component: MapHomeScreen
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapHomeScreenRoutingModule {}
