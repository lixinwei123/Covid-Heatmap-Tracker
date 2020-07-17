import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertsService } from '../_services/alerts.service';

@Component({
    selector: 'manage-alerts-screen',
    templateUrl: './manage-alerts-screen.page.html',
    styleUrls: ['./manage-alerts-screen.page.scss'],
    providers: []
})
export class ManageAlertsScreen implements OnInit {
    alerts = []
    constructor(public modalController: ModalController, private alertsService: AlertsService) {
        this.alerts = this.alertsService.getAlerts()
    }

    async ngOnInit() {
        
    }

    closeModal() {
        this.modalController.dismiss()
    }

    deleteAlert(nickname){
        this.alertsService.removeAlert(nickname)
    }

}

