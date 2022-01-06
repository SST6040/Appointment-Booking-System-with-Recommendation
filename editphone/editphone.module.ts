import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditphonePageRoutingModule } from './editphone-routing.module';

import { EditphonePage } from './editphone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditphonePageRoutingModule
  ],
  declarations: [EditphonePage]
})
export class EditphonePageModule {}
