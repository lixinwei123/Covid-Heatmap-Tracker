import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'map-options-screen',
    templateUrl: './map-options-screen.page.html',
    styleUrls: ['./map-options-screen.page.scss'],
    providers: []
})
export class MapOptionsScreen implements OnInit {

    @Input() map: any;

    showAttractions: boolean;
    showBusinesses: boolean;
    showGovernment: boolean;
    showParks: boolean;
    showPlaceOfWorship: boolean;
    showSchools: boolean;
    showSportsComplex: boolean;

    constructor(public modalController: ModalController) {

    }

    async ngOnInit() {
        (this.map.styles[7].stylers[0].visibility == 'on') ? this.showAttractions = true : this.showAttractions = false;
        (this.map.styles[8].stylers[0].visibility == 'on') ? this.showBusinesses = true : this.showBusinesses = false;
        (this.map.styles[9].stylers[0].visibility == 'on') ? this.showGovernment = true : this.showGovernment = false;
        (this.map.styles[10].stylers[0].visibility == 'on') ? this.showParks = true : this.showParks = false;
        (this.map.styles[11].stylers[0].visibility == 'on') ? this.showPlaceOfWorship = true : this.showPlaceOfWorship = false;
        (this.map.styles[12].stylers[0].visibility == 'on') ? this.showSchools = true : this.showSchools = false;
        (this.map.styles[13].stylers[0].visibility == 'on') ? this.showSportsComplex = true : this.showSportsComplex = false;
    }

    closeModal() {
        this.modalController.dismiss({
            componentProps: {
                'map': this.map
            }
        });
    }

    toggleVis(style){
        (style.stylers[0].visibility==='off') ? style.stylers[0].visibility='on' : style.stylers[0].visibility='off';
    }

}

