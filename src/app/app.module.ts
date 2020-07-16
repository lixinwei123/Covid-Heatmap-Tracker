import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AlertsScreen } from './alerts-screen/alerts-screen.page';
import { ManageAlertsScreen } from './manage-alerts-screen/manage-alerts-screen.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //CHANGE(ADD)
import { SettingsScreen } from './settings-screen/settings-screen.page';
import { MapOptionsScreen } from './map-options-screen/map-options-screen.page';

@NgModule({
  declarations: [AppComponent, AlertsScreen, ManageAlertsScreen, SettingsScreen, MapOptionsScreen],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCogfPgTo28jHyooKFRRWm_HduAkITny8w', 
      libraries: ['places']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
