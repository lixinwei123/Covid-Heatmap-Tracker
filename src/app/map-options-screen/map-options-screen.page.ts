import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'map-options-screen',
    templateUrl: './map-options-screen.page.html',
    styleUrls: ['./map-options-screen.page.scss'],
    providers: []
})
export class MapOptionsScreen implements OnInit {

    constructor(public modalController: ModalController) {

    }

    async ngOnInit() {
        
    }

    closeModal() {
        this.modalController.dismiss()
    }

}

