import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcnethnPageRoutingModule } from './editcnethn-routing.module';

import { EditcnethnPage } from './editcnethn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditcnethnPageRoutingModule
  ],
  declarations: [EditcnethnPage]
})
export class EditcnethnPageModule {}
