import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { EventModalPage } from '../event-modal/event-modal.page';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@NgModule({
  imports: [
    NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,EventModalPage],
  entryComponents: [EventModalPage],
  providers: [VideoPlayer]
})
export class HomePageModule {}
