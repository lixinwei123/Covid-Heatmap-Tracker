import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'settings-screen',
    templateUrl: './settings-screen.page.html',
    styleUrls: ['./settings-screen.page.scss'],
    providers: []
})
export class SettingsScreen implements OnInit {

    constructor(public modalController: ModalController) {

    }

    async ngOnInit() {
        
    }

    closeModal() {
        this.modalController.dismiss()
    }

}

