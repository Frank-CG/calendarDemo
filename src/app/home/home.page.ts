import { Component } from '@angular/core';
import * as moment from 'moment';
import { AlertController, ModalController } from '@ionic/angular';
import { EventModalPage } from '../event-modal/event-modal.page';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(private modalCtrl: ModalController,private alertCtrl: AlertController, private videoPlayer: VideoPlayer){

  }

  async addEvent(){
    let modal = await this.modalCtrl.create({
      component: EventModalPage,
      componentProps: { selectedDay: this.selectedDay }
    });
    await modal.present();

    await modal.onDidDismiss().then((data) => {
      if(data.data){
        console.log(data)
        let eventData = data.data;
        console.log(eventData);
        eventData.startTime = new Date(data.data.startTime);
        eventData.endTime = new Date(data.data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });    
  }



  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(ev){
    this.selectedDay = ev.selectedTime;
    console.log(this.selectedDay.getDate());
    if(this.selectedDay.getDate() === 6){
      // Playing a video.
      this.videoPlayer.play('http://techslides.com/demos/sample-videos/small.mp4').then(() => {
        console.log('video completed');
      }).catch(err => {
        console.log(err);
      });
    }
  }

  async onEventSelected(event){
    console.log(event);
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = await this.alertCtrl.create({
      header: '' + event.title,
      message: 'From: ' + start + "<br>To: " + end,
      buttons: ['OK']
    }); 
    await alert.present();
  }
}
