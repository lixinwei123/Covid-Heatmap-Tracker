import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapHomeScreenRoutingModule } from './map-home-screen-routing.module';

import { MapHomeScreen } from './map-home-screen.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapHomeScreenRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1rFlu0wU5C1mRq-gc18Qq5U-iNlPhT1k',
      libraries: ['places']
    })
  ],
  declarations: [MapHomeScreen]
})
export class MapHomeScreenModule {}
