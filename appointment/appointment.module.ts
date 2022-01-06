import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AppointmentPage]
})
export class AppointmentPageModule {}
