import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
    selector: 'alerts-screen',
    templateUrl: './alerts-screen.page.html',
    styleUrls: ['./alerts-screen.page.scss'],
    providers: []
})
export class AlertsScreen implements OnInit {
    alertType = "till-trigger"
    enableDateFields = false
    locationEvents = ["Crowded", "Busy", "Open"]
    locationEvent = "Open"
    constructor(public modalController: ModalController, private toastController: ToastController) {

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
        this.closeModal()
        const toast = await this.toastController.create({
            message: 'Your alert has been created!',
            duration: 2000,
            color: 'success'
        });
        toast.present();
    }

}

