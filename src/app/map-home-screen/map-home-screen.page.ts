import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper, MarkerManager, AgmMarker} from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapOptionsScreen } from '../map-options-screen/map-options-screen.page';
import { ModalController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';
import { range } from 'rxjs';
declare const google: any
@Component({
    selector: 'app-map-home-screen',
    templateUrl: './map-home-screen.page.html',
    styleUrls: ['./map-home-screen.page.scss'],
    providers: [GoogleMapsAPIWrapper, Geolocation]
})
export class MapHomeScreen implements OnInit {
    public googleMapStyles: Array<any> = [
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#7c93a3'
                },
                {
                    lightness: '-10'
                }
            ]
        },
        {
            featureType: 'administrative.country',
            elementType: 'geometry',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#a0a4a5'
                }
            ]
        },
        {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#62838e'
                }
            ]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#dde3e3'
                }
            ]
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#3f4a51'
                },
                {
                    weight: '0.30'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'simplified'
                }
            ]
        },
        {
            featureType: 'poi.attraction',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.business',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.government',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.place_of_worship',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.school',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'poi.sports_complex',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'all',
            stylers: [
                {
                    saturation: '-100'
                },
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#bbcacf'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    lightness: '0'
                },
                {
                    color: '#bbcacf'
                },
                {
                    weight: '0.50'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'on'
                }
            ]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#ffffff'
                }
            ]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#a9b4b8'
                }
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
                {
                    invert_lightness: true
                },
                {
                    saturation: '-7'
                },
                {
                    lightness: '3'
                },
                {
                    gamma: '1.80'
                },
                {
                    weight: '0.01'
                }
            ]
        },
        {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#a3c7df'
                }
            ]
        }

    ];
    public lat: number;
    public lng: number;
    public userLocation: any;
    public siteLocation: any;
    public canCheckIn: boolean;
    public zoom = 15;
    public queryText: string;
    private proxyurl = 'https://cors-anywhere.herokuapp.com/';
    private API_AUTH_KEY = 'AIzaSyB1rFlu0wU5C1mRq-gc18Qq5U-iNlPhT1k';
    private oldMarker: any
    public mapsWrapper: google.maps.Map;
    public heatmap: google.maps.visualization.HeatmapLayer
    public heatmapData: any;

    constructor( private geolocation: Geolocation, private modalCtrl: ModalController) {

    }

    async ngOnInit() {
        console.log(document.getElementById('map-container'))
         this.heatmapData = [];
        //   var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
           this.mapsWrapper = new google.maps.Map(document.getElementById('map-container'), {
            center: null,
            zoom: 13,
            styles: this.googleMapStyles,
            disableDefaultUI: true
          });
          
         this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.heatmapData,
            radius:15,
            // dissipating: false
          });
          this.heatmap.setMap(this.mapsWrapper);
        this.updateUserLocation()
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {

                this.mapsWrapper.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                console.log("user position:", position.coords.latitude, position.coords.longitude)
                if (!this.userLocation) {
                    this.userLocation = new google.maps.Marker(
                        {
                            position: { lat: position.coords.latitude, lng: position.coords.longitude },
                            clickable: false,
                            map:this.mapsWrapper
                        })
                        this.getPlacesByCoord(position.coords.latitude,position.coords.longitude)

                } else {
                    this.userLocation.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                }
            }, (err) => { }, { enableHighAccuracy: true });
        }
    }

    private updateUserLocation() {
        navigator.geolocation.watchPosition(async (position) => {
            this.setCurrentPosition();
        });
    }
    private async recenter(){
        const result = await this.geolocation.getCurrentPosition({ enableHighAccuracy: true}).catch((error) => {
            console.log('Error getting location', error);
        });
        if (!!result){
            this.mapsWrapper.setCenter({ lat: result.coords.latitude, lng: result.coords.longitude });
            this.mapsWrapper.setZoom(15);
        }
    }

    async search() {
        let location = '';
        try {
            location = '&locationbias=circle:2000@' + this.userLocation.getPosition().lat() + ', '
                        + this.userLocation.getPosition().lng();
        } catch (e) {
            console.error(e);
        }

        const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='
            + this.queryText + '&inputtype=textquery&key=' + this.API_AUTH_KEY
            + location;

        fetch(this.proxyurl + url)
            .then(response => response.json())
            .then(content => {this.moveMap(content); })
            .catch(reason => {
                console.error('Error fetching Google Maps API. Check proxy? ' + reason);
            });
    }

    async moveMap(resp) {
        const placeId = await resp.candidates[0].place_id;
        // const map = await this.mapsWrapper.getNativeMap();
        const map = await this.mapsWrapper
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId
            + '&fields=geometry,name&key=' + this.API_AUTH_KEY;

        fetch(this.proxyurl + url)
            .then(response => response.json())
            .then(content => {
                const newLocation = content.result.geometry.location;
                this.getPlacesByCoord(newLocation.lat,newLocation.lng)
                console.log("new location",newLocation)
                this.mapsWrapper.panTo(newLocation);
                this.mapsWrapper.setZoom(this.zoom);
                const marker = new google.maps.Marker({
                    clickable: true,
                    position: newLocation,
                    title: content.result.name,
                    map,
                    visible: true,
                });
                if (this.oldMarker != null) { this.oldMarker.setMap(null); }
                this.oldMarker = marker;

                const bound = new google.maps.LatLngBounds();
                bound.extend(content.result.geometry.viewport.northeast);
                bound.extend(content.result.geometry.viewport.southwest);
                bound.extend(newLocation);
                this.mapsWrapper.fitBounds(bound);

            })
            .catch(reason => {
                console.error('Error Moving Map: ' + reason);
            });
    }
    async openMapOptions() {
        let modal = await this.modalCtrl.create({
            component: MapOptionsScreen,
            componentProps: {
                'map': this.mapsWrapper
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        this.mapsWrapper = new google.maps.Map(document.getElementById('map-container'), {
            center: this.userLocation.getPosition(),
            zoom: 13,
            styles: data.componentProps.map.styles,
            disableDefaultUI: true
        });
        this.userLocation = new google.maps.Marker({
            clickable: true,
            position: this.userLocation.getPosition(),
            map: this.mapsWrapper
        });
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.heatmapData
        });
        this.heatmap.setMap(this.mapsWrapper);
        this.updateUserLocation()
    }

    //pass in an instance of google map to 
    async getPlacesByCoord(lat,lng){
        // lat = 39.952019
        // lng =-75.161797
        // var service = new google.maps.places.PlacesService(map);
        

        this.heatmap.setData(this.heatmapData)
        console.log(this.heatmapData)
        this.heatmap.setMap(this.mapsWrapper);
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
        + lat + ","+lng + '&radius=50' +'&key=' + this.API_AUTH_KEY
        console.log(url)
        fetch(this.proxyurl + url)
        .then(response => response.json().then(data => {
            console.log(data.results)
            this.getHeatMapData(data.results,lat,lng)
        }))
        .catch(reason => {
            console.error('Error fetching Google Maps API. Check proxy? ' + reason);
        })
    }

     async getHeatMapData(results,lat,lng){
        var currentHour = new Date().getHours();
        var currentDay = new Date().getDay() - 1;
        for(var place in results){
            console.log(results[place])
            const url = "http://100.25.159.100/api/get_popular_times?key=" + this.API_AUTH_KEY + "&place_id=" + results[place].place_id
            fetch(this.proxyurl + url).
            then(response=> response.json().then(data => {
                console.log(data)
                if(data.populartimes){
                    this.heatmapData.push({location: new google.maps.LatLng(data.coordinates.lat,data.coordinates.lng),weight: 0.5 + (data.populartimes[currentDay].data[currentHour] / 10) * 0.25})
                    for(var time in data.populartimes){
                       console.log(1 + (data.populartimes[currentDay].data[currentHour] / 10) * 0.25)
                    }

                }else{
                    this.heatmapData.push({location: new google.maps.LatLng(data.coordinates.lat,data.coordinates.lng),weight: Math.random() * 4 + 2})
                    console.log(Math.random() * 4)
                }
                // for(var i = 0; i < 100;i ++){
                //     var latlng = this.randomGeo(lat,lng,100)
                //     var weightrand = Math.random() * 3 + 0.5
                //     console.log(weightrand)
                //     this.heatmapData.push({location: new google.maps.LatLng(latlng.lat, latlng.lng),weight:weightrand })
               
                //         }
                this.heatmap.setData(this.heatmapData)
                this.heatmap.setMap(this.mapsWrapper);
            }))
            .catch(reason =>{
                console.error('Error fetching. Check proxy?')
            })
        }
    }
    randomGeo(lat,lng, radius) {
        var y0 = lat;
        var x0 = lng;
        var rd = radius / 111300;
    
        var u = Math.random();
        var v = Math.random();
    
        var w = rd * Math.sqrt(u);
        var t = 2 * Math.PI * v;
        var x = w * Math.cos(t);
        var y = w * Math.sin(t);
    
        // var xp = x / Math.cos(y0);
    
        return {
            'lat': y + y0,
            'lng': x + x0
        };
    }
}

