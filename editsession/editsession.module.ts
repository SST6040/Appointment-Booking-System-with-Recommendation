import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditsessionPageRoutingModule } from './editsession-routing.module';

import { EditsessionPage } from './editsession.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditsessionPageRoutingModule
  ],
  declarations: [EditsessionPage]
})
export class EditsessionPageModule {}
