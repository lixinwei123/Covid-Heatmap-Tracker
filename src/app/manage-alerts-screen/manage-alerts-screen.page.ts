import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'manage-alerts-screen',
    templateUrl: './manage-alerts-screen.page.html',
    styleUrls: ['./manage-alerts-screen.page.scss'],
    providers: []
})
export class ManageAlertsScreen implements OnInit {

    constructor(public modalController: ModalController) {

    }

    async ngOnInit() {
        
    }

    closeModal() {
        this.modalController.dismiss()
    }

}

