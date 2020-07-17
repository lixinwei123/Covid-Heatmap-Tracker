import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertsService } from '../_services/alerts.service';

@Component({
    selector: 'alerts-screen',
    templateUrl: './alerts-screen.page.html',
    styleUrls: ['./alerts-screen.page.scss'],
    providers: []
})
export class AlertsScreen implements OnInit {
    alertNickname = ""
    alertLocation = ""
    alertType = "till-trigger"
    enableDateFields = false
    locationEvents = ["Crowded", "Busy", "Open"]
    locationEvent = "Open"
    alertDate = new Date().toISOString()
    alertTime = new Date().toISOString()
    constructor(public modalController: ModalController, private toastController: ToastController, private alertsService: AlertsService) {

    }

    async ngOnInit() {

    }

    closeModal() {
        this.modalController.dismiss()
    }

    segmentChanged(ev: any) {
        if(this.alertType == "till-trigger") {
            this.enableDateFields = false
            this.locationEvents = ["Crowded", "Busy", "Open"]
            this.locationEvent = "Open"
        } else {
            this.enableDateFields = true
            this.locationEvents = ["Current Status"]
            this.locationEvent = "Current Status"
        }
    }


    async createAlert() {
        let alert = {nickname: this.alertNickname, location: this.alertLocation, type: this.locationEvent, date: `${new Date(this.alertDate).getMonth()}/${new Date(this.alertDate).getDate()}`, time: `${new Date(this.alertDate).toTimeString().split(":")[0]}:${new Date(this.alertDate).toTimeString().split(":")[1]}`}
        this.alertsService.addAlert(alert)
        this.closeModal()
        const toast = await this.toastController.create({
            message: 'Your alert has been created!',
            duration: 2000,
            color: 'success'
        });
        toast.present();
    }

}

