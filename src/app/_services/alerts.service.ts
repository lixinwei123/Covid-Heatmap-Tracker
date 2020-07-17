import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AlertsService {
    private alerts = [
        {nickname: "Love Park", location: "Arch St, Philadelphia, PA 19102", type: "Open", date: "", time: ""},
        {nickname: "King Of Prussia Mall", location: "160 N Gulph Rd, King of Prussia, PA 19406", type: "Busy", date: "", time: ""},
        {nickname: "Whole Foods", location: "Arch St, Philadelphia, PA 19102", type: "Current Status", date: "7/21", time: "5:00 PM"}
    ]

    constructor() {

    }

    getAlerts() {
        return this.alerts
    }

    addAlert(alert) {
        this.alerts.push(alert)
    }

    removeAlert(alertNickname) {
        for(let i = 0; i < this.alerts.length; i++) {
            if(this.alerts[i].nickname == alertNickname) {
                this.alerts.splice(i, 1)
                return
            }
        }
    }
}