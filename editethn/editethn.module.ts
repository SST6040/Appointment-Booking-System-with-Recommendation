import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditethnPageRoutingModule } from './editethn-routing.module';

import { EditethnPage } from './editethn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditethnPageRoutingModule
  ],
  declarations: [EditethnPage]
})
export class EditethnPageModule {}
