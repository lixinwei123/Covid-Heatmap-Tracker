import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertsScreen } from './alerts-screen/alerts-screen.page';
import { ManageAlertsScreen } from './manage-alerts-screen/manage-alerts-screen.page';
import { SettingsScreen } from './settings-screen/settings-screen.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Create Alerts',
      url: '/app/home',
      icon: 'notifications'
    },
    {
      title: 'Manage Alerts',
      url: '/app/home',
      icon: 'briefcase'
    },
    {
      title: 'COVID-19 CDC Resource',
      url: '/app/home',
      icon: 'file-tray-full'
    },
    {
      title: 'COVID-19 Chat Bot',
      url: '/app/home',
      icon: 'chatbubbles'
    },
    {
      title: 'Settings',
      url: '/app/home',
      icon: 'settings'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('app/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async openMenuModals(modalID) {
    let modal
    if (modalID == 'Create Alerts') {
      modal = await this.modalController.create({
        component: AlertsScreen
      });
    } else if (modalID == 'Manage Alerts') {
      modal = await this.modalController.create({
        component: ManageAlertsScreen
      });
    } else if (modalID == 'Settings') {
      modal = await this.modalController.create({
        component: SettingsScreen
      });
    }

    return await modal.present();
  }

}
