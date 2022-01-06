import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcngenderPageRoutingModule } from './editcngender-routing.module';

import { EditcngenderPage } from './editcngender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditcngenderPageRoutingModule
  ],
  declarations: [EditcngenderPage]
})
export class EditcngenderPageModule {}
