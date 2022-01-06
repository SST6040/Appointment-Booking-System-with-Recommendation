import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCounsellorPageRoutingModule } from './select-counsellor-routing.module';

import { SelectCounsellorPage } from './select-counsellor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectCounsellorPageRoutingModule
  ],
  declarations: [SelectCounsellorPage]
})
export class SelectCounsellorPageModule {}
