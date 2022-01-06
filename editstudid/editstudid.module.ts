import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditstudidPageRoutingModule } from './editstudid-routing.module';

import { EditstudidPage } from './editstudid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditstudidPageRoutingModule
  ],
  declarations: [EditstudidPage]
})
export class EditstudidPageModule {}
