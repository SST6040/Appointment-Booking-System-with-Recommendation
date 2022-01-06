import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmethodPageRoutingModule } from './editmethod-routing.module';

import { EditmethodPage } from './editmethod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditmethodPageRoutingModule
  ],
  declarations: [EditmethodPage]
})
export class EditmethodPageModule {}
