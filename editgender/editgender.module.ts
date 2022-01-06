import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditgenderPageRoutingModule } from './editgender-routing.module';

import { EditgenderPage } from './editgender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditgenderPageRoutingModule
  ],
  declarations: [EditgenderPage]
})
export class EditgenderPageModule {}
